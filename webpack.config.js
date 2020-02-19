const path = require('path');
const ExtractCss = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  entry: {
    "settings-menu": "settings-menu/js/app.js",
    "active-tab": "active-tab/app.js",
    "migrate": "init/migrate.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("build", "compile")
  },
  optimization: {
    minimize: false
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte")
    },
    extensions: [".mjs", ".js", ".svelte"],
    modules: ["node_modules", "src"]
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          ExtractCss.loader,
          'css-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader'
      }
    ]
  },
  plugins: [
    new ExtractCss({
      filename: 'style.css'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "build", "stage"),
    compress: true,
    port: 9000
  }
};