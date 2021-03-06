/* eslint-disable no-console */
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import express from 'express';
import config from './webpack.config.babel';
import _debug from 'debug';

let dir;

const app = express();
const compiler = webpack(config);
const debug = _debug('app:http');

if (process.env.NODE_ENV === 'production') {
  dir = 'dist';
  app.use(express.static(dir));
} else {
  dir = 'src';
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
    },
  }));
  app.use(hotMiddleware(compiler));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, dir, 'index.html'));
});

debug('starting the server...');

const server = app.listen(9000, 'localhost', (err) => {
  const HOST = server.address().address;
  const PORT = server.address().port;

  if (err) {
    console.log(err);
    return;
  }

  debug('listening at http://%s:%s', HOST, PORT);
});
