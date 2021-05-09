module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "unicorn", "prettier"],
  extends: [
    "airbnb-base",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "import/no-extraneous-dependencies": "off",
    "unicorn/filename-case": [
      "error",
      {
        case: "camelCase",
      },
    ],
    "no-console": "off",
    "arrow-body-style": "off",
    camelcase: "off",
    "class-methods-use-this": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "lines-between-class-members": "off",
    "@typescript-eslint/explicit-member-accessibility": "error",
  },
};
