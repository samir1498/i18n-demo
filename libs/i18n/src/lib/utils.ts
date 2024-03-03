import type { NestedObject } from './types';

/**
 * Trim leading and trailing characters from a string.
 * @param str The string to trim.
 * @param ch The character to trim (default is whitespace).
 * @return The trimmed string.
 */
export const trim = (str = '', ch?: string) => {
  // Initialize start and end indices for the substring
  let start = 0;
  let end = str.length;

  // Trim leading characters
  while (start < end && str[start] === ch) {
    // Increment start index if the character at the current index is the trim character
    start += 1;
  }

  // Trim trailing characters
  while (end > start && str[end - 1] === ch) {
    // Decrement end index if the character at the current index is the trim character
    end -= 1;
  }

  // Return the substring if there were characters to trim, otherwise return the original string
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

/**
 * Get the value from a nested object based on a dot notation path.
 * @param obj The nested object to retrieve the value from.
 * @param path The dot notation path to the desired value.
 * @returns The value if found, or undefined if not found.
 */
export function getValueFromPath(
  obj: NestedObject,
  path: string,
): NestedObject | string | NestedObject[] | undefined {
  // Split the dot notation path into individual keys
  const keys = path.split('.');

  // Initialize the current value to the nested object
  let value: NestedObject | string | NestedObject[] = obj;

  // Iterate over each key in the path
  for (const key of keys) {
    // If the current value is an object and the key is in the object,
    if (typeof value === 'object' && value !== null && key in value) {
      // set the current value to the value at the key
      value = value[key] as NestedObject;
    } else {
      // If the key is not found, return undefined
      return undefined;
    }
  }

  // Return the final value if it was found
  return value;
}


// Function to retrieve string value from nested object based on path
export function getStringFromPath(
  obj: NestedObject,
  path: string,
): string | undefined {
  const value = getValueFromPath(obj, path);
  return typeof value === 'string' ? value : undefined;
}

export function getListFromPath(
  obj: NestedObject,
  path: string,
): NestedObject[] | undefined {
  const value = getValueFromPath(obj, path);
  return Array.isArray(value) ? value : undefined;
}
