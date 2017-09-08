import { Client, Message } from 'azure-iot-device'
import { traceEvent } from './telemetry.js';
import Protocol from './mqtt.js';
import store from '../index';
import { Map } from 'immutable';
import { showRunningInfo, runSample } from '../actions';

class ClientWrapper extends Client {
    constructor(transport, connStr, blobUploadClient) {
        window.azure_iot_device_client = super(transport, connStr, blobUploadClient);
        return window.azure_iot_device_client;
    }

    static fromConnectionString(connStr, transport) {
        window.azure_iot_device_client = super.fromConnectionString(connStr, transport);
        return window.azure_iot_device_client;
    }
}

class SampleRunner {
    constructor() {
        this.runningFunction = null;
        if (!window.oldSetTimeout) {
            window.timeoutList = new Array();
            window.intervalList = new Array();

            window.oldSetTimeout = window.setTimeout;
            window.oldSetInterval = window.setInterval;
            window.oldClearTimeout = window.clearTimeout;
            window.oldClearInterval = window.clearInterval;

            window.setTimeout = function (code, delay) {
                var retval = window.oldSetTimeout(code, delay);
                window.timeoutList.push(retval);
                return retval;
            };
            window.clearTimeout = function (id) {
                var ind = window.timeoutList.indexOf(id);
                if (ind >= 0) {
                    window.timeoutList.splice(ind, 1);
                }
                var retval = window.oldClearTimeout(id);
                return retval;
            };
            window.setInterval = function (code, delay) {
                var retval = window.oldSetInterval(code, delay);
                window.intervalList.push(retval);
                return retval;
            };
            window.clearInterval = function (id) {
                var ind = window.intervalList.indexOf(id);
                if (ind >= 0) {
                    window.intervalList.splice(ind, 1);
                }
                var retval = window.oldClearInterval(id);
                return retval;
            };
            window.clearAllTimeouts = function () {
                for (var i in window.timeoutList) {
                    window.oldClearTimeout(window.timeoutList[i]);
                }
                window.timeoutList = new Array();
            };
            window.clearAllIntervals = function () {
                for (var i in window.intervalList) {
                    window.oldClearInterval(window.intervalList[i]);
                }
                window.intervalList = new Array();
            };
        }
        this.actualClient = null;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new SampleRunner();
        }
        return this.instance;
    }

    stop() {
        window.clearAllIntervals();
        window.clearAllTimeouts();
        window.azure_iot_device_client.close();
    }

    run(msgCb, errCb) {
        // a prefix of UUID to avoid name conflict, here just use a fix one
        const prefix = '76f98350';
        let sampleName = store.getState().project.getIn(['currentProject', 'displayName']);
        traceEvent('sample-run', { 'sample-name': sampleName });
        const connectionString = store.getState().project.getIn(['currentProject', 'config', 'connectionString']);
        const topic = store.getState().project.getIn(['currentProject', 'config', 'topic']);
        if (connectionString === '') {
            showRunningInfo(store.dispatch, 'Please provision cloud service and then provide the connection string');
            return 1;
        }
        if (! /^HostName=([^;]*);DeviceId=([^;]*);SharedAccessKey=(.*)$/.test(connectionString)) {
            showRunningInfo(store.dispatch, 'Invalid format for connection string');
            return 2;
        }
        runSample(store.dispatch);
        showRunningInfo(store.dispatch, '');
        var replaces = [
            {
                src: /require\('azure-iot-device'\)\.Client/g,
                dest: 'Client'
            }, {
                src: /require\('azure-iot-device'\)\.Message/g,
                dest: 'Message'
            }, {
                src: /require\('azure-iot-device-mqtt'\)\.Mqtt/g,
                dest: 'Protocol'
            }, {
                src: /console\.log/g,
                dest: 'msgCb'
            }, {
                src: /console\.error/g,
                dest: 'errCb'
            }, {
                src: /require\('led'\)/g,
                dest: 'led'
            }, {
                src: /require\('buttonA'\)/g,
                dest: 'buttonA'
            }, {
                src: /require\('buttonB'\)/g,
                dest: 'buttonB'
            }, {
                src: /require\('oled'\)/g,
                dest: 'oled'
            }, {
                src: /require\('hts221'\)/g,
                dest: 'hts221'
            }, {
                src: /require\('lsm6dsl'\)/g,
                dest: 'lsm6dsl'
            }, {
                src: /require\('traceEvent'\)/g,
                dest: 'traceEvent'
            },
        ];

        try {
            let code = store.getState().project.getIn(['currentProject', 'jsCode']);
            for (var i = 0; i < replaces.length; i++) {
                var replace = replaces[i];
                code = code.replace(replace.src, 'replaces' + prefix + '.' + replace.dest);
            }
            code = code.replace(/\[CONNECTION_STRING_PLACE_HOLDER\]/g, connectionString);
            code = code.replace(/\[TOPIC_PLACE_HOLDER\]/g, topic);
            this.runningFunction = new Function('replaces' + prefix, code);
            setTimeout(() => {
                this.runningFunction(Object.assign({
                    Client: ClientWrapper,
                    Message: Message,
                    Protocol: Protocol,
                    msgCb: msgCb,
                    errCb: errCb,
                    traceEvent: traceEvent,
                }, window.devkitPlayground));
            }, 0);

        } catch (err) {
            traceEvent('connect-fail', { 'sample-name': sampleName, reason: err });
            errCb(err.message || JSON.stringify(err));
            return 3;
        }

        return 0;
    }
}

export default SampleRunner;
