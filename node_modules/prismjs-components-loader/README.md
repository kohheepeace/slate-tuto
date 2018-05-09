# prismjs-components-loader

[![NPM version](https://badge.fury.io/js/prismjs-components-loader.svg)](http://badge.fury.io/js/prismjs-components-loader)

Exposes PrismJS components (language definitions) as functions taking a Prism instance as argument.

This package will be helpful if:

- You do not want components to inject themselves in a global Prism instance
- You want to delay the loading of components. Loading all 120 existing components can take up to 2 seconds of JS execution time in a browser environment. With this package, you can lazy load the language definitions.

## Install

```
yarn add prismjs-components-loader
```

## Usage

You can use the `load` function to dynamically load a component and its dependencies:

```js
const Prism = require('prismjs');
const PrismLoader = require('prismjs-components-loader');
const componentIndex = require('prismjs-components-loader/all-components');

const prismLoader = new PrismLoader(componentIndex);

// Inject components and their dependencies
prismLoader.load(Prism, 'jsx');
prismLoader.load(Prism, 'yaml');

// JSX and Yaml were injected
assert(Boolean(Prism.languages.jsx));
assert(Boolean(Prism.languages.yaml));

// ... use Prism normally
```

Alternatively, you can just require the individual components files. This is useful if you are using a bundler like `browserify` and you don't want every components to be bundled. The example below should only include the source for `prism-jsx`:

```js
const Prism = require('prismjs');
const prismJsx = require('prismjs-components-loader/components/prism-jsx');

// Inject JSX component manually
prismJsx(Prism);

// ... use Prism normally
```

## API Reference

### Constructor

##### `PrismLoader(componentsIndex)`

Create a new instance of a PrismLoader. You must provide it an index of component sources, which is a `Map<componentId, componentExport>`. `all-components` is provided for you and contains all existing components. You can alternatively use `common-components` which contains the most common ones (subjectively). Or you can provide your own.

### Static methods

##### `PrismLoader.COMPONENTS: Object<string, ComponentDefinition>`

A map between component IDs and their metadata.

```js
type ComponentDefinition = {
    title: string, // Human readable name of the component
    shorthands: Array<string>, // List of alternate identifiers. For example `ruby` and `rb`
    require: Array<string> // The list of component IDs this component depends on
}
```

##### `PrismLoader.getDependencies(component: ComponentDefinition, prism: ?Prism): Array<string>`

Returns a component's list of dependencies. If passed a Prism instance, filters out already loaded dependencies.

##### `PrismLoader.isCommon(componentId: string): boolean`

Returns true if the component is a common and popular one. This is totally subjective.

### Instance methods

##### `prismLoader.load(prism: Prism, componentId: string): void`

Inject a component and its dependencies in the given Prism instance. Does not load already loaded components.
