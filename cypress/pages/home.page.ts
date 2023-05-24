import { HomeLocator } from "../support/locators/home.locator";


export class HomePage {

    public static validatePageIsLoaded = (): void => {
        cy.get(HomeLocator.BRANDIMAGE).should('be.visible');
    }

    public static visitApplication = (): void => {
        cy.intercept({method:'GET',url:'https://juice-shop.herokuapp.com/assets/i18n/*'}).as('getLanguage');
        cy.visit('https://juice-shop.herokuapp.com/#/');
        HomePage.acceptCookies();
        HomePage.dismissWelcomeBanner();
    }

    private static acceptCookies = (): void => {
        cy.get(HomeLocator.COOKIEBUTTON)
            .then(($button) => {
                if ($button.is(':visible')) {
                    cy.wrap($button).click();
                }
            });
    }

    private static dismissWelcomeBanner = (): void => {
        cy.get(HomeLocator.WELCOMEBANNER)
            .then(($button) => {
                if ($button.is(':visible')) {
                    cy.wrap($button).click();
                }
            });
    }

}