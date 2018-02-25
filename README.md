# auth-param-parser

Parses the `auth-param` syntax from [RFC7235](https://tools.ietf.org/html/rfc7235).

## Install

```bash
yarn add auth-param-parser
# or
npm install auth-param-parser
```

```js
import { stringifyAuthParams, parseAuthParams } from "auth-param-parser";
# or
const { stringifyAuthParams, parseAuthParams } = require("auth-param-parser");
```

## Usage

### Parse

```js
parseAuthParams(`foo="bar",foofoo="barbar"`);
```

```js
{
	foo: "bar",
	foofoo: "barbar"
}
```

## Stringify

```js
stringifyAuthParams({
	foo: "bar",
	foofoo: "barbar"
});
```

```
foo="bar",foofoo="barbar"
```
