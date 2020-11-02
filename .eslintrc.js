module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console':  'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-dupe-keys': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-useless-escape': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

  }
}
