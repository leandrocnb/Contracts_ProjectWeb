/*
Leandro Cesar do Nascimento Bertoldi
Engenharia de Computação
Programação Web
*/

//Importar o mongoose
const mongoose = require('mongoose');

//Criando conexão com mongodb, especificamente com ContractsDB
//Utilizando um arrow function para verificar a conexão
mongoose.connect('mongodb://localhost:27017/ContractsDB', 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true },
    (err) => {
        if (!err) { console.log('MongoDB Conectado com Sucesso!') }
        else { console.log('Erro ao conectar com MongoDB!') }
    }
);

//Importando contractsSchema
require('./contracts.model');