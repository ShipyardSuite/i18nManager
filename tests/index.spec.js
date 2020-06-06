import { expect } from 'chai';
import i18nManager from '../dist/index';

let translations = undefined;

describe('i18nManager', () =>
{
    describe('constructor', () =>
    {
        it('should have created an instance', () => 
        {
            translations = new i18nManager();

            expect(translations).to.not.equal(undefined);
        });

        it('should have language set to english as default', () => 
        {
            expect(translations.language).to.equal('en');
        });

        it('should have changed language to german', () => 
        {
            translations.setLanguage('de');

            expect(translations.language).to.equal('de');
        });
        
        it('should throw an error if no translations found', () => 
        {
            translations.setPath('./i18n/');
            expect(translations.translations).to.equal(undefined);
        });
        
        it('should load example translations', () => 
        {
            translations.setPath('./tests/i18n/');
            expect(translations.translations).to.not.equal(undefined);
        });

        it('should not find a message', () => 
        {
            translations.setLanguage('en');
            expect(translations.message('test.test')).to.equal('[MISSING]');
        });

        it('should not find a message with value', () => 
        {
            expect(translations.messageWithValue('test.test', 'test')).to.equal('[MISSING]');
        });

        it('should get an example message in english', () =>
        {
            expect(translations.message('test.firstMessage')).to.equal('Hello World!');
        });

        it('should get an example message with value in english', () =>
        {
            expect(translations.messageWithValue('test.secondMessage', 'works')).to.equal('This works.');
        });

        it('should get an example message in german', () => 
        {
            translations.setLanguage('de');
            expect(translations.message('test.firstMessage')).to.equal('Hallo Welt!');
        });

        it('should get an example message with value german', () => 
        {
            expect(translations.messageWithValue('test.secondMessage', 'funktioniert')).to.equal('Es funktioniert.');
        });
    });
});
