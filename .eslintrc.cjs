module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],

  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser', // Add the TypeScript parser here
  plugins: ['@typescript-eslint', 'react-refresh'], // Add the TypeScript plugin here

  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/prefer-const': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  // overrides: [
  //   {
  //     files: ['*.ts', '*.tsx', '**.tsx'],
  //     rules: {
        
  //       'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  //       '@typescript-eslint/no-unused-vars': 'off',
  //       '@typescript-eslint/prefer-const': 'off',
  //       '@typescript-eslint/ban-types': 'off',
  //       '@typescript-eslint/no-explicit-any': 'off',

  //     },
  //   },
  // ],
}
