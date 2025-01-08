# ts-cookie Documentation

## Table of Contents

- [ts-cookie Documentation](#ts-cookie-documentation)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Basic Usage](#basic-usage)
  - [Advanced Usage](#advanced-usage)
    - [Cookie Attributes](#cookie-attributes)
    - [Working with Objects](#working-with-objects)
    - [Custom Converters](#custom-converters)
  - [API Reference](#api-reference)
    - [Cookies.set(name, value, attributes?)](#cookiessetname-value-attributes)
    - [Cookies.get(name?)](#cookiesgetname)
    - [Cookies.remove(name, attributes?)](#cookiesremovename-attributes)
  - [TypeScript Support](#typescript-support)
  - [Browser Compatibility](#browser-compatibility)
  - [Contributing](#contributing)
    - [Development Setup](#development-setup)

## Installation

```bash
# Using npm
npm install ts-cookie

# Using yarn
yarn add ts-cookie

# Using pnpm
pnpm add ts-cookie
```

## Basic Usage

```typescript
import Cookies from 'ts-cookie';

// Set a cookie
Cookies.set('name', 'value');

// Get a cookie
const value = Cookies.get('name');

// Remove a cookie
Cookies.remove('name');
```

## Advanced Usage

### Cookie Attributes

```typescript
// Set a cookie with attributes
Cookies.set('name', 'value', {
  expires: 7, // 7 days from now
  path: '/',
  domain: 'example.com',
  secure: true,
  sameSite: 'Strict',
});

// Set a cookie that expires at a specific date
Cookies.set('name', 'value', {
  expires: new Date('2025-12-31'),
});
```

### Working with Objects

```typescript
// Set an object as a cookie value
Cookies.set('user', JSON.stringify({ id: 1, name: 'John' }));

// Get and parse the cookie value
const user = JSON.parse(Cookies.get('user') || '{}');
```

### Custom Converters

```typescript
// Create a custom converter
const customConverter = {
  read: (value: string) => {
    return value.toUpperCase();
  },
  write: (value: string) => {
    return value.toLowerCase();
  },
};

// Use the custom converter
const cookiesWithConverter = Cookies.withConverter(customConverter);
cookiesWithConverter.set('name', 'Value'); // Stored as 'value'
cookiesWithConverter.get('name'); // Returns 'VALUE'
```

## API Reference

### Cookies.set(name, value, attributes?)

Sets a cookie.

Parameters:

- `name` (string): The name of the cookie
- `value` (string): The value of the cookie
- `attributes` (object, optional): Cookie attributes
  - `expires` (number | Date): Expiration time
  - `path` (string): Cookie path
  - `domain` (string): Cookie domain
  - `secure` (boolean): Secure flag
  - `sameSite` ('Strict' | 'Lax' | 'None'): SameSite attribute

Returns: `string | undefined`

### Cookies.get(name?)

Gets a cookie value or all cookies.

Parameters:

- `name` (string, optional): The name of the cookie

Returns: `string | { [key: string]: string } | undefined`

### Cookies.remove(name, attributes?)

Removes a cookie.

Parameters:

- `name` (string): The name of the cookie
- `attributes` (object, optional): Cookie attributes

## TypeScript Support

The library is written in TypeScript and provides full type definitions.

```typescript
import Cookies from 'ts-cookie';
import type { CookieAttributes } from 'ts-cookie';

// All methods are fully typed
const attributes: CookieAttributes = {
  expires: 7,
  secure: true,
};

Cookies.set('name', 'value', attributes);
```

## Browser Compatibility

The library supports all modern browsers and IE11+. It uses standard Web APIs and includes necessary polyfills for older browsers.

Supported browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11 (with polyfills)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/mehdiasadli/ts-cookie.git

# Install dependencies
npm install

# Run tests
npm test

# Build the library
npm run build

# Run linting
npm run lint
```
