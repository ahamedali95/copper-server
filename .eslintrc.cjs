module.exports = {
  env: {
    node: true,
    es2022: true,
    jest: true
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "simple-import-sort",
    "unused-imports",
    "@typescript-eslint",
    "jest"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended"
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    indent: [ 'error', 4 ],
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "quotes": ["error", "double", { "avoidEscape": true }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "object-curly-spacing": ["error", "always", { "arraysInObjects": true }],
    "comma-dangle": "error"
  }
};