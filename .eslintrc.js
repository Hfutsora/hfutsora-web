module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error'] }] : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    'import/extensions': 'off',
    'vue/no-use-v-if-with-v-for': ['error', { allowUsingIterationVar: true }],
    'no-restricted-globals': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
