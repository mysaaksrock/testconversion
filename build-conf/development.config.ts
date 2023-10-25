/**
 * @author Dmitry Malakhov
 */

'use strict';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import merge from 'webpack-merge';
import { config, PATH_DIST } from './shared.config';
import { APP_PORT, GRAPHQL_PORT } from '../constants/port';

const GRAPHQL_ENDPOINT: string = `http://0.0.0.0:${GRAPHQL_PORT}`;

export default merge.smart(config('development'), {
  entry: {
    main: [
      `webpack-dev-server/client?http://0.0.0.0:${APP_PORT}/`,
      'webpack/hot/dev-server',
    ],
  },
  devtool: 'source-maps',
  profile: false,
  output: {
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  performance: {
    hints: false,
  },
  devServer: {
    contentBase: PATH_DIST,
    port: process.env.DEV_PORT || APP_PORT,
    host: process.env.DEV_HOST || '0.0.0.0',
    hot: true,
    noInfo: true,
    historyApiFallback: true,
    proxy: {
      '/graphql': GRAPHQL_ENDPOINT,
      '/graphiql': GRAPHQL_ENDPOINT,
    },
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      filename: 'index.html',
      cache: false,
      minify: false,
    }),
  ],
});