const path = require('path')
module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 2017,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "extends": [
      "eslint:recommended",
      "standard",
      "plugin:react/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:jsx-a11y/recommended",
      "plugin:flowtype/recommended"
    ],
    "plugins": [
      "react",
      "import",
      "jsx-a11y",
      "flowtype"
    ],
    "env": {
      "browser": true,
      "node": true,
      "mocha": true,
      "jest": true
    },
    "settings": {
      "import/resolver": {
        "webpack": {
          "config": path.resolve(__dirname, 'server', 'config', 'webpack', 'webpack.config.js')
        }
      },
      "react": {
        "flowVersion": "0.59"
      },
      "flowtype": {
        "onlyFilesWithFlowAnnotation": true
      }
    },
    "rules": {
      "no-debugger": 1,
      "react/no-array-index-key": 2,
      "react/no-direct-mutation-state": 2,
      "react/no-unknown-property": 2,
      "react/no-unused-prop-types": 2,
      "react/no-unused-state": 2,
      "react/require-optimization": 2,
      "react/sort-comp": 2,
      "react/no-typos": 2,
      "react/jsx-closing-bracket-location": 2,
      "react/jsx-closing-tag-location": 2,
      "react/jsx-no-duplicate-props": 2,
      "react/jsx-wrap-multilines": 2,
      "react/jsx-pascal-case": 2,
      "react/jsx-max-props-per-line": [2, { maximum: 1, when: 'multiline' }],
      "jsx-a11y/label-has-for": 0
    }
  }
