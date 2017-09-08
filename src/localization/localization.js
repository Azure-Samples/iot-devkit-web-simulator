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
        guideStepDeployDetail: "By clicking the Deploy button, you can provision all the services required in the Shake Shake project, which includes an Azure IoT hub and an Azure Function. Click the button below to learn how to deploy.",
        guideStepDeployLinkName: "How to deploy",
        guideStepDeployLinkHref: "http://www.google.com",
        guideStepFillCSTitle: "Set your configurations",
        guideStepFillCSDetail: "First, select a project you want to run in this simulation, and then, select one file, you can see the code in the middle on this page.",
        guideStepFillCSLinkName: "How to deploy and fill connection string",
        guideStepFillCSLinkHref: "http://www.google.com",
        guideStepFillCSErrorTitle: "Connection string is incorrect",
        guideStepFillCSErrorDetail: "Please deploy cloud resource first and then follow the document to get device connection string",
        guideStepFillCSErrorLinkName: "How to deploy and fill connection string",
        guideStepFillCSErrorLinkHref: "http://www.google.com",
        guideStepRunTitle: "Run your project",
        guideStepRunDetail: "First, select a project you want to run in this simulation, and then, select one file, you can see the code in the middle on this page.",
        guideStepBoardTitle: "Wow~ Have fun with it!",
        guideStepBoardDetail: "First, select a project you want to run in this simulation, and then, select one file, you can see the code in the middle on this page.",
    }
};

export default Localization;
