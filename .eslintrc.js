module.exports = {
  // Outras configurações do ESLint...
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  plugins: [
    'unused-imports'
  ],
  rules: {
    // Regra para reportar importações não utilizadas como erro
    'unused-imports/no-unused-imports': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};