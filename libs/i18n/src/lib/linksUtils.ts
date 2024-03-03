import { trim } from './utils';

const defaultLocale = import.meta.env['VITE_DEFAULT_LOCALE'] || 'fr';

export const trimSlash = (s: string) => trim(trim(s, '/'));
/**
 * Concatenate input paths into a single path, handling leading and trailing slashes.
 *
 * @param {string} ...params - The input parameters to be concatenated into a path.
 * @return {string} The concatenated path with proper leading and trailing slash handling.
 */
const createPath = (...params: string[]): string => {
  // Map each path to trimmed version and remove empty strings
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el);

  // Join the paths with a '/' and a trailing '/' if necessary
  const path = `/${paths.join('/')}${
    import.meta.env['VITE_SITE_TRAILING_SLASH'] && paths.length
      ? '/'
      : ''
  }`;

  return path;
};


const BASE_PATHNAME = import.meta.env['VITE_SITE_BASE'] || '/';

export const getPermalink = (slug = ''): string => {
  const permalink: string = createPath(slug);
  return createPath(BASE_PATHNAME, permalink);
};

export const getLocalizedPermalink = (locale: string, slug = ''): string => {
  const permalink = getPermalink(slug);
  return locale === defaultLocale ? permalink : createPath(locale, permalink);
};

/** */
export const getLocalizedHomePermalink = (locale: string): string =>
  getLocalizedPermalink(locale, '/');
