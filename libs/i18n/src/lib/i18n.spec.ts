import { useTranslations } from './i18n';

// Mock translations for testing
const translationsMap = {
  en: {
    greeting: 'Hello',
    messages: {
      welcome: 'Welcome to our app!',
      goodbye: 'Goodbye!',
    },
  },
  fr: {
    greeting: 'Bonjour',
    messages: {
      welcome: 'Bienvenue sur notre application!',
      goodbye: 'Au revoir!',
    },
  },
};

// Test cases
describe('useTranslations', () => {
  it('should return translation for the specified key in English', () => {
    const lang = 'en';
    const { t } = useTranslations(lang, ['en', 'fr'], translationsMap);
    expect(t('greeting')).toBe('Hello');
    expect(t('messages.welcome')).toBe('Welcome to our app!');
  });

  it('should return translation for the specified key in French', () => {
    const lang = 'fr';
    const { t } = useTranslations(lang, ['en', 'fr'], translationsMap);
    expect(t('greeting')).toBe('Bonjour');
    expect(t('messages.goodbye')).toBe('Au revoir!');
  });

  it('should throw error for unsupported language', () => {
    const lang = 'es'; // Unsupported language
    expect(() => useTranslations(lang, ['en', 'fr'], translationsMap)).toThrow(
      `Unsupported language: ${lang}`
    );
  });

  it('should throw error if translations not found for language', () => {
    const lang = 'de'; // Language with no translations
    expect(() =>
      useTranslations(lang, ['en', 'fr', 'de'], translationsMap)
    ).toThrow(`Translations not found for language: ${lang}`);
  });

  it('should throw error if translation key not found', () => {
    const lang = 'en';
    const { t } = useTranslations(lang, ['en', 'fr'], translationsMap);
    // @ts-expect-error it's not a valid key
    expect(() => t('invalidKey')).toThrow(
      `Translation key "invalidKey" not found in "${lang}" locale`
    );
  });
});
