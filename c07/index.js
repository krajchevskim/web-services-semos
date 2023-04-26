const config = require('./pkg/config')
const express = require('express');
var { expressjwt: jwt } = require('express-jwt');
require('./pkg/db');
const {
    login,
    register,
    refreshToken,
    forgotPassword,
    resetPassword
} = require('./handlers/auth');

const {
    getAll,
    getSingle,
    update,
    updatePartial,
    remove,
    create
} = require('./handlers/post');

const api = express();

api.use(express.json());

api.use(
    jwt({ secret: config.get('development').jwt_key, algorithms: ['HS256'],
}).unless({
    path: [
        '/api/v1/auth/login',
        '/api/v1/auth/register',
        '/api/v1/auth/forgot-password',
        '/api/v1/auth/reset-password'
    ]
})
);

api.post('/api/v1/auth/login', login);
api.post('/api/v1/auth/register', register);
api.post('/api/v1/auth/forgot-password', forgotPassword);
api.post('/api/v1/auth/reset-password', resetPassword);

api.get('/api/v1/blog', getAll);
api.get('/api/v1/blog/:id', getSingle);
api.post('/api/v1/blog', create);
api.put('/api/v1/blog/:id', update);
api.patch('/api/v1/blog/:id', updatePartial);
api.delete('/api/v1/blog/:id', remove);

api.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedAccess') {
        res.status(401).send('Invalid token...');
    }
});

//GET, POST, PUT, PATCH, DELETE

//if(config.get('development').jwt_key)


api.listen(config.get('development').port, (err) => {
    err ? console.log(err) : console.log(`Server started on ${config.get('development').port}`);
});

// homework from 4/19/2023
// 1. forgot password - try to implement it with mailgun
// 2. test out reset password
// 3. read about express-jwt lib
// 4. test out all the routes and if there are errors try to debug them