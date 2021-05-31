module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  plugins: ["@typescript-eslint", "import"],
  parser: "@typescript-eslint/parser",
  env: { es6: true, browser: true },
  rules: {
    "sort-imports": 0,
    "import/order": [2, { alphabetize: { order: "asc" } }],
  },
  parserOptions: { sourceType: "module", ecmaFeatures: { jsx: true } },
};
