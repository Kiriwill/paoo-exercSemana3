const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env = require('./env');
const multer = require("multer");

const app = express();
app.use(bodyParser.json());
const Livro = require('./models/livro');
const { Router } = require('express');
const MIME_TYPE_EXTENSAO_MAPA = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/bmp': 'bmp'
}
const armazenamento = multer.diskStorage({
    //requisição, arquivo extraido e uma função a ser
    //executada, capaz de indicar um erro ou devolver
    //o diretório em que as fotos ficarão
    destination: (req, file, callback) => {
        callback(null, "backend/imagens")
        let e = MIME_TYPE_EXTENSAO_MAPA[file.mimetype] ? null : new Error('Mime Type Invalido');
        callback(e, "backend/imagens")
    },
    filename: (req, file, callback) => {
        const nome = file.originalname.toLowerCase().split(" ").join("-");
        const extensao = MIME_TYPE_EXTENSAO_MAPA[file.mimetype];
        callback(null, `${nome}-${Date.now()}.${extensao}`);
    }
})


const dbName = "db_livros"
mongoose.connect(`mongodb+srv://fatec_ipi_2021_paoo_clientes:${env.mongoPassword}@cluster0.naukr.mongodb.net/${dbName}?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then(() => console.log('Conexão deu certo.'))
    .catch((e) => console.log(e, 'Conexão NÃO FOI BEM.'))

app.use('/imagens', express.static(path.join("backend/imagens")));


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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.post('/api/livros', multer({ storage: armazenamento }).single('imagem'), (req, res, next) => {
    const imagemURL = `${req.protocol}://${req.get('host')}`
    const livro = new Livro({
        titulo: req.body.titulo,
        autor: req.body.autor,
        paginas: req.body.paginas,
        imagemURL: `${imagemURL}/imagens/${req.file.filename}`
    })
    livro.save().
    then(livroInserido => {
        res.status(201).json({
            mensagem: 'Livro inserido',
            // id: livroInserido._id,
            livro: {
                id: livroInserido._id,
                titulo: livroInserido.titulo,
                autor: livroInserido.autor,
                paginas: livroInserido.paginas,
                imagemURL: livroInserido.imagemURL
            }
        })
    })
});

app.put(
    "/:id",
    multer({ storage: armazenamento }).single('imagem'),
    (req, res, next) => {
        console.log(req.file)
        let imagemURL = req.body.imagemURL; //tentamos pegar a URL já existente  
        if (req.file) { //mas se for um arquivo, montamos uma nova    
            const url = req.protocol + "://" + req.get("host");
            imagemURL = url + "/imagens/" + req.file.filename;
        }
        const livro = new Livro({
            _id: req.params.id,
            titulo: req.body.titulo,
            autor: req.body.autor,
            paginas: req.body.paginas,
            imagemURL: imagemURL
        })
        Livro.updateOne({ _id: req.params.id }, livro)
            .then((resultado) => {
                // console.log(resultado)
                res.status(200).json({ mensagem: 'Atualização realizada com sucesso' })
            })
    })

app.get('/api/livros', (req, res, next) => {
    Livro.find().then(documents => {
        console.log(documents)
        res.status(200).json({
            mensagem: "Tudo OK",
            livros: documents
        });
    })
});

app.get('/api/livros/:id', (req, res, next) => {
    Livro.findById(req.params.id).then(li => {
        if (li) {
            res.status(200).json(li);
        } else {
            res.status(404).json({ mensagem: "Cliente nao cadastrado" })
        }
    })
})

app.delete('/api/livros/:id', (req, res) => {
    Livro.deleteOne({ _id: req.params.id })
        .then((resultado) => {
            console.log(resultado);
            res.status(200).json({ mensagem: "Livro removido" })
        });
});

module.exports = app;