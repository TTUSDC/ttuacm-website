module.exports = {
  "extends": ["airbnb-base", "prettier"],
  "env": {
    "node": true,
    "mocha": true
    "jest": true,
    "browser": true
  },
  "parser": "babel-eslint",
  "plugins": ["chai-friendly"],
  "rules": {
    "no-unused-expressions": 0,
    "no-control-regex": 0,
    "keyword-spacing": 0,
    "chai-friendly/no-unused-expressions": 2,
    "camelcase": 0,

    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,

    "jsx-quotes": [2, "prefer-single"],

    // For some reason, these lint errors came up and they were extreme style linting errors
    "react/jsx-filename-extension": 0,
    "react/destructuring-assignment": 0,
    "react/no-access-state-in-setstate": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-wrap-multilines": 0,
    "react/require-default-props": 0,
    "no-restricted-syntax": 0,
    "no-await-in-loop": 0,
    "no-unused-expressions": 0,
    "no-control-regex": 0,
    "keyword-spacing": 0,
    "no-console": 0,
    "no-underscore-dangle": 0,
    "semi": 0
  }
}
