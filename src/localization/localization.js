import LocalizedStrings from 'react-localization';

class Localization {
    static getLocalizedString() {
        if (!this.localizedString) {
            this.localizedString = new LocalizedStrings(Localization.localizedStringList);
        }
        return this.localizedString;
    }
};

Localization.localizedStringList = {
    en: {
        pageTitle: "MXChip IoT DevKit Simulator",
        pageTitleMobile: "MXChip IoT DevKit Simulator",
        runButton: "Run",
        stopButton: "Stop",
        helpButton: "Help",
        buyButton: "Buy",
        getAKitButton: "Get a kit",
        deployButton: "Deploy",
        buyLink: "http://mxchip.com/az3166",
        guideTurnOff: "Turn guides off",
        guideNextStep: "Next step",
        guideStepFileTitle: "Welcome! Select a file to get started.",
        guideStepFileDetail: "Here is an open project named Shake Shake, which will connect DevKit to Azure IoT and use the motion sensor to detect shaking and find a random tweet with a #hashtag. Select the source code file and move to the next step.",
        guideStepCodeTitle: "Code display area",
        guideStepCodeDetail: "There are two parts in this project. The code will be running on the DevKit is Arduino code. The files under azureFunction folder will be deployed to Azure Cloud for data processing.",
        guideStepDeployTitle: "Deploy your Azure Resource Manager template to Azure",
        guideStepDeployDetail: "By clicking the Deploy button, you can provision all the services required in the Shake Shake project, which includes an Azure IoT hub and an Azure Function. Click the link below to learn how to deploy.",
        guideStepDeployLinkName: "How to deploy",
        guideStepDeployLinkHref: "https://github.com/Azure-Samples/iot-devkit-web-simulator#deploy-your-azure-resource-manager-arm-template",
        guideStepFillCSTitle: "Configure your DevKit",
        guideStepFillCSDetail: "Here are the configurations you need to tell your DevKit. One is the IoT Hub Device connection string, and the other is the #hashtag you want for the tweets. Click the link below to learn how to fill in these.",
        guideStepFillCSLinkName: "How to configure your DevKit",
        guideStepFillCSLinkHref: "https://github.com/Azure-Samples/iot-devkit-web-simulator#create-an-az3166-device-in-your-iot-hub",
        guideStepFillCSErrorTitle: "Oops, something wrong here",
        guideStepFillCSErrorDetail: "It looks like the connection string is incorrect. Click the link below to see how to get the device connection string from Azure portal.",
        guideStepFillCSErrorLinkName: "How to configure your DevKit",
        guideStepFillCSErrorLinkHref: "https://github.com/Azure-Samples/iot-devkit-web-simulator#create-an-az3166-device-in-your-iot-hub",
        guideStepRunTitle: "Time to RUN the code!",
        guideStepRunDetail: "Click the Run button to deploy and start the application on your DevKit.",
        guideStepBoardTitle: "Have fun with DevKit!",
        guideStepBoardDetail: "The OLED screen turns on and you can see the real-time status of the DevKit. Click button A to start your shake. Click button B to scroll down the message. Click Reset button to reset the DevKit. Click top-right of this page to quit the wizard.",
        guideStepBoardImageTitle: "",
        guideStepShakeImageTitle: "",
    }
};

export default Localization;
