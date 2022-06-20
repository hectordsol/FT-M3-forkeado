const express = require('express');
const userRouter = require('./users');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use(cors());

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send("error de Servidor");
}
);


app.listen( 3000, () => console.log('Server started on port 3000') );