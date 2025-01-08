export interface CookieAttributes {
  path?: string;
  expires?: number | Date | string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
  [property: string]: any;
}

export interface InternalCookieAttributes extends Omit<CookieAttributes, 'expires'> {
  expires?: string;
}

export interface Converter {
  read: (value: string, name?: string) => string;
  write: (value: string, name?: string) => string;
}

export interface CookieApi {
  set(name: string, value: string, attributes?: CookieAttributes): string | undefined;
  get(name?: string): string | { [key: string]: string } | undefined;
  remove(name: string, attributes?: CookieAttributes): void;
  withAttributes(attributes: CookieAttributes): CookieApi;
  withConverter(converter: Partial<Converter>): CookieApi;
}
