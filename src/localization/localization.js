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
        pageTitle: "DevKit Simulator",
        pageTitleMobile: "DevKit Simulator",
        runButton: "Run",
        helpButton: "Help",
        buyButton: "Buy",
        getAKitButton: "Get a kit",
        deployButton: "Deploy",
        buyLink: "http://mxchip.com/az3166",
        guideTurnOff: "Turn guides off",
        guideNextStep: "Next step",
        guideStepFileTitle: "Select a file here.",
        guideStepFileDetail: "First, select a project you want to run in this simulation, and then, select one file, you can see the code in the middle on this page.",
        guideStepCodeTitle: "Code display area",
        guideStepCodeDetail: "",
        guideStepDeployTitle: "Deploy your project to Azure",
        guideStepDeployDetail: "",
        guideStepDeployLinkName: "How to deploy",
        guideStepDeployLinkHref: "http://www.google.com",
        guideStepFillCSTitle: "Set your configurations",
        guideStepFillCSDetail: "",
        guideStepFillCSLinkName: "How to deploy and fill connection string",
        guideStepFillCSLinkHref: "http://www.google.com",
        guideStepFillCSErrorTitle: "Connection string is incorrect",
        guideStepFillCSErrorDetail: "Please deploy cloud resource first and then follow the document to get device connection string",
        guideStepFillCSErrorLinkName: "How to deploy and fill connection string",
        guideStepFillCSErrorLinkHref: "http://www.google.com",
        guideStepRunTitle: "Run your project",
        guideStepRunDetail: "",
        guideStepBoardTitle: "Wow~ Have fun with it!",
        guideStepBoardDetail: "",
    }
};

export default Localization;