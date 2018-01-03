# react-scroll-percentage

[![Greenkeeper badge](https://badges.greenkeeper.io/thebuilder/react-scroll-percentage.svg)](https://greenkeeper.io/)
[![Travis](https://travis-ci.org/thebuilder/react-scroll-percentage.svg?branch=master)](https://travis-ci.org/thebuilder/react-scroll-percentage)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/react-scroll-percentage.svg)](https://www.npmjs.com/package/react-scroll-percentage)

React component that reports the current scroll percentage of a element inside
the viewport. It uses [React Intersection
Observer](https://github.com/thebuilder/react-intersection-observer) to only
report the percentage when the element is inside the viewport.

```js
import ScrollPercentage from 'react-scroll-percentage'

<ScrollPercentage>
  {( percentage ) => (
    <h2>{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</h2>
  )}
</ScrollPercentage>
```

## Demo

See https://thebuilder.github.io/react-scroll-percentage/ for a demo.

## Installation

Install using [Yarn](https://yarnpkg.com):

```sh
yarn add react-scroll-percentage
```

or NPM:

```sh
npm install react-scroll-percentage --save
```

## Polyfills

### intersection-observer

The component requires the [intersection-observer
API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
to be available on the global namespace. At the moment you should include a
polyfill to ensure support in all browsers.

You can import the
[polyfill](https://yarnpkg.com/en/package/intersection-observer) directly or use
a service like [polyfill.io](https://polyfill.io/v2/docs/) that can add it when
needed.

```sh
yarn add intersection-observer
```

Then import it in your app:

```js
import 'intersection-observer'
```

If you are using Webpack (or similar) you could use [dynamic
imports](https://webpack.js.org/api/module-methods/#import-), to load the
Polyfill only if needed. A basic implementation could look something like this:

```js
loadPolyfills()
  .then(() => /* Render React application now that your Polyfills are ready */)

/**
* Do feature detection, to figure out which polyfills needs to be imported.
**/
function loadPolyfills() {
  const polyfills = []

  if (!supportsIntersectionObserver()) {
    polyfills.push(import('intersection-observer'))
  }

  return Promise.all(polyfills)
}

function supportsIntersectionObserver() {
  return (
    'IntersectionObserver' in global &&
    'IntersectionObserverEntry' in global &&
    'intersectionRatio' in IntersectionObserverEntry.prototype
  )
}
```

### requestAnimationFrame

To optimize scroll updates,
[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
is used. Make sure your target browsers support it, or include the required
polyfill.

## Props

The **`<ScrollPercentage />`** accepts the following props:

| Name      | Type                                            | Default | Required | Description                                                                                   |
| --------- | ----------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------------- |
| tag       | Node                                            | 'div'   | true     | Element tag to use for the wrapping component                                                 |
| children  | ((percentage: number, inView: boolean) => Node) |         | true     | Children should be either a function or a node                                                |
| threshold | Number                                          | 0       | false    | Number between 0 and 1 indicating the the percentage that should be visible before triggering |
| onChange  | (percentage: number, inView: boolean) => void   |         | false    | Call this function whenever the in view state changes                                         |
| innerRef  | (element: ?HTMLElement) => void                 |         | false    | Get a reference to the the inner DOM node                                                     |

## Example code

### Child as function

The basic usage pass a function as the child. It will be called whenever the
state changes, with the current value of `percentage` and `inView`.

```js
import ScrollPercentage from 'react-scroll-percentage'

<ScrollPercentage>
  {(percentage, inView ) => (
    <h2>{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</h2>
  )}
</ScrollPercentage>
```

### OnChange callback

You can monitor the onChange method, and control the state in your own
component. The child node will always be rendered.

```js
import ScrollPercentage from 'react-scroll-percentage'

<ScrollPercentage onChange={(percentage, inView) => console.log(percentage, inView)}>
  <h2>
    Plain children are always rendered. Use onChange to monitor state.
  </h2>
</ScrollPercentage>
```
