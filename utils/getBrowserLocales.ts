/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-14
 * Time: 15:21
 * About:
 *
 */



export interface IgetBrowserLocales {
    (languageCodeOnly?:boolean):string[]|undefined
}

const getBrowserLocales:IgetBrowserLocales = function (languageCodeOnly) {

    const opt = {
        languageCodeOnly,
    };

    const browserLocales =
        navigator.languages === undefined
            ? [navigator.language]
            : navigator.languages;

    if (!browserLocales) {
        return undefined;
    }

    return browserLocales.map(locale => {
        const trimmedLocale = locale.trim();

        return opt.languageCodeOnly
            ? trimmedLocale.split(/-|_/)[0]
            : trimmedLocale;
    });
}


export default getBrowserLocales