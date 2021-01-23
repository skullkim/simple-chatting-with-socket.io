const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const morgan = require('morgan');
const favicon = require('serve-favicon');

const app = express();

dotenv.config();
app.set('port', process.env.PORT || 8080);
app.set('view', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

const index_router = require('./routes');
app.use('/script', express.static('public'));
app.use('/style', express.static('public'));
app.use('/', index_router);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} router doesn't exist`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send(res.locals.message);
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')} server start`);
})