const path       = require('path');
const ExtractCss = require('mini-css-extract-plugin');
const MiniCss    = require('optimize-css-assets-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: {
    'settings-menu': './out/compile/settings-menu/ts/app.js',
    'active-tab':    './out/compile/active-tab/app.js',
    'migrate':       './out/compile/init/migrate.js',
  },

  output: {
    filename: '[name].js',
    path:     path.resolve('out', 'stage'),
  },

  optimization: {
    minimize:  true,
    minimizer: [ new MiniCss({}) ],
  },

  resolve: {
    extensions: [ '.mjs', '.js', '.svelte' ],
    modules:    [ 'node_modules', './out/compile' ],
  },

  module: {
    rules: [
      {
        test:    /\.css$/,
        exclude: /node_modules/,
        use:     [
          ExtractCss.loader,
          'css-loader',
        ],
      },
      {
        test:    /\.(jpg|png|gif|svg)$/,
        loader:  'file-loader',
        options: {
          name: 'res/[name].[ext]',
        },
      },
    ],
  },

  node: {
    __filename: true,
  },

  plugins: [
    new ExtractCss({
      filename: 'style.css',
    }),
    new HtmlPlugin(),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'out', 'stage'),
    compress:    true,
    port:        9000,
  },
};