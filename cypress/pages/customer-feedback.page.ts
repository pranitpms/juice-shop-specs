import { CommonPage } from "./common.page";

export class CustomerFeedbackPage {

    public static addComment = (charcterLength: number): void => {
        cy.fixture('feedback.comment.json')
            .then((feedback: any) => {
                let comment = CustomerFeedbackPage.getComment(feedback.comment, charcterLength);
                cy.get('textarea#comment').type(`${comment}{tab}`);
            });
    }

    public static addRating = (star: number): void => {
        star = star > 5 ? 5 : star;
        const arrows = '{rightarrow}'.repeat(star);

        cy.get('mat-slider#rating')
            .should('have.attr', 'aria-valuenow', 0)
            .type(arrows);

        cy.get('mat-slider#rating')
            .should('have.attr', 'aria-valuenow', star);
    }

    public static addWrongCaptcha = (): void => {
        cy.get('#captcha')
            .wait(2000)
            .then((captcha: JQuery<HTMLElement>) => {
                if (captcha) {
                    let result = Number(eval(captcha.text())) * -1;
                    cy.get('#captchaControl').type(`${result}{tab}`);
                }
            });
    }

    public static addNoCaptcha = (): void => {
        cy.get('#captcha')
            .wait(2000)
            .then((captcha: JQuery<HTMLElement>) => {
                if (captcha) {
                    cy.get('#captchaControl').type(`{tab}`);
                }
            });
    }

    public static addCaptcha = (text: string = null): void => {
        cy.get('#captcha')
            .wait(2000)
            .then((captcha: JQuery<HTMLElement>) => {
                if (captcha) {
                    let result = text ? text : eval(captcha.text());
                    cy.get('#captchaControl').type(`${result}{tab}`);
                }
            });
    }

    public static submitFeedBack = (): void => {
        cy.intercept('POST', 'https://juice-shop.herokuapp.com/api/Feedbacks/').as('postFeedback');

        cy.get('#submitButton')
            .should('be.enabled')
            .click();
    }

    public static verifyCommentValidation = (): void => {
        cy.get('button[aria-label="Language selection menu"] span[class="mat-button-wrapper"] span')
            .then(($span) => {
                let lang = $span.text().trim().toLocaleLowerCase();
                cy.get('mat-error#mat-error-3')
                    .should('be.visible')
                    .then((error) => {
                        expect(error.text()).to.equal(CommonPage.translate('MANDATORY_COMMENT', lang));
                    })
            });
    }

    public static verifyCaptchValidation = (): void => {
        cy.get('button[aria-label="Language selection menu"] span[class="mat-button-wrapper"]span')
            .then(($span) => {
                debugger;
                let lang = $span.text().trim().toLocaleLowerCase();
                cy.get('mat-error#mat-error-4')
                    .should('be.visible')
                    .then((error) => {
                        expect(error.text()).to.equal(CommonPage.translate('INVALID_CAPTCHA', lang));
                    })
            });
    }

    public static verifyMandatoryCaptchValidation = (): void => {
        cy.get('button[aria-label="Language selection menu"] span[class="mat-button-wrapper"]span')
            .then(($span) => {
                debugger;
                let lang = $span.text().trim().toLocaleLowerCase();
                cy.get('mat-error#mat-error-4')
                    .should('be.visible')
                    .then((error) => {
                        expect(error.text()).to.equal(CommonPage.translate('MANDATORY_CAPTCHA', lang));
                    })
            });
    }

    public static verifyFormControls = (): void => {
        cy.get('#mat-input-1').should('be.disabled');
        cy.get('#comment').should('be.enabled');
        cy.get('#rating').should('be.enabled');
        cy.get('#captchaControl').should('be.enabled');
        cy.get('#submitButton').should('be.disabled');
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