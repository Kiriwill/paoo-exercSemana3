const mongoose = require("mongoose");

const livroSchema = mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: false },
    paginas: { type: Number, required: true }
});

module.exports = mongoose.model('Livro', livroSchema);