# react-scroll-percentage

[![Greenkeeper badge](https://badges.greenkeeper.io/thebuilder/react-scroll-percentage.svg)](https://greenkeeper.io/)

[![Travis](https://travis-ci.org/thebuilder/react-scroll-percentage.svg?branch=master)](https://travis-ci.org/thebuilder/react-scroll-percentage)
[![Dependency Status](https://david-dm.org/thebuilder/react-scroll-percentage.svg)](https://david-dm.org/thebuilder/react-scroll-percentage)
[![npm](https://img.shields.io/npm/v/react-scroll-percentage.svg)](https://www.npmjs.com/package/react-scroll-percentage)

React component that reports the current scroll percentage of a element inside the viewport.
It uses [React Intersection Observer](https://github.com/thebuilder/react-intersection-observer) to only report the percentage when the element is inside the viewport.

```js
import ScrollPercentage from 'react-scroll-percentage'

<ScrollPercentage>
  {({ percentage }) => (
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

#### Note
To optimize scroll updates, [requestAnimateFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) is used. Make sure your target browsers support it, or include the required polyfill.

## Props
The **`<Observer />`** accepts the following props:

| Name             | Type      | Default           | Required | Description                                           |
| ---------------- | --------- | ----------------- | -------- | ----------------------------------------------------- |
| tag              | String    |                   | false    | Element tag to use for the wrapping component         |
| children         | func/node |                   | false    | Children should be either a function or a node        |
| threshold        | Number    | 0                 | false    | Number between 0 and 1 indicating the the percentage that should be visible before triggering  |
| onChange         | Func      |                   | false    | Call this function whenever the in view state changes |

## Example code

### Child as function
The basic usage pass a function as the child. It will be called whenever the state changes, with an object containing `inView` and `percentage`.

```js
import ScrollPercentage from 'react-scroll-percentage'

<ScrollPercentage>
  {({ percentage, inView }) => (
    <h2>{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</h2>
  )}
</ScrollPercentage>
```


### OnChange callback
You can monitor the onChange method, and control the state in your own component.
The child node will always be rendered.

```js
import ScrollPercentage from 'react-scroll-percentage'

<ScrollPercentage onChange={state => console.log(state)}>
  <h2>
    Plain children are always rendered. Use onChange to monitor state.
  </h2>
</Observer>
```