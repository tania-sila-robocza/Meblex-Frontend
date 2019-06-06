module.exports = {
    "extends": [
      "react-app",
      "airbnb",
    ],
    "parser": "babel-eslint",
    "env": {
        "browser": true
    },
    "plugins": [
      "react-hooks"
    ],
    "rules": {
        "react/no-array-index-key": "off",
        "react/jsx-filename-extension": "off",
        "no-shadow": "off",
        "react/prop-types": "off", // 😬
        "no-unused-vars": "warn",
        "jsx-a11y/click-events-have-key-events": "off",
        "react/jsx-one-expression-per-line": "off",
        "linebreak-style": "off",
        "object-curly-newline": "off",
        "react-hooks/exhaustive-deps": "warn",
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    }
};
