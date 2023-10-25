/**
* @author Dmitry Malakhov
*/

'use strict';

import express from 'express';
import { json } from 'body-parser';
import path from 'path';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import DashboardPlugin from 'webpack-dashboard/plugin';
import webpackConfig from './build-conf/webpack.config';
import { schema } from './data/schema.js';
import { GRAPHQL_PORT, APP_PORT } from './constants/port';

const graphQLServer = express();

graphQLServer.use('/graphql', json(), graphqlExpress({
  schema,
}));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

graphQLServer.listen(GRAPHQL_PORT);

const compiler = webpack(webpackConfig);
compiler.apply(new DashboardPlugin());

const app = new WebpackDevServer(compiler, webpackConfig.devServer);

app.use('/', express.static(path.resolve(__dirname, 'public')));

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://0.0.0.0:${APP_PORT}`);
});
