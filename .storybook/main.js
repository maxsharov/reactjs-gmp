const custom = require('../webpack.config.dev.js');

module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    '@etchteam/storybook-addon-css-variables-theme',
    {
      name: `@storybook/preset-scss`,
      options: {
        rule: {
          test: /\.scss$/,
        },
        cssLoaderOptions: {
          modules: true,
        }
      },
    },
  ],
  core: {
    builder: "webpack5"
  },
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        rules: custom.module.rules,
      },
      resolve: {
        ...config.resolve,
        ...custom.resolve,
      }
    };
  },
};