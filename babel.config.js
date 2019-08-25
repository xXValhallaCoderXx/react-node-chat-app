module.exports = {
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/transform-runtime"
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: true
          }
        ]
      ]
    },
    development: {
      plugins: ["react-hot-loader/babel"]
    },
    production: {}
  }
};
