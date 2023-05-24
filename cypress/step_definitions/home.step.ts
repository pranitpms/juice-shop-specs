import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../pages/home.page";
import { CommonPage } from "../pages/common.page";

Given('User visit the application', () => {
    HomePage.visitApplication();
});

Then('Verify user is landed on Home Page', () => {
    HomePage.validatePageIsLoaded();
});


Given('User change the language to {word}', (language: string) => {
    CommonPage.selectLanguage(language);
});
