/**
 * This class contains the i18n translation manager.
 */
class i18nManager
{
    /**
     * @constructor
     * 
     * @param {String} language 
     */
    constructor(language)
    {
        this.language = language || 'en';
        this.path = './../../../i18n/';

        this.translations = {};

        this.getTranslations();
    }

    /**
     * Searches for nested objects in the translation object.
     * 
     * @param {Object} nestedObj 
     * @param {Array} pathArr 
     * 
     * @returns {Object}
     */
    searchNestedObject(nestedObj, pathArr)
    {
        return pathArr.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
    }

    /**
     * Gets all translations.
     */
    getTranslations()
    {
        let translationFiles;

        try {
            translationFiles = require(this.path);
        }
        catch (e) {
            // console.log("Translation files not found.")
        }
        this.translations = translationFiles;
    }

    /**
     * Sets the language of the translation manager.
     * 
     * @example const translations = new i18nManager(); 
     * translations.setLanguage('de');
     * 
     * @param {String} language 
     */
    setLanguage(language)
    {
        this.language = language;
    }

    /**
     * Sets the path to the translation files.
     * 
     * @example const translations = new i18nManager(); 
     * translations.setPath('./../i18n/');
     * 
     * @param {String} path 
     */
    setPath(path)
    {
        this.path = path;

        this.getTranslations();
    }

    /**
     * Searches the translation message according to given key.
     * 
     * @example const translations = new i18nManager(); 
     * translations.message("test.sentence");
     * 
     * @param {String} key 
     * 
     * @returns {String} Returns the message connected to the given key.
     */
    message(key)
    {
        const searchElements = key.split('.');
        const response = this.searchNestedObject(this.translations[this.language], searchElements);

        return response !== undefined ? response : '[MISSING]';
    }

    /**
     * Searches the translation message according to given key including a value.
     * 
     * @example const translations = new i18nManager(); 
     * translations.messageWithValue("test.sentence", "value");
     * 
     * @param {String} key
     * @param {String} value
     * 
     * @returns {String} Returns the message connected to the given key including the inserted value.
     */
    messageWithValue(key, val)
    {
        return this.message(key) !== '[MISSING]' ? this.message(key).replace('{val}', val) : this.message(key);
    }
}

export default i18nManager;