//Definindo o esquema do banco de dados ContractsDB
//Importando mongoose
const mongoose = require('mongoose');

//Criando um objeto contractsSchema
var contractsSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: 'Este campo é obrigatório!'
    },
    ano: {
        type: String,
        required: 'Este campo é obrigatório!'
    },
    inicio: {
        type: String,
        required: 'Este campo é obrigatório!'
    },
    fim: {
        type: String,
        required: 'Este campo é obrigatório!'
    },
    convenente: {
        type: String,
        required: 'Este campo é obrigatório!'
    },
    processo: {
        type: String,
        required: 'Este Campo é obrigatório!'
    }
});

//Criando procedimento de validação de entrada do Ano
contractsSchema.path('ano').validate((val) => {
    anoRegex = /\d{4}/;
    return anoRegex.test(val);

}, 'Formato de Ano Inválido! (Ex: 2019)');

//Criando procedimento de validação de entrada de Inicio
contractsSchema.path('inicio').validate((val) => {
    inicioRegex = /\d{2}\/\d{2}\/\d{4}/;
    return inicioRegex.test(val);
}, 'Data de Inicio Inválido! (Ex: dd/mm/yyyy)');

//Criando procedimento de validação de entrada de Fim
contractsSchema.path('fim').validate((val) => {
    fimRegex = /\d{2}\/\d{2}\/\d{4}/;
    return fimRegex.test(val);
}, 'Data de Fim Inválido! (Ex: dd/mm/yyyy)');

mongoose.model('Contracts', contractsSchema);