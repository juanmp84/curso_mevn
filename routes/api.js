import express from 'express';
const app = express();

app.use('/users', require('./users'));
app.use('/agenda', require('./AgendaRoutes'));
app.use('/login', require('./login'));

module.exports = app;