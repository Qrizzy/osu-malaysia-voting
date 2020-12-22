module.exports = {
  rules: {
    semi: 'error',
    quotes: [2, 'single', { 'avoidEscape': true }],
    '@typescript-eslint/no-explicit-any': 'off'
  },
  extends: [
    '../../.eslintrc',
    'plugin:vue/essential',
    '@vue/typescript/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: null
  },
  env: {
    node: true
  },
  overrides: [
    {
      files: ['**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ],
  ignorePatterns: ['!**/*'],
};
