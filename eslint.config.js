const typescriptParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const angularPlugin = require('@angular-eslint/eslint-plugin');
const angularTemplateParser = require('@angular-eslint/template-parser');
const prettierPlugin = require('eslint-plugin-prettier');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  {
    ignores: ['node_modules/', 'dist/'],
  },
  {
    files: ['projects/*/src/**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json', './projects/*/tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@angular-eslint': angularPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...angularPlugin.configs.recommended.rules,
      ...prettierPlugin.configs?.rules,
      '@angular-eslint/directive-selector': [
        'warn',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'warn',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-unused-vars': ['off'],
      '@angular-eslint/use-lifecycle-interface': ['off'],
      '@angular-eslint/no-input-rename': 'off', // Turn off the rule
      '@angular-eslint/no-output-rename': 'off',
      '@typescript-eslint/no-unused-expressions': 'off', // Turn off the rule
    },
  },
  {
    files: ['projects/*/src/**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint': angularPlugin,
      '@angular-eslint/template': angularPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error', { parser: 'angular' }],
    },
  },
  eslintPluginPrettierRecommended,
];
