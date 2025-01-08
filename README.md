# ts-cookie

A modern, TypeScript-first cookie library for browsers. This is a TypeScript reimplementation of the popular js-cookie library with enhanced features and type safety.

## Installation

```bash
npm install ts-cookie
# or
yarn add ts-cookie
# or
pnpm add ts-cookie
```

## Usage

```typescript
import Cookies from 'ts-cookie';

// Basic usage
Cookies.set('name', 'value');
Cookies.get('name'); // => 'value'
Cookies.remove('name');

// Set cookie with attributes
Cookies.set('name', 'value', {
  expires: 7, // 7 days
  path: '/',
  domain: 'example.com',
  secure: true,
  sameSite: 'Strict',
});

// Get all cookies
const allCookies = Cookies.get();

// Remove cookie with attributes
Cookies.remove('name', {
  path: '/',
  domain: 'example.com',
});
```

## API

### `set(name: string, value: string, attributes?: CookieAttributes): string | undefined`

Sets a cookie with the given name and value. Optionally accepts attributes.

### `get(name?: string): string | { [key: string]: string } | undefined`

Gets a cookie value by name, or all cookies if no name is provided.

### `remove(name: string, attributes?: CookieAttributes): void`

Removes a cookie by name. Attributes are optional.

## License

MIT
