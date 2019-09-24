import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import bd from './config/bd';
import history from 'connect-history-api-fallback';


//Importar rutas
import indexRouter from './routes/index';
import apiRouter from './routes/api';

var app = express();

//Midelwares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Rutas
app.use('/api', apiRouter);

//Uso de archivos estaticos y ruta principal
app.use(history())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

module.exports = app;
