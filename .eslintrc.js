module.exports = {
  env: {
    node: true,
    es2022: true,
    jest: true
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "jest"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    indent: [ 'error', 4 ]
  }
};