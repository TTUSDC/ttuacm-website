module.exports = {
  "source": ".",
  "destination": "./docs",
  "includes": ["^src"],
  "unexportIdentifier": true,
  "undocumentIdentifier": false,
  "title": "TTUACM Backend",
  "lint": false,
  "plugins": [
    {"name": "esdoc-node"}
  ],
  "experimentalProposal": {
    "classProperties": true,
    "objectRestSpread": true,
    "decorators": true,
    "doExpressions": true,
    "functionBind": true,
    "asyncGenerators": true,
    "exportExtensions": true,
    "dynamicImport": true
  }
}
