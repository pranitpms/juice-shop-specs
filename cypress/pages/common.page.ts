export class CommonPage {

    public static selectLanguage = (language: string): void => {
        if (language) {
            let getCurrentPageLanguage = CommonPage.getPageLangauage(language);
            cy.get('button[aria-label="Language selection menu"] span[class="mat-button-wrapper"] span')
                .then(($span) => {
                    if ($span.text().trim() != getCurrentPageLanguage) {
                        cy.get('button[aria-label="Language selection menu"]').click();
                        let langClass = CommonPage.getLanguageClass(language);
                        cy.get(langClass).click()
                    }
                });
        }
    }

    public static saveLocalizationObject = (obj: any, language: string): void => {
        debugger;
        window.localStorage.setItem(`${language}localization`, obj);
    }

    public static translate = (key: string,language: string): string => {
        debugger;
        let value: string = key;
        if (key) {
            let obj = window.localStorage.getItem(`${language}localization`);
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
