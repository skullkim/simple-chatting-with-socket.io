const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const morgan = require('morgan');
const {sequelize} = require('./models');
const cookie_parser = require('cookie-parser');
const session = require('express-session');
const favicon = require('serve-favicon');

const app = express();

dotenv.config();
app.set('port', process.env.PORT || 8080);
app.set('view', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

sequelize.sync({force: false})
    .then(() => console.log('success to connect DB'))
    .catch((err) => console.error(err));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookie_parser());
const {time} = require('console');
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure: false,
        maxAge: time.getMilliseconds + (10000 * 60),
    },
    name: 'session-cookie'
}));

const index_router = require('./routes');
const chat_router = require('./routes/chat');
//const { time } = require('console');

app.use('/script', express.static('public'));
app.use('/style', express.static('public'));
app.use('/', index_router);
app.use('/chat', chat_router);

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