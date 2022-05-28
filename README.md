# p5.teach.js

<img src="https://two-ticks.github.io/p5.teach.js/assets/p5-astrik-teach.png" alt="astrik-logo" />

> A beginner friendly math animation library for p5.js

p5.teach.js provides tools for teaching through p5.js, such as functions to animate text, TeX, and shapes.

## Get Started

## Documentation

- [TypeDoc Documentation](https://two-ticks.github.io/p5.teach.js/docs/index.html)
- [API Reference](https://two-ticks.github.io/p5.teach.js/api_reference)
- [Example Sketches](https://editor.p5js.org/radium.scientist/collections/-xxYz8cof)

## Setting up the development environment

1. Yarn should be preinstalled
2. Run `yarn install` for installing the dependencies
3. Run `yarn dev` for running the dev environment
4. As the code is updated, the final js file is updated in `dist/p5.teach.js` dynamically
5. The sketch in the `index.html` file is reflected with the changes

## Generating documentation

1. We use `TypeDoc`
2. Run `yarn typedoc src` for generating docs

## Tests

1. We use `jest` for testing
2. Run `yarn test` for running tests
3. Tests are in `src/test`

## Formatting the code

1. Before submitting PR, run `yarn prettier` to format the code

## Build

1. Run `yarn build` to export the final js file
2. Final js file is exported as `dist/p5.teach.js`
