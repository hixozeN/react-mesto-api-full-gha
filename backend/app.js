require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const rateLimit = require('express-rate-limit'); // limiter
const helmet = require('helmet'); // https://expressjs.com/ru/advanced/best-practice-security.html

const { errors } = require('celebrate');
const responseHandler = require('./middlewares/responseHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');
const { PORT, MONGO_DB } = require('./utils/config');

const app = express();
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true, // make this also true
});

app.use(express.json());

// AntiDOS & helmet
const limiter = rateLimit({
  windowMs: 1000, // 1min
  max: 5000, // Limit each IP to 5000 requests per `window` (here, per 1 min)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter); // AntiDOS на все реквесты
app.use(helmet()); // защита

app.use(requestLogger); // логгер реквестов

app.use(router); // роутинг апи

app.use(errorLogger); // логгер ошибок
app.use(errors()); // ошибки валидации celebrate
app.use(responseHandler); // централизованный обработчик ошибок

app.listen(PORT, () => console.log('Server started on port:', PORT));
