module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2020: true,
    },
    extends: [
        'airbnb-base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        'linebreak-style': ['off'],
        'object-curly-newline': ['off'],
        'react/jsx-indent': ['off'],
        'react/jsx-indent-props': ['off'],
        indent: ['warn', 4],
        'no-else-return': ['error', { allowElseIf: true }],
        'react/jsx-one-expression-per-line': ['off'],
        'react/no-array-index-key': ['off'],
        'no-console': ['off'],
        'no-return-assign': ['off'],
        'import/extensions': ['error', 'never', {
            tsx: 'never',
            svg: 'never',
        }],
        'react/prop-types': ['off'],
    },
};
