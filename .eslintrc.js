module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  env: ["es2020"],
  plugins: ["@typescript-eslint", "import"],
  parser: "@typescript-eslint/parser",
  env: { es6: true, browser: true, node: true },
  rules: {
    "sort-imports": 0,
    "import/order": [2, { alphabetize: { order: "asc" } }],
  },
  parserOptions: { project: "./tsconfig.json" },
}
