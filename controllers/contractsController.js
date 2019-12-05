//Importando express
const express = require('express');
//Criando router
var router = express.Router();
//Importando mongoose
const mongoose = require('mongoose');
//Impotando o modelo do schema
const Contracts = mongoose.model('Contracts');

//Criando rota inicial para renderizar a aplicação
router.get('/', (req, res) => {
    //Utilizando um render function para rederizar a view
    res.render("contracts/addOrEdit",{
        viewTitle: "Cadastrar Contratos"
    });
});

//Criando a rota POST
router.post('/', (req, res) => {
    if(req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

//Criando a função POST para inserir os dados recebidos ao mongoDB
function insertRecord(req, res) {
    //Criando um novo objeto do tipo contrato
    var contracts = new Contracts();
    //Setando os dados
    contracts.tipo = req.body.tipo;
    contracts.ano = req.body.ano;
    contracts.inicio = req.body.inicio;
    contracts.fim = req.body.fim;
    contracts.processo = req.body.processo;
    contracts.convenente = req.body.convenente;
    //Criando um função call-back para salvar no banco 
    contracts.save((err, doc) => {
        if (!err){
            res.redirect('contracts/list');
        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("contracts/addOrEdit",{
                    viewTitle: "Cadastrar Contratos",
                    contracts: req.body
                });
            }
            else
                console.log('Erro durante a tentativa de inserção no banco: ' + err);
        }
    });
}

//Criando a função PUT para listar os itens do mongoDB
function updateRecord(req, res){
    Contracts.findOneAndUpdate({ 
        _id: req.body._id }, 
        req.body, 
        { new: true },
        (err, doc) => {
            if(!err) {
                res.redirect('contracts/list');
            }
            else {
                if(err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("contracts/addOrEdit", {
                        viewTitle: "Atualizar Contrato",
                        contracts: req.body
                    });
                }
                else{
                    console.log('Erro ao atualizar o contrato: ' + err);
                }
            }
        });
}

//Criando a função GET para listar os itens do mongoDB
router.get('/list', (req, res) => {
    
    //Chamando a função de busca no banco
    Contracts.find((err, docs) => {
        if (!err) {
            res.render("contracts/list", {
                list: docs
            });
        }
        else{
            console.log('Erro ao listar os dados do banco: ' + err);
        }
    });
});

//Função de tratamento de exceção gerada ao inserir no banco
function handleValidationError(err, body){
    for(field in err.errors){
        switch (err.errors[field].path) {
            case 'tipo':
                body['tipoError'] = err.errors[field].message;
                break;
            case 'ano':
                body['anoError'] = err.errors[field].message;
                break;
            case 'inicio':
                body['inicioError'] = err.errors[field].message;
                break;
            case 'fim':
                body['fimError'] = err.errors[field].message;
                break;
            case 'convenente':
                body['convenenteError'] = err.errors[field].message;
                break;
            case 'processo':
                body['processoError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
};

//Criando a rota passando o id em hiden para atualizar um item do mongoDB
router.get('/:id', (req, res) => {
    Contracts.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.render('contracts/addOrEdit', {
                viewTitle: "Atualizar Contrato",
                contracts: doc
            });
        }
    });
});

//Criando a rota passando o id em hiden para atualizar um item do mongoDB
router.get('/delete/:id', (req, res) => {
    Contracts.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/contracts/list');
        }
        else{
            console.log('Erro ao deletar contrato: ' + err);
        }
    });
});

//Exportando router
module.exports = router;
