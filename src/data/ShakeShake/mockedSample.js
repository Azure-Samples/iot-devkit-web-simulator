/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
const Client = require('azure-iot-device').Client;
const Message = require('azure-iot-device').Message;
const Protocol = require('azure-iot-device-mqtt').Mqtt;
var led = require('led');
var buttonA = require('buttonA');
var buttonB = require('buttonB');
var Screen = require('oled');
var HTS221 = require('hts221');
var LSM6DSL = require('lsm6dsl');
const connectionString = '[CONNECTION_STRING_PLACE_HOLDER]';
var sendingMessage = false;
var messageId = 0;
var client, sensor;
var status = 0;
var eventSent = false;
var iotEvent = "{\"topic\":\"[TOPIC_PLACE_HOLDER]\"}";
var msgHeader = "";
var msgBody = "";
var msgStart = 0;
var LED_BRIGHTNESS = 255;
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
            await blinkLED();
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
async function blinkLED() {
    led.turnOff();
    led.setColor(66, 229, 244);
    await delay(500);
    led.turnOff();
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function twitterCallback(msg) {
    if (status < 2) {
        return;
    }
    await delay(2000);
    var message = msg.getData().toString('utf-8');
    var splitIndex = message.indexOf("\n");
    if (splitIndex == -1) {
        msgHeader = message;
    } else {
        msgHeader = message.substring(0, splitIndex);
        msgBody = message.substring(splitIndex + 1);
    }

    client.complete(msg, function () {
        console.log('Receive message: ' + message);
    });
    status = 3;
    msgStart = 0;
}
async function setup() {
    Screen.print(0, "Azure IoT DevKit");
    Screen.print(2, "Initializing...");
    led.setColor(LED_BRIGHTNESS, 0, 0);
    // TODO: send telemetry data
    client = Client.fromConnectionString(connectionString, Protocol);
    client.open(function (err) {
        if (err) {
            console.error('[IoT hub Client] Connect error: ' + err.message);
            return;
        }
        client.on('message', twitterCallback);
        sendingMessage = true;
        led.setColor(0, 0, 0);
        Screen.print(1, "192.168.1.1");
        Screen.print(2, "Press A to Shake!");
        Screen.print(3, " ");
        status = 0;
    });
}
function DoIdle() {
    if (buttonA.getSwitch()) {
        Screen.print(0, "Azure IoT DevKit");
        Screen.print(1, "  Shake!");
        Screen.print(2, "     Shake!");
        Screen.print(3, "        Shake!");
        status = 1;
        led.setColor(0, LED_BRIGHTNESS, 0);
        LSM6DSL.clearDistance();
    }
}
function DoShake() {
    if (LSM6DSL.getDistance() > 600) {
        eventSent = false;
        var msgObj = new Message(iotEvent);
        client.sendEvent(msgObj, async function (err) {
            eventSent = true;
            if (err) {
                console.error('Failed to send message to Azure IoT Hub');
            } else {
                await blinkLED();
                console.log('Message sent to Azure IoT Hub');
            }
        });
        status = 2;
        led.setColor(LED_BRIGHTNESS, 0, 0);
        Screen.print(1, " ");
        Screen.print(2, " Processing...");
        Screen.print(3, " ");
    }
}
async function DoWork() {
    await delay(50);
}
function DoReceived() {
    Screen.clean();
    Screen.print(0, msgHeader);
    Screen.print(1, msgBody, true);
    led.setColor(0, 0, LED_BRIGHTNESS);
    status = 0;
}
async function ScrollTweet() {
    if (msgBody != "" && buttonB.getSwitch()) {
        msgStart += 16;
        if (msgStart >= msgBody.length) {
            msgStart = 0;
        }
        // Clean the msg screen
        Screen.print(1, " ");
        Screen.print(2, " ");
        Screen.print(3, " ");
        // Update it
        Screen.print(1, msgBody.substring(msgStart), true);
        await delay(300);
    }
}
function loop() {
    switch (status) {
        case 0:
            DoIdle();
            break;
        case 1:
            DoShake();
            break;
        case 2:
            DoWork();
            break;
        case 3:
            DoReceived();
            break;
    }
    ScrollTweet();
}
async function run() {
    await setup();
    while (true) {
        loop();
        await delay(100);
    }
}
run();
