module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
    react: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};

