module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": ["warn", {
      argsIgnorePattern: "^_"
    }],
    "no-console": ["warn", {
      allow: ["warn", "error", "info"]
    }]
  }
};