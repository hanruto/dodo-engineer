module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-console': 1,
    'no-unused-vars': [1, { args: 'after-used', ignoreRestSiblings: true }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 0,
    'react/display-name': 0,
    '@typescript-eslint/member-delimiter-style': [
      0,
      {
        multiline: { delimiter: 'semi', requireLast: true },
        singleline: { delimiter: 'semi', requireLast: false }
      }
    ],
    '@typescript-eslint/indent': ['error', 2, { SwitchCase: 1 }],
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    // todo: 消除any
    '@typescript-eslint/no-explicit-any': 0
  },
  overrides: [
    {
      files: ['config/*'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
  globals: {
    pingpp: true,
    pingpp_ui: true
  }
}
