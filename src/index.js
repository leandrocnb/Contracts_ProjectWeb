/*
Leandro Cesar do Nascimento Bertoldi
Engenharia de Computação
Programação Web
*/

//recebendo modelo BD
require('./models/db');
//Importando express
const express = require('express');
//Importando body-parser
const bodyParser = require('body-parser');
//Importando path
const path = require('path');
//Importando morgan
const morgan = require('morgan');
//Importando mongoose
const mongoose = require('mongoose');
//Impotando o modelo do schema
const Contracts = mongoose.model('Contracts');


//Criando um aplicação
const app = express();

//Configurações
app.set('port', process.env.PORT || 8000);

//middlaware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//Criando as rotas
//GET
app.get('/contracts', (req, res) => {
    //res.json(contratos);
    //Chamando a função de busca no banco
    Contracts.find((err, docs) => {
        if (!err) {
            res.json(docs);
            console.log('Listado com sucesso')
        }
        else{
            console.log('Erro ao listar os dados do banco: ' + err);
        }
    });
});

//POST
app.post('/contracts', (req, res) => {
    const { tipo, ano, inicio, fim, convenente, processo } = req.body;
    //Criando um novo objeto do tipo contrato
    var contracts = new Contracts();
    //Setando os dados
    contracts.tipo = tipo;
    contracts.ano = ano;
    contracts.inicio = inicio;
    contracts.fim = fim;
    contracts.processo = processo;
    contracts.convenente = convenente;
    //Criando um função call-back para salvar no banco 
    contracts.save((err, doc) => {
        if (!err){
            res.json('Criado com sucesso');
        }
        else{
            console.log('Erro durante a tentativa de inserção no banco: ' + err);
        }
    });
});

//PUT
app.put('/contracts/:id', (req, res) => {
    //Executando função de Atualização
    Contracts.updateOne({ 
        _id: req.params.id }, 
        req.body, 
        { new: true },
        (err, doc) => {
            if(!err) {
                res.json('Atualizado com sucesso');
            }
            else {
                console.log('Erro ao atualizar o contrato: ' + err);
            }
    });
})

//DELETE
app.delete('/contracts/:id', (req,res) => {
    //Executando função de Deleção
    Contracts.deleteOne({_id: req.params.id}, (err, doc) => {
        if (!err) {
            res.json('Deletado com sucesso');
        }
        else{
            console.log('Erro ao deletar contrato: ' + err);
        }
    });
})

//Arquivos estáticos 
app.use(express.static(path.join(__dirname, 'public')));

//Escutando a aplicação na porta 8000
app.listen(app.get('port'), () => {
    console.log(`Servidor na porta ${app.get('port')}`)
});