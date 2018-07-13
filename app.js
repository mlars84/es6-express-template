import express from 'express';
import bodyParser from 'body-parser';
import Debug from 'debug';
import logger from 'morgan';
import sassMiddleware from 'node-sass-middleware';
import cookieParser from 'cookie-parser';
import path from 'path';

import index from './routes/index';

const app = express();
const debug = Debug('debug-es6-express-template:app');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json(err)
});

process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit();
});

export default app;



