module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:fsd/all',
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    createDefaultProgram: true,
  },
  plugins: ['fsd', '@typescript-eslint'],
  rules: {
    'import/extensions': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  env: {
    browser: true,
    jest: true,
  },
};
