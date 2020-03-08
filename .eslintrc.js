module.exports = {
  root: true,
  env: {
    "es6": true,
    "node": true
  },
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "prettier/standard"
  ],
  parser: '@typescript-eslint/parser',
  // "parserOptions": {
  //   "ecmaVersion": 2018,
  //   "sourceType": "module"
  // },
  rules: {
    "no-unused-vars": ["warn", {
      argsIgnorePattern: "^_"
    }],
    "no-console": ["warn", {
      allow: ["warn", "error", "info"]
    }]
  }
};