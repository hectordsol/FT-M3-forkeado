const controller = require('./controllers');
const express = require('express');
const app = express.Router();


app.get('/', controller.getAllUsers);

app.get('/:id', controller.getUserById);


app.post('/', controller.createUser);

app.put('/:id', controller.updateUser);

app.delete('/:id', controller.deleteUser);

module.exports = app;