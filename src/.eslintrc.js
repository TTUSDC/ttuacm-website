module.exports = {
  "extends": "airbnb",
  "env": {
    "jest": true,
    "node": true,
    "browser": true
  },
  "parser": "babel-eslint",
  "plugins": ["chai-friendly"],
  "rules": {
    "no-unused-expressions": 0,
    "no-control-regex": 0,
    "keyword-spacing": 0,
    "chai-friendly/no-unused-expressions": 2,

    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
  }
}
