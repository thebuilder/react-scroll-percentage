# react-scroll-percentage

[![Version Badge][npm-version-svg]][package-url]
[![GZipped size][npm-minzip-svg]][bundlephobia-url]
[![Build Status][travis-svg]][travis-url]
[![Coverage Statu][coveralls-svg]][coveralls-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Greenkeeper badge][greenkeeper-svg]][greenkeeper-url]
[![styled with prettier][prettier-svg]][prettier-url]

React component that reports the current scroll percentage of a element inside
the viewport. It uses
[React Intersection Observer](https://github.com/thebuilder/react-intersection-observer)
to only report the percentage when the element is inside the viewport.

## Features

- 🎣 **Hooks or Component API** - With `useCrollPercentage` it's easier than
  ever to monitor elements
- ⚡️ **Optimized performance** - Uses `IntersectionObservers` to only update
  when elements are inside the viewport
- 🌳 **Tree-shakeable** - Only include the parts you use

## Installation

Install using [Yarn](https://yarnpkg.com):

```sh
yarn add react-scroll-percentage
```

or NPM:

```sh
npm install react-scroll-percentage --save
```

> ⚠️ You also want to add the
> [intersection-observer](https://www.npmjs.com/package/react-scroll-percentage)
> polyfill for full browser support. Check out adding the [polyfill](#polyfill)
> for details about how you can include it.

## Usage

### Hooks 🎣

#### `useScrollPercentage`

```js
const [ref, percentage] = useScrollPercentage(options)
```

Call the `useScrollPercentage` hook, with the (optional) [options](#options) you
need. It will return an array containing a `ref`, the current scroll
`percentage` and the current
[`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry).
Assign the `ref` to the DOM element you want to monitor, and the hook will
report the status.

```jsx
import React from 'react'
import { useScrollPercentage } from 'react-scroll-percentage'

const Component = () => {
  const [ref, percentage] = useScrollPercentage({
    /* Optional options */
    threshold: 0,
  })

  return (
    <div ref={ref}>
      <h2>{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</h2>
    </div>
  )
}
```

### Render props

To use the `<ScrollPercentage>` component, you pass it a function. It will be
called whenever the user scrolls the viewport, with the new value of
`percentage`. In addition to the `percentage`, children also receives a `ref`
that should be set on the containing DOM element.

If you need it, you can also access the
[`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)
on `entry`, giving you access to all the details about the current intersection
state.

```jsx
import { ScrollPercentage } from 'react-scroll-percentage'

const Component = () => (
  <ScrollPercentage>
    {({ percentage, ref, entry }) => (
      <div ref={ref}>
        <h2>{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</h2>
      </div>
    )}
  </ScrollPercentage>
)

export default Component
```

### Plain children

You can pass any element to the `<ScrollPercentage />`, and it will handle
creating the wrapping DOM element. Add a handler to the `onChange` method, and
control the state in your own component. Any extra props you add the
`<ScrollPercentage />` will be passed to the HTML element, allowing you set the
`className`, `style`, etc.

```jsx
import { ScrollPercentage } from 'react-scroll-percentage'

const Component = () => (
  <ScrollPercentage
    as="div"
    onChange={(percentage, entry) => console.log('Percentage:', percentage)}
  >
    <h2>Plain children are always rendered. Use onChange to monitor state.</h2>
  </ScrollPercentage>
)

export default Component
```

> ⚠️ When rendering a plain child, make sure you keep your HTML output semantic.
> Change the `as` to match the context, and add a `className` to style the
> `<ScrollPercentage />`. The component does not support Ref Forwarding, so if
> you need a `ref` to the HTML element, use the Render Props version instead.

### Options

Provide these as props on the **`<ScrollPercentage />`** component and as the
options argument for the hooks.

| Name            | Type    | Default | Required | Description                                                                                                                                              |
| --------------- | ------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **root**        | Element | window  | false    | The Element that is used as the viewport for checking visibility of the target. Defaults to the browser viewport (`window`) if not specified or if null. |
| **rootMargin**  | string  | '0px'   | false    | Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left).                       |
| **threshold**   | number  | 0       | false    | Number between 0 and 1 indicating the percentage that should be visible before triggering.                                                               |
| **triggerOnce** | boolean | false   | false    | Only trigger this method once                                                                                                                            |

### ScrollPercentage Props

The **`<ScrollPercentage />`** component also accepts the following props:

| Name         | Type                                                         | Default | Required | Description                                                                                                                                                                                                                                                                                                                       |
| ------------ | ------------------------------------------------------------ | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **as**       | `string`                                                     | 'div'   | false    | Render the wrapping element as this element. Defaults to `div`.                                                                                                                                                                                                                                                                   |
| **children** | `({ref, percentage, entry}) => React.ReactNode`, `ReactNode` |         | true     | Children expects a function that receives an object containing the `percentage` boolean and a `ref` that should be assigned to the element root. Alternatively pass a plain child, to have the `<InView />` deal with the wrapping element. You will also get the `IntersectionObserverEntry` as `entry, giving you more details. |
| **onChange** | `(percentage, entry) => void`                                |         | false    | Call this function whenever the in view state changes. It will receive the `percentage` value, alongside the current `IntersectionObserverEntry`.                                                                                                                                                                                 |

## Intersection Observer

[Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
is the API is used to determine if an element is inside the viewport or not.
[Browser support is pretty good](http://caniuse.com/#feat=intersectionobserver) -
With
[Safari adding support in 12.1](https://webkit.org/blog/8718/new-webkit-features-in-safari-12-1/),
all major browsers now support Intersection Observers natively.

### Polyfill

You can import the
[polyfill](https://www.npmjs.com/package/intersection-observer) directly or use
a service like [polyfill.io](https://polyfill.io/v2/docs/) to add it when
needed.

```sh
yarn add intersection-observer
```

Then import it in your app:

```js
import 'intersection-observer'
```

If you are using Webpack (or similar) you could use
[dynamic imports](https://webpack.js.org/api/module-methods/#import-), to load
the Polyfill only if needed. A basic implementation could look something like
this:

```js
/**
 * Do feature detection, to figure out which polyfills needs to be imported.
 **/
async function loadPolyfills() {
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
}
```

[package-url]: https://npmjs.org/package/react-scroll-percentage
[npm-version-svg]: https://img.shields.io/npm/v/react-scroll-percentage.svg
[npm-minzip-svg]: https://img.shields.io/bundlephobia/minzip/react.svg
[bundlephobia-url]: https://bundlephobia.com/result?p=react-scroll-percentage
[travis-svg]: https://travis-ci.org/thebuilder/react-scroll-percentage.svg
[travis-url]: https://travis-ci.org/thebuilder/react-scroll-percentage
[coveralls-svg]:
  https://coveralls.io/repos/github/thebuilder/react-scroll-percentage/badge.svg?branch=master
[coveralls-url]:
  https://coveralls.io/github/thebuilder/react-scroll-percentage?branch=master
[deps-svg]: https://david-dm.org/thebuilder/react-scroll-percentage.svg
[deps-url]: https://david-dm.org/thebuilder/react-scroll-percentage
[dev-deps-svg]:
  https://david-dm.org/thebuilder/react-scroll-percentage/dev-status.svg
[dev-deps-url]:
  https://david-dm.org/thebuilder/react-scroll-percentage#info=devDependencies
[license-image]: http://img.shields.io/npm/l/react-scroll-percentage.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/react-scroll-percentage.svg
[downloads-url]: http://npm-stat.com/charts.html?package=react-scroll-percentage
[greenkeeper-svg]:
  https://badges.greenkeeper.io/thebuilder/react-scroll-percentage.svg
[greenkeeper-url]: https://greenkeeper.io/
[prettier-svg]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg
[prettier-url]: https://github.com/prettier/prettier
