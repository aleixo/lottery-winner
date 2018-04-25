const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const NumbersRouter = require('./resources/numbers/NumbersRouter');
const config = require('./settings/config.json');
const HttpError = require('./middlewares/HttpError');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Routers usage
 */
const numbersRouter = new NumbersRouter();
app.use(numbersRouter.routerEntry, numbersRouter.configuredRouter);
/**
 * Response Middlewares usage
 */
const httpError = new HttpError();
app.use(httpError.notFound);
app.use(httpError.internalServerError);

app.listen(config.app.port, () => {
  console.log('[START] App started');
})

module.exports = app;
