[![NPM version](https://badge.fury.io/js/%40dizmo%2Ffunctions-deprecated.svg)](https://npmjs.org/package/@dizmo/functions-deprecated)
[![Build Status](https://travis-ci.com/dizmo/functions-deprecated.svg?branch=master)](https://travis-ci.com/dizmo/functions-deprecated)
[![Coverage Status](https://coveralls.io/repos/github/dizmo/functions-deprecated/badge.svg?branch=master)](https://coveralls.io/github/dizmo/functions-deprecated?branch=master)

# @dizmo/functions-deprecated

A decorator to deprecate class methods.

## Usage

### Installation

```sh
npm install @dizmo/functions-deprecated --save
```

### Require

```javascript
import '@dizmo/functions-deprecated';
```

### Example(s)

```javascript
class MyClass {
    @deprecated('message')
    method() {
        ...
    }
}
```

## Development

### Clean

```sh
npm run clean
```

### Build

```sh
npm run build
```

#### without linting and cleaning:

```sh
npm run -- build --no-lint --no-clean
```

#### with UMD bundling (incl. minimization):

```sh
npm run -- build --prepack
```

#### with UMD bundling (excl. minimization):

```sh
npm run -- build --prepack --no-minify
```

### Lint

```sh
npm run lint
```

#### with auto-fixing:

```sh
npm run -- lint --fix
```

### Test

```sh
npm run test
```

#### without linting, cleaning and (re-)building:

```sh
npm run -- test --no-lint --no-clean --no-build
```

### Cover

```sh
npm run cover
```

#### without linting, cleaning and (re-)building:

```sh
npm run -- cover --no-lint --no-clean --no-build
```

## Documentation

```sh
npm run docs
```

## Publication

```sh
npm publish
```

#### initially (if public):

```sh
npm publish --access=public
```

## Copyright

 © 2021 [dizmo AG](https://dizmo.com/), Switzerland
