module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-in-parens': 'off',
    'arrow-parens': 'off',
    'linebreak-style': 'off',
    'prefer-destructuring': 'off',
    'no-else-return': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
