const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

/********************
 * DEVELOPMENT CONFIGS
    - Functions below are for helping with Development Process
********************/

exports.devServer = ({ host, port } = {}) => ({
  // Handles the WDS for Development
  devServer: {
    stats: "errors-only",
    hotOnly: true,
    historyApiFallback: true,
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true
    },
    proxy: {
      '/api/*': 'http://localhost:5000',
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true
    }
    }
  }
});

exports.generateSourceMaps = ({ type }) => ({
  // Handles the type of Source map to use
  devtool: type
});

/********************
 * BUILD CONFIGS
    - Functions below are for helping with Building / Deployment
********************/

exports.clean = path => ({
  // Clean the current build folder to ensure to old files are leftover
  plugins: [new CleanWebpackPlugin([path], { allowExternal: true })]
});

exports.minifyJavaScript = () => ({
  // Minify JS Code
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: true
      })
    ]
  }
});

exports.minifyCSS = ({ options }) => ({
  // Minify CSS Code
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false
    })
  ]
});

/********************
 * UTIL FUNCTIONS
    - Functions below provide extra utilities for either enviroment
********************/

exports.setFreeVariables = data => {
  let CONFIG = {};
  Object.keys(data).forEach(key => {
    CONFIG[key] = JSON.stringify(data[key]);
  });
  return {
    plugins: [
      new webpack.DefinePlugin({
        "process.env": CONFIG
      })
    ]
  };
};

/********************
 * LOADERS
    - Various loader functions for different uses
********************/

// Javascript Loader
exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)?$/,
        include,
        exclude,
        use: [
          {
            loader: "babel-loader",
            options: {
              cwd: "../",
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  }
});

// Image Loader
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|gif)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options
        }
      }
    ]
  }
});

// Load CSS for Development
exports.developmentCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /^((?!\.module).)*scss$/,
        include,
        exclude,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.module.scss$/,
        include,
        exclude,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]_[hash:base64:8]"
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
});

// Extract CSS
exports.extractCSS = ({ include, exclude }) => {
  return {
    plugins: [
      new MiniCssExtractPlugin({
        filename: "static/styles/[name].[hash:8].css"
      })
    ],
    module: {
      rules: [
        {
          test: /^((?!\.module).)*scss$/,
          include,
          exclude,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                // publicPath: '../'
              }
            },
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            },
            autoprefix()
          ]
        },
        {
          test: /\.module.scss$/,
          include,
          exclude,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: "[local]_[hash:base64:8]"
              }
            },
            {
              loader: "sass-loader"
            },
            autoprefix()
          ]
        }
      ]
    }
  };
};

autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()]
  }
});
