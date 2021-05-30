# p5.teach.js

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

# Reference

## MObjects : TeX and Text

`TeX` creates TeX 

```js
let tex = new TeX(
  '\\overrightarrow{F}_{12} = k_e \\frac{q_1 q_2}{r^2}',
  2000,
  width / 2,
  height / 2
);
```

`object.play('animation-type')` plays the choosen animation

`object.shiftTo(x,y)` shifts the object to specified position

## TODO

- [ ] time line controls
- [ ] update values in text and TeX
- [ ] Scene : how to implement ?
- [ ] documentation
