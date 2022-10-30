require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { handleError } = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/limiter');
const {
  PORT,
  NODE_ENV,
  MONGO_SERVER_DEV,
} = require('./utils/constants');

const { MONGO_SERVER } = process.env;

const addressDB = NODE_ENV === 'production' ? MONGO_SERVER : MONGO_SERVER_DEV;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(addressDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());

app.use(requestLogger);

app.use(limiter);

app.use(cors({
  origin: [
    'http://localhost:3000',
    // 'http://mesto.test.project.nomoredomains.icu',
    // 'https://mesto.test.project.nomoredomains.icu'
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes'));

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
});
