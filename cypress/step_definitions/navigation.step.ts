import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { NavPage } from "../pages/navigation.page";

When('User click on drawer icon',()=>{
    NavPage.clickOnDrawer();
});

When(`Navigate to {string} Page`,(menuName :string)=>{
    NavPage.navigateTo(menuName);
});

Then(`verify that {string} Page is Loaded`, (pageTitle :string)=>{
    NavPage.verifyPageLoad(pageTitle);
});