const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

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
    const cliente = req.body;
    console.log(cliente);
    res.status(201).json({ mensagem: 'Livro inserido' });
});

app.use('/api/livros', (req, res, next) => {
    res.status(200).json({
        mensagem: "Tudo OK",
        livros: livros
    });
});
module.exports = app;