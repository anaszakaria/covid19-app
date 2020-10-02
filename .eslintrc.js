module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/airbnb'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        quotes: ['error', 'single', 'avoid-escape'],
        semi: [2, 'never'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'linebreak-style': 'off',
        'comma-dangle': ['error', 'never'],
        'no-cond-assign': ['error', 'always'],
        'no-param-reassign': 'off',
        'arrow-body-style': ['error', 'as-needed'],
        'max-len': [2, { code: 120, tabWidth: 4, ignoreUrls: true }],
        'no-restricted-syntax': 'off',
        'no-unused-vars': 'off',
        'import/extensions': ['error', 'never', { vue: 'never', js: 'never' }]
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true
            }
        }
    ]
}
