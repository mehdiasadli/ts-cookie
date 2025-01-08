import { assign } from './assign';
import type { CookieAttributes, Converter, CookieApi } from './types';

export function init(converter: Converter, defaultAttributes: CookieAttributes): CookieApi {
  function set(name: string, value: string, attributes?: CookieAttributes): string | undefined {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const finalAttributes = assign({}, defaultAttributes, attributes || {}) as CookieAttributes;

    if (typeof finalAttributes.expires === 'number') {
      finalAttributes.expires = new Date(Date.now() + finalAttributes.expires * 864e5);
    }
    if (finalAttributes.expires instanceof Date) {
      finalAttributes.expires = finalAttributes.expires.toUTCString();
    }

    const encodedName = encodeURIComponent(name)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, (c) => (c === '(' ? '%28' : '%29'));

    let stringifiedAttributes = '';

    for (const attributeName in finalAttributes) {
      if (!finalAttributes[attributeName]) {
        continue;
      }

      stringifiedAttributes += `; ${attributeName}`;

      if (finalAttributes[attributeName] === true) {
        continue;
      }

      // Handle RFC 6265 section 5.2
      const attributeValue = finalAttributes[attributeName];
      stringifiedAttributes += `=${String(attributeValue).split(';')[0]}`;
    }

    return (document.cookie = `${encodedName}=${converter.write(value, name)}${stringifiedAttributes}`);
  }

  function get(name?: string): string | { [key: string]: string } | undefined {
    if (typeof document === 'undefined' || (arguments.length && !name)) {
      return undefined;
    }

    const cookies = document.cookie ? document.cookie.split('; ') : [];
    const jar: { [key: string]: string } = {};

    for (const cookie of cookies) {
      const parts = cookie.split('=');
      const value = parts.slice(1).join('=');

      try {
        const found = decodeURIComponent(parts[0]);
        if (!(found in jar)) {
          jar[found] = converter.read(value, found);
        }
        if (name === found) {
          break;
        }
      } catch {
        // Ignore parsing errors
      }
    }

    return name ? jar[name] : jar;
  }

  function remove(name: string, attributes?: CookieAttributes): void {
    set(
      name,
      '',
      assign({}, attributes || {}, {
        expires: -1,
      })
    );
  }

  const api: CookieApi = {
    set,
    get,
    remove,
    withAttributes(attributes: CookieAttributes): CookieApi {
      return init(this.converter, assign({}, this.attributes, attributes));
    },
    withConverter(converter: Partial<Converter>): CookieApi {
      return init(assign({} as Converter, this.converter, converter), this.attributes);
    },
  };

  return Object.create(api, {
    attributes: { value: Object.freeze(defaultAttributes) },
    converter: { value: Object.freeze(converter) },
  }) as CookieApi;
}
