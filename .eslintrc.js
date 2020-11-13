module.exports = {
    env: {
        browser: true,
        es2020: true
    },
    extends: ['airbnb-base'],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module'
    },
    rules: {
        quotes: ['error', 'single', 'avoid-escape'],
        semi: [2, 'never'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'linebreak-style': ['error', 'windows'],
        'comma-dangle': ['error', 'never'],
        'no-cond-assign': ['error', 'always'],
        'no-console': 'off',
        'no-param-reassign': 'off',
        'arrow-body-style': ['error', 'as-needed'],
        'max-len': [2, { code: 120, tabWidth: 4, ignoreUrls: true }],
        'no-restricted-syntax': 'off',
        'no-unused-vars': 'off'
    }
}
