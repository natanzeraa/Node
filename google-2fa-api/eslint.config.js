import js from '@eslint/js'
import prettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['node_modules', 'dist', 'build']
  },
  js.configs.recommended,
  prettier,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single']
    }
  }
]