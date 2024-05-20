import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import { fixupPluginRules } from '@eslint/compat'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      "src/**/*.{js,jsx,ts,tsx}"
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      'react': fixupPluginRules(eslintPluginReact),
      'react-hooks': fixupPluginRules(eslintPluginReactHooks)
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,

      // Best Practices
      'no-new': 'error',
      'no-var': 'error',
      'eqeqeq': 'error',
      'no-eval': 'error',
      'no-labels': 'error',
      'dot-notation': 'error',
      'no-multi-str': 'error',
      'no-lone-blocks': 'error',
      'no-multi-spaces': 'error',
      'no-implied-eval': 'error',
      'react/sort-comp': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'curly': ['error', 'multi-or-nest'],
      'dot-location': ['error', 'property'],
      'yoda': ['error', 'never', { exceptRange: true }],

      // Stylistic Issues
      'no-tabs': 'error',
      'no-lonely-if': 'error',
      'no-new-object': 'error',
      'no-multi-assign': 'error',
      'no-inline-comments': 'error',
      'no-mixed-operators': 'error',
      'no-trailing-spaces': 'error',
      'no-unneeded-ternary': 'error',
      'no-negated-condition': 'error',
      'no-whitespace-before-property': 'error',
      'indent': ['error', 2],
      'max-depth': ['error', 4],
      'quotes': ['error', 'single'],
      'max-len': ['error', { code: 120 }],
      'eol-last': ['error', 'always'],
      'semi': ['error', 'never'],
      'semi-style': ['error', 'last'],
      'comma-style': ['error', 'last'],
      'comma-dangle': ['error', 'never'],
      'semi-spacing': ['error', { before: false, after: true }],
      'comma-spacing': ['error', { before: false, after: true }],
      'array-bracket-newline': ['error', 'consistent'],
      'object-curly-newline': ['error', { consistent: true }],
      'func-style': ['error', 'expression'],
      'func-call-spacing': ['error', 'never'],
      'capitalized-comments': ['error', 'always'],
      'block-spacing': ['error', 'always'],
      'new-parens': ['error', 'always'],
      'operator-linebreak': ['error', 'after'],
      'operator-assignment': ['error', 'always'],
      'camelcase': ['error', { allow: ['^unstable_'] }],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'line-comment-position': ['error', { position: 'above' }],
      'linebreak-style': ['error', 'unix'],
      'lines-around-comment': ['error', { beforeBlockComment: true }],
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'object-curly-spacing': ['error', 'always'],
      'padded-blocks': ['error', 'never'],
      'jsx-quotes': ['error', 'prefer-double'],
      'quote-props': ['error', 'consistent-as-needed'],
      'space-before-blocks': ['error', 'always'],
      'space-in-parens': ['error', 'never'],
      'space-unary-ops': ['error', { words: true, nonwords: false }],
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      'switch-colon-spacing': ['error', { before: false, after: true }],
      'computed-property-spacing': ['error', 'never'],
      'space-infix-ops': ['error', { int32Hint: false }],
      'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],

      // Options that we don't want to use
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off'
    }
  }
]
