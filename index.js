//recebendo modelo BD
require('./models/db');

//Importando express
const express = require('express');
//Importando pach do handler express
const path = require('path');
//Importando express handlerbars
const exphbar = require('express-handlebars');
//Importando body-parser
const bodyParser = require('body-parser');

//Importando contracts controllers
const contractsController = require('./controllers/contractsController');

//Criando a aplicação (por ser var existe somente dentro deste escopo)
var app = express();

//Incluido o body-parser (para adicionar ao parâmetro da requisição) utilizando uma função middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

//Incuido a conversão em formato json utilizando também o body-parser
app.use(bodyParser.json());

//Configurando express middleware para o handlebars. Redirecionando para views
app.set('views', path.join(__dirname, '/views/'));

//Configurando Express engine para hadlerbars. Definido os diretórios de chamada das views e layouts
app.engine('hbs', exphbar({ 
    extname: 'hbs', 
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/' 
}));

//Setando a view engine e handlerbars na aplicação
app.set('view engine', 'hbs');

//Escutando a aplicação na porta 3000
app.listen(3000, () => {
    console.log('Express server iniciado na porta: 3000');
});

//Utilizando o contracts na aplicação app
app.use('/contracts', contractsController);