import { NavigationLocator } from "../support/locators/navigation.locator";
import { CommonPage } from "./common.page";


export class NavPage {
  public static clickOnDrawer = (): void => {
    cy.get(NavigationLocator.DRAWER).then((sideNav: JQuery<HTMLElement>) => {
      if (!sideNav.is(':visible')) {
        cy.get(NavigationLocator.DRAWERBUTTON)
          .click()
          .then(() => {
            expect(sideNav).to.be.visible;
          });
      }
    });
  }

  public static navigateTo = (menuName: string) => {
    if (menuName) {
      cy.get(NavigationLocator.MENULIST)
        .contains(menuName)
        .should('be.visible')
        .click();
    }
  }

  public static verifyPageLoad = (pageName: string) => {
    cy.contains(pageName).should('be.visible');
    CommonPage.setLanguage();
  }
}