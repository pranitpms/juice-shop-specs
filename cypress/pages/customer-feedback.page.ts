import { FeedbackLocator } from "../support/locators/customer-feedback.locator";
import { CommonPage } from "./common.page";

export class CustomerFeedbackPage {

    public static addComment = (charcterLength: number): void => {
        cy.fixture('feedback.comment.json')
            .then((feedback: any) => {
                let comment = CustomerFeedbackPage.getComment(feedback.comment, charcterLength);
                cy.get(FeedbackLocator.COMMENTTEXT).type(`${comment}`);
            });
    }

    public static addEmptyComment = (): void => {
        cy.get(FeedbackLocator.COMMENTTEXT).as('textarea').focus();
        cy.get('@textarea').blur();
    }

    public static addRating = (star: number): void => {
        const arrows: string = '{rightarrow}'.repeat(star - 1);
        cy.get(FeedbackLocator.RATING)
            .should('have.attr', 'aria-valuenow', 0)
            .focus()
            .type(arrows);

        cy.get(FeedbackLocator.RATING)
            .should('have.attr', 'aria-valuenow', star);
    }

    public static addWrongCaptcha = (): void => {
        cy.get(FeedbackLocator.CAPTCHATEXT)
            .wait(2000)
            .then((captcha: JQuery<HTMLElement>) => {
                if (captcha) {
                    let result = Number(eval(captcha.text())) * -1;
                    cy.get(FeedbackLocator.CAPTCHACONTROL).type(`${result}`);
                }
            });
    }

    public static addNoCaptcha = (): void => {
        cy.get(FeedbackLocator.CAPTCHACONTROL).as('nocaptcha').focus();
        cy.get('@nocaptcha').blur();
    }

    public static addCaptcha = (text: string = null): void => {
        cy.get(FeedbackLocator.CAPTCHATEXT)
            .wait(2000)
            .then((captcha: JQuery<HTMLElement>) => {
                if (captcha) {
                    let result = text ? text : eval(captcha.text());
                    cy.get(FeedbackLocator.CAPTCHACONTROL).type(`${result}`);
                }
            });
    }

    public static submitFeedBack = (): void => {
        cy.intercept('POST', 'https://juice-shop.herokuapp.com/api/Feedbacks/').as('postFeedback');
        cy.get(FeedbackLocator.SUBMITBUTTON)
            .should('be.enabled')
            .click();
    }

    public static verifyCommentValidation = (): void => {
        cy.get('@langbtn')
            .then(($span) => {
                let lang = $span.text().trim().toLocaleLowerCase();
                let error = CommonPage.translate('MANDATORY_COMMENT', lang);
                cy.contains(error);
            });
    }

    public static verifyCaptchValidation = (): void => {
        cy.get('@langbtn')
            .then(($span) => {
                let lang = $span.text().trim().toLocaleLowerCase();
                let error = CommonPage.translate('INVALID_CAPTCHA', lang);
                cy.contains(error);
            });
    }

    public static verifyMandatoryCaptchValidation = (): void => {
        cy.get('@langbtn')
            .then(($span) => {
                let lang = $span.text().trim().toLocaleLowerCase();
                let error = CommonPage.translate('MANDATORY_CAPTCHA', lang);
                cy.contains(error);
            });
    }

    public static verifyFormControls = (): void => {
        cy.get(FeedbackLocator.AUTHOR).should('be.disabled');
        cy.get(FeedbackLocator.COMMENTTEXT).should('be.enabled');
        cy.get(FeedbackLocator.RATING).should('be.visible');
        cy.get(FeedbackLocator.CAPTCHACONTROL).should('be.enabled');
        CustomerFeedbackPage.verifySubmitButtonIsDisabled();
    }

    public static verifySubmitButtonIsDisabled = ():void =>{
        cy.get(FeedbackLocator.SUBMITBUTTON).should('be.disabled');
    }

    public static verifyCustomerFeedbackIsValid = (): void => {
        cy.wait('@postFeedback');
        cy.get('@postFeedback').then((res: any) => {
            CustomerFeedbackPage.verifyValidResponce(res.request, res.response);
        });
    }

    public static verifyResultForInvalidCaptch = (): void => {
        cy.wait('@postFeedback');
        cy.get('@postFeedback').then((res: any) => {
            expect(res.response.statusCode).to.equal(401);
        });
    }


    private static getComment = (comment: string, charcterLength: number): string => {
        if (comment && comment.length <= charcterLength) {
            return comment;
        }
        if (comment.length > charcterLength)
            return comment.substring(0, charcterLength);
        return comment;
    }

    private static verifyValidResponce = (request: any, response: any): void => {
        expect(request).not.undefined;
        expect(response).not.undefined;

        expect(request.body).not.undefined;
        expect(response.body).not.undefined;

        expect(response.body.status).to.equal('success');
        expect(response.body.data.id).to.greaterThan(0);
        expect(response.body.data.comment).to.equal(request.body.comment);
        expect(response.body.data.rating).to.equal(request.body.rating);
    }
}