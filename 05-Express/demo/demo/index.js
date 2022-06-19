const express = require('express');
let users = [
    {id: 1, name: 'Dario'},
    {id: 2, name: 'Juan'},
    {id: 3, name: 'Pedro'},
    {id: 4, name: 'Pablo'},
    {id: 5, name: 'Jorge'},
];
let previusId = 5;
const app = express();
app.use(express.json());
app.get('/users', (req, res) => {
    res.json(users);
})
app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res
        .status(404)
        .send(`Usuario con id ${id} no encontrado`);
    }
    res.json(user);
})


app.post('/users', (req, res) => {
    const {name} = req.body;
    const user=
    {
        id : ++previusId,
        name : name
    }
    users.push(user);
    res.json(user);
})
app.put('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res
        .status(404)
        .send(`Usuario con id ${id} no encontrado`);
    }
    const { lastName } = req.body;
    user.lastName = lastName;
    res.json(user);
})
app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res
        .status(404)
        .send(`Usuario con id ${id} no encontrado`);
    }
users = users.filter((user) => user.id !== id);
res.json(user);
})


app.listen( 3000, () => console.log('Server started on port 3000') );