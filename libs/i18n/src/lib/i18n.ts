// translator.ts
import { getLocalizedPermalink } from './linksUtils';
import type { ObjectDotNotation } from './types';
import { getListFromPath, getStringFromPath } from './utils';

// Function to provide translations based on selected language
export function useTranslations<T>(
  lang: string,
  locales: string[],
  translationsMap: Record<string, T>
) {
  // Validate language
  if (!locales.includes(lang)) {
    throw new Error(`Unsupported language: ${lang}`);
  }

  // Retrieve translations for the selected language
  const translations = translationsMap[lang];

  // Throw error if translations not found
  if (!translations) {
    throw new Error(`Translations not found for language: ${lang}`);
  }

  // Return object with translation function
  return {
    t: function (key: ObjectDotNotation<typeof translations>) {
      // Retrieve translation for the specified key
      const value = getStringFromPath(translations, key);

      // Throw error if translation not found
      if (value !== undefined) {
        return value;
      } else {
        throw new Error(
          `Translation key "${key}" not found in "${lang}" locale`
        );
      }
    },
    l: function (slug = '') {
      return getLocalizedPermalink(lang, slug);
    },
    tList: function (key: ObjectDotNotation<typeof translations>) {
      const value = getListFromPath(translations, key);

      if (value !== undefined) {
        return value;
      } else {
        throw new Error(
          `List translation key "${key}" not found in "${lang}" locale`
        );
      }
    },
  };
}
