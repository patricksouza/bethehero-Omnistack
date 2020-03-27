const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
//npx é usado para executar um pacote

app.use(cors());

//Informar o tipo da requisição enviada
app.use(express.json());
app.use(routes);


app.listen(3333);