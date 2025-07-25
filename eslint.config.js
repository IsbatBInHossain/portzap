import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    // Ignore build output and node_modules
    ignores: ['dist/', 'node_modules/'],
  },
  js.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        // Test-specific globals
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
      },
    },
  },
];
