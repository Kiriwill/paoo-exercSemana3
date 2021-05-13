const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env = require('./env');

const app = express();
app.use(bodyParser.json());
const Livro = require('./models/livro');

const dbName = "db_livros"
mongoose.connect(`mongodb+srv://fatec_ipi_2021_paoo_clientes:${env.mongoPassword}@cluster0.naukr.mongodb.net/${dbName}?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then(() => console.log('Conexão deu certo.'))
    .catch((e) => console.log(e, 'Conexão NÃO FOI BEM.'))

const livros = [{
        id: '1',
        titulo: 'Jose',
        autor: '11223344',
        paginas: 334
    },
    {
        id: '2',
        titulo: 'Jaqueline',
        autor: '22112211',
        paginas: 'jaqueline@email.com'
    }
]

//Permite receber requições Http2ServerRequest;
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/livros', (req, res, next) => {
    const livro = new Livro({
        titulo: req.body.titulo,
        autor: req.body.autor,
        paginas: req.body.paginas
    })
    livro.save().
    then(livroInserido => {
        res.status(201).json({
            mensagem: 'Livro inserido',
            id: livroInserido._id
        })
    })
});


app.get('/api/livros', (req, res, next) => {
    Livro.find().then(documents => {
        console.log(documents)
        res.status(200).json({
            mensagem: "Tudo OK",
            livros: documents
        });
    })
});

app.delete('/api/livros/:id', (req, res) => {
    Livro.deleteOne({ _id: req.params.id })
        .then((resultado) => {
            console.log(resultado);
            res.status(200).json({ mensagem: "Livro removido" })
        });
});

module.exports = app;