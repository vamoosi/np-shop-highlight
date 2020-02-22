const path = require('path');
const ExtractCss = require('mini-css-extract-plugin');
const MiniCss = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'settings-menu': 'settings-menu/ts/app.ts',
    'active-tab': 'active-tab/app.ts',
    'migrate': 'init/migrate.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('out', 'compile'),
  },
  optimization: {
    minimize: false,
    minimizer: [new MiniCss({})],
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: [ '.mjs', '.js', '.svelte', '.ts' ],
    modules: [ 'node_modules', 'src' ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules|dist\/|out\//,
        use: 'ts-loader',
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true,
            preprocess: [
              require('svelte-preprocess')({
                typescript: {
                  tsconfigFile: './tsconfig.json',
                },
              }),
            ],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          ExtractCss.loader,
          'css-loader',
        ],
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-url-loader',
      // },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'file-loader'
      }
    ],
  },
  node: {
    __filename: true,
  },
  plugins: [
    new ExtractCss({
      filename: 'style.css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build', 'stage'),
    compress: true,
    port: 9000,
  },
};