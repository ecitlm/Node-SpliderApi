module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'], // 覆盖eslint格式配置,写在最后
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    $: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'], // 数组前后空格
    'object-curly-spacing': ['error', 'always'] // 对象前后空格
  }
};
