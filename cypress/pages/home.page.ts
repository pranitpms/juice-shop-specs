

export class HomePage {

    public static validatePageIsLoaded = (): void => {
        cy.get('img[alt="OWASP Juice Shop"]').should('be.visible');
    }

    public static visitApplication = (): void => {
        cy.visit('https://juice-shop.herokuapp.com/#/');
        HomePage.acceptCookies();
        HomePage.dismissWelcomeBanner();

         cy.intercept('GET','https://juice-shop.herokuapp.com/assets/i18n/en.json').as('getLanguage');

        
    }

    private static acceptCookies = (): void => {
        cy.get('.cc-btn')
            .then(($button) => {
                if ($button.is(':visible')) {
                    cy.wrap($button).click();
                }
            });
    }

    private static dismissWelcomeBanner = (): void => {
        cy.get('button[aria-label="Close Welcome Banner"]')
            .then(($button) => {
                if ($button.is(':visible')) {
                    cy.wrap($button).click();
                }
            });
    }

}