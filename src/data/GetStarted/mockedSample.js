/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
const Client = require('azure-iot-device').Client;
const Message = require('azure-iot-device').Message;
const Protocol = require('azure-iot-device-mqtt').Mqtt;
var led = require('led');
var buttonA = require('buttonA');
var Screen = require('oled');
var HTS221 = require('hts221');
const connectionString = '[CONNECTION_STRING_PLACE_HOLDER]';
var sendingMessage = false;
var messageId = 0;
var client, sensor;
function getMessage(cb) {
    messageId++;
    sensor.readSensorData()
        .then(function (data) {
            cb(JSON.stringify({
                messageId: messageId,
                deviceId: 'Raspberry Pi Web Client',
                temperature: data.temperature_C,
                humidity: data.humidity
            }), data.temperature_C > 30);
        })
        .catch(function (err) {
            console.error('Failed to read out sensor data: ' + err);
        });
}
function sendMessage() {
    if (!sendingMessage) { return; }
    var tempature = HTS221.getTempature();
    var humidity = HTS221.getHumidity();
    var messageObject = JSON.stringify({
        messageId: messageId,
        deviceId: 'Devkit playground',
        temperature: tempature,
        humidity: humidity
    });
    var message = new Message(messageObject);
    message.properties.add('temperatureAlert', (tempature > 30).toString());
    console.log("Sending message: " + messageObject);
    client.sendEvent(message, async function (err) {
        if (err) {
            console.error('Failed to send message to Azure IoT Hub');
        } else {
            await blinkSendConfirmation();
            console.log('Message sent to Azure IoT Hub');
        }
    });
    console.log("IoTHubClient accepted the message for delivery");
}
function onStart(request, response) {
    console.log('Try to invoke method start(' + request.payload + ')');
    sendingMessage = true;
    response.send(200, 'Successully start sending message to cloud', function (err) {
        if (err) {
            console.error('[IoT hub Client] Failed sending a method response:\n' + err.message);
        }
    });
}
function onStop(request, response) {
    console.log('Try to invoke method stop(' + request.payload + ')');
    sendingMessage = false;
    response.send(200, 'Successully stop sending message to cloud', function (err) {
        if (err) {
            console.error('[IoT hub Client] Failed sending a method response:\n' + err.message);
        }
    });
}
function receiveMessageCallback(msg) {
    blinkLED();
    var message = msg.getData().toString('utf-8');
    client.complete(msg, function () {
        console.log('Receive message: ' + message);
    });
}
async function blinkLED() {
    led.turnOff();
    led.setColor(255,0,0);
    await delay(500);
    led.turnOff();
}
async function blinkSendConfirmation() {
    led.turnOff();
    led.setColor(66, 229, 244);
    await delay(500);
    led.turnOff();
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function setup() {
    Screen.print(0, "Azure IoT DevKit");
    Screen.print(1, "192.168.1.1");
    Screen.print(2, "Connecting");
    await delay(1000);
    Screen.print(2, "Running...");
    // TODO: send telemetry data
    client = Client.fromConnectionString(connectionString, Protocol);
    client.open(function (err) {
        if (err) {
            console.error('[IoT hub Client] Connect error: ' + err.message);
            return;
        }
        client.onDeviceMethod('start', onStart);
        client.onDeviceMethod('stop', onStop);
        client.on('message', receiveMessageCallback);
        sendingMessage = true;
    });
}
function loop() {
    if (sendingMessage) {
        sendMessage();
    }
}
async function run() {
    await setup();
    while (true) {
        loop();
        await delay(3000);
    }
}
run();
