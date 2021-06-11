# p5.teach.js

p5.teach.js provide tools for teaching through p5.js, such as functions to animate text, TeX and shapes. Our goal is to introduce a simple, easy to use library to animate and make scenes.

## Get Started

## Documentation
[API Reference](api_reference.md) 

## Setting up the development environment

1. Yarn should be preinstalled
2. Run `yarn install` for installing the dependencies
3. Run `yarn dev` for running the dev environment
4. As the code is updated, final js file is updated in `dist/p5.teach.js` dynamically
5. The sketch in `index.html` file is reflected with the changes

## Tests

1. We use `jest` for testing
2. Run `yarn test` for running tests
3. Tests are in `src/test`

## Formatting the code

1. Before submitting PR, run `yarn prettier` to format the code

## Build

1. Run `yarn build` to export the final js file
2. Final js file is exported as `dist/p5.teach.js`
