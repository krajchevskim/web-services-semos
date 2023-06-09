// require('dotenv').config();
// require('./pkg/db');

const config = require('./pkg/config/')

const express = require('express');

const { getAll, getOne, create, update, remove } = require('./handlers/cars');

const api = express();

api.use(express.json());

//GET, POST, PUT, PATCH, DELETE

api.get('/api/cars/', getAll);

api.get('api/cars/:id', getOne);

api.post('/api/cars', create);

api.put('/api/cars/:id', update);

api.delete('/api/cars/:id', remove);

api.listen(config.get('development').port, (err) => {
    err ? console.log(err) : console.log(`Server started on ${config.get('development').port}`);
});

//Homework
// 1. Create a Person Schema
//    - Validate person fields - node-input-validator or mongoose
// 2. Create CRUD functions
//    - plus functions for exercise -> take all people that are under 18 years old
// 3. Create handlers for these functions
// 4. Display them in index.js and run them with Insomnia or POSTMAN