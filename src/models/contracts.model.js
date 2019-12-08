/*
Leandro Cesar do Nascimento Bertoldi
Engenharia de Computação
Programação Web
*/

//Definindo o esquema do banco de dados ContractsDB
//Importando mongoose
const mongoose = require('mongoose');

//Criando um objeto contractsSchema
var contractsSchema = new mongoose.Schema({
    tipo: {
        type: String,
    },
    ano: {
        type: String,
    },
    inicio: {
        type: String,
    },
    fim: {
        type: String,
    },
    convenente: {
        type: String,
    },
    processo: {
        type: String,
    }
});

mongoose.model('Contracts', contractsSchema);