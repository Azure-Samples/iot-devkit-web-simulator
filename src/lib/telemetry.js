import { AppInsights } from 'applicationinsights-js';
import uuid from 'uuid';
import ga from 'react-ga';
import store from '../index';
import * as GUIDE from '../constants/guide';

const pkg = require('../../package.json');

const intrumentKey = '76c785d0-bf63-4b98-9fa7-9294dba6beb5';
const googleAnalticsKey = 'UA-98097460-4';

const userProperties = {
    project: getAppName(),
    userId: getUserId(),
    version: getAppVersion(),
    page: location
};

AppInsights.downloadAndSetup({ instrumentationKey: intrumentKey });
ga.initialize(googleAnalticsKey);

function tracePageView() {
    ga.set(userProperties);
    ga.ga('send', 'pageview');
}

function getAppName() {
    return pkg.name;
}

function getAppVersion() {
    return pkg.version;
}

function getUserId() {
    var id = localStorage.getItem('userId');
    if (!id) {
        id = uuid.v1().toString();
        localStorage.setItem('userId', id);
    }
    return id;
}

function tracePageViewAI(name, property, metric) {
    property = Object.assign({ referrer: document.referrer }, property, userProperties);
    AppInsights.trackPageView(null, null, property);
    AppInsights.flush();
}

function traceEvent(name, property, metric) {
    let guideOn = store.getState().main.get('guideId') !== GUIDE.CLOSE;
    property = Object.assign({ 'with-guide': guideOn }, property, userProperties);
    AppInsights.trackEvent(name, property, metric);
    AppInsights.flush();
}

export {
    tracePageView,
    tracePageViewAI,
    traceEvent,
    userProperties
}