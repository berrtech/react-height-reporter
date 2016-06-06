# react-height-reporter [![npm](https://img.shields.io/npm/v/react-height-reporter.svg?style=flat-square)](https://www.npmjs.com/package/react-height-reporter)

React component-wrapper detecting height changes of it's children.

Heavily inspired by [react-height](https://github.com/nkbt/react-height/) but somehow it wasn't accurate enough so I tried to make my own implementation.
This implementation uses ResizeSensor from [css-element-queries](https://github.com/marcj/css-element-queries)

## Installation

### NPM

```sh
npm install --save react react-dom react-height-reporter
```

Don't forget to manually install peer dependencies (`react`, `react-dom`) if you use npm@3.

## Usage
```js
import HeightReporter from 'react-height-reporter';

<HeightReporter onHeightChange={height => console.log(height)}>
  <div>CONTENT GOES HERE</div>
  <div>AND HERE</div>
</HeightReporter>
```

## Options


#### `onHeightChange`: PropTypes.func.isRequired

Callback called on mount and height changes


#### `children`: PropTypes.node.isRequired

Children with static or dynamic height

#### Pass-through props

You can pass any valid props, like `style` or `className` to HeightReporter, they will be applied to container

## Run

To run example, use `npm start` and then go to http://localhost:8080

## License

MIT
