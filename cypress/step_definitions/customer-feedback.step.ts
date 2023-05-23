import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CustomerFeedbackPage } from "../pages/customer-feedback.page";



Given(`User added a comment of {int} character length`, (length: number) => {
    CustomerFeedbackPage.addComment(length);
});

Given(`User gave {int} stars rating`, (rating: number) => {
    CustomerFeedbackPage.addRating(rating);
});

Given('User type captcha result', () => {
    CustomerFeedbackPage.addCaptcha();
});

Given('User submit the feedback', () => {
    CustomerFeedbackPage.submitFeedBack();
})

Then('Verify form controls initial state', () => {
    CustomerFeedbackPage.verifyFormControls();
});

Then(`Comment field should show validation message`, () => {
    CustomerFeedbackPage.verifyCommentValidation();
});

When('User give captcha value as {string}', (value: string) => {
    CustomerFeedbackPage.addCaptcha(value);
});

When('User give wrong captcha value', () => {
    CustomerFeedbackPage.addWrongCaptcha();
});

When('User give no captcha value', () => {
    CustomerFeedbackPage.addNoCaptcha();
});

Then(`Captcha field should show validation message`, () => {
    CustomerFeedbackPage.verifyCaptchValidation();
});

Then(`Captcha field should show mandatory validation message`, () => {
    CustomerFeedbackPage.verifyMandatoryCaptchValidation();
});

Then('verify the customer feedback is submitted successfully', () => {
    CustomerFeedbackPage.verifyCustomerFeedbackIsValid();
});

Then('verify the result for Invalid captcha', () => {
    CustomerFeedbackPage.verifyResultForInvalidCaptch();
});