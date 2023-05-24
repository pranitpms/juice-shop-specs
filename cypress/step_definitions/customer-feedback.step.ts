import { Before, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CustomerFeedbackPage } from "../pages/customer-feedback.page";

Before(() => {
    cy.log('er')
})

Given(`User adds a comment of {int} character length`, (length: number) => {
    CustomerFeedbackPage.addComment(length);
});

When('User keeps comment box empty', () => {
    CustomerFeedbackPage.addEmptyComment();
});

Given(`User gave {int} stars rating`, (rating: number) => {
    CustomerFeedbackPage.addRating(rating);
});

Given('User type captcha result', () => {
    CustomerFeedbackPage.addCaptcha();
});

Given('User submits the feedback', () => {
    CustomerFeedbackPage.submitFeedBack();
})

Then('Verify form controls initial state', () => {
    CustomerFeedbackPage.verifyFormControls();
});

Then(`Comment field should show validation message`, () => {
    CustomerFeedbackPage.verifyCommentValidation();
});

When('User does not add captcha value as {string}', (value: string) => {
    CustomerFeedbackPage.addCaptcha(value);
});

When('User entered wrong captcha value', () => {
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

Then('Verify the customer feedback is submitted successfully', () => {
    CustomerFeedbackPage.verifyCustomerFeedbackIsValid();
});

Then('Verify the result for Invalid captcha', () => {
    CustomerFeedbackPage.verifyResultForInvalidCaptch();
});

Then('Verify submit button is not enabled', () => {
    CustomerFeedbackPage.verifySubmitButtonIsDisabled();
});