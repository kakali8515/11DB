/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    // "@vue/eslint-config-prettier",
  ],
  "vue/multi-word-component-names": ["error", {
    "ignores": []
  }],
  overrides: [
    {
      files: ["cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
  ],
};
