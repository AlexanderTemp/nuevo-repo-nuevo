import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import vueParser from 'vue-eslint-parser'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  {
    files: ['**/*.{ts,js,vue}'],

    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      vue,
      prettier,
    },

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:vue/vue3-recommended',
      'plugin:prettier/recommended',
    ],

    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      eqeqeq: 0,
      'no-empty': 0,
      'no-plusplus': 0,
      'no-underscore-dangle': 0,
      'no-param-reassign': 0,
      'no-unused-vars': 0,
      'no-restricted-syntax': 0,

      'vue/multi-word-component-names': 0,
      'vue/no-mutating-props': 0,
      'vue/require-default-prop': 0,
      'vue/no-v-html': 0,
      'vue/require-explicit-emits': 0,
      'vue/attribute-hyphenation': 0,
      'vue/html-self-closing': [
        'warn',
        {
          html: { void: 'always', normal: 'never', component: 'always' },
        },
      ],

      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unused-vars': [
        2,
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-shadow': 0,

      'prettier/prettier': [
        'warn',
        {
          semi: false,
          singleQuote: true,
          printWidth: 100,
          trailingComma: 'es5',
          endOfLine: 'auto',
        },
      ],
    },
  },
])
