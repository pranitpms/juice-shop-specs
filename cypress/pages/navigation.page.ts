import { CommonPage } from "./common.page";


export class NavPage {

  public static clickOnDrawer = (): void => {
    cy.get('mat-sidenav.mat-drawer').then((sideNav: JQuery<HTMLElement>) => {
      if (!sideNav.is(':visible')) {
        cy.get('button[aria-label="Open Sidenav"]')
          .click()
          .then(() => {
            expect(sideNav).to.be.visible;
          });
      }
    });
  }

  public static navigateTo = (menuName: string) => {
    if (menuName) {
      cy.get('mat-nav-list')
        .contains(menuName)
        .should('be.visible')
        .click();
    }
  }

  public static verifyPageLoad = (pageName: string) => {
    cy.contains('Customer Feedback').should('be.visible');
    NavPage.setLanguage();
  }

  private static setLanguage = (): void => {
    cy.wait('@getLanguage');
    cy.get('@getLanguage').then((res: any) => {
      expect(res.response.body).not.undefined;
      debugger;
      let name: string = res.request.ulr.match(/([^\/]+)(?=\.\w+$)/)[0];
      let lang = name && name.includes('_') ? name.split('_')[0] : name;
      CommonPage.saveLocalizationObject(lang.toLowerCase(), res.response.body);
    });
  }


}