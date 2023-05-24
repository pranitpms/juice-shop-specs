import { HomeLocator } from "../support/locators/home.locator";

export class CommonPage {

    public static selectLanguage = (language: string): void => {
        if (language) {
            let currentPageLanguage = CommonPage.getPageLangauage(language);
            cy.get(HomeLocator.LANGUAGEBUTTON).as('langbtn');
            cy.get('@langbtn').then(($span) => {
                    if ($span.text().trim() != currentPageLanguage) {
                        cy.get(HomeLocator.LANGUAGESELECTIONMENU).click();
                        let langClass = CommonPage.getLanguageClass(language);
                        cy.get(langClass).click();
                        CommonPage.setLanguage();
                    }
                });
        }
    }

    public static setLanguage = (): void => {
        cy.wait('@getLanguage');
        cy.get('@getLanguage').then((res: any) => {
          expect(res.response.body).not.undefined;
          let name: string = res.request.url.match(/([^\/]+)(?=\.\w+$)/)[0];
          let lang = name && name.includes('_') ? name.split('_')[0] : name;
          CommonPage.saveLocalizationObject(res.response.body, lang.toLowerCase());
        });
      }

    public static saveLocalizationObject = (obj: any, language: string): void => {
        window.localStorage.setItem(`${language}localization`, JSON.stringify(obj));
    }

    public static translate = (key: string,language: string): string => {
        let value: string = key;
        if (key) {
            let obj = JSON.parse(window.localStorage.getItem(`${language}localization`));
            if (obj)
                value = obj[key];
        }
        return value;
    }

    private static getPageLangauage = (language: string): string => {
        switch (language) {
            case 'English': return 'EN';
            case 'الحساب': return 'AR';
            case 'हिंदी': return 'HI';
            case 'Deutsch': return 'DE';
            case '中文': return 'CN';
            default: return 'EN';
        }
    }

    private static getLanguageClass = (language: string): string => {
        switch (language) {
            case 'English': return '.fi-gb';
            case 'الحساب': return '.fi-ae';
            case 'हिंदी': return '.fi-in';
            case 'Deutsch': return '.fi-de';
            case '中文': return '.fi-cn';
            default: return '.fi-gb';
        }
    }
}
