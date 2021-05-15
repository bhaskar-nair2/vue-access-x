module.exports = {
  env: {
    browser: true,
    commonjs: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-param-reassign': ['error', { props: false }],
  },
};
