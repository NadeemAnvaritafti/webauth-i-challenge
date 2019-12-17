// ---- imports 
const express = require('express');
const helmet = require('helmet');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
const restrictedRouter = require('../restricted/restricted-router');

const knex = require('../data/db-config');


// ---- calling express as variable 
const server = express();


// ---- session configuration 
const sessionConfig = {
    name: 'validatedUser',
    secret: 'super encrypted secret code',
    saveUninitialized: true,
    resave: false,

    store: new KnexSessionStore({
        knex,
        createtable: true,
        clearInterval: 1000 * 60 * 10,
        sidfieldname: 'sid',
        tablename: 'sessions'
    }),

    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true
    }
};

// ---- using/calling the imports
server.use(helmet());
server.use(express.json());
server.use(sessions(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/restricted', restrictedRouter);


module.exports = server;