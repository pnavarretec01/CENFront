module.exports = {
    rules: {
        'no-console': 'off',
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6,
        sourceType: 'module'
    },
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
};