const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json()) // Para conteúdo do tipo JSON


const MONGODB_URI = process.env.CONNECTION_STRING_TEST;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //console.log('Conexão com o banco de dados estabelecida com sucesso!')
  })
  .catch(err => {
    //console.error('Erro ao conectar ao banco de dados: ', err.message)
  });

const Video = require('./models/Video');
const Categoria = require('./models/Categoria');
const User = require('./models/User');

const videoRouter= require('./routes/videoRouter');
const categoriaRouter= require('./routes/categoriaRouter');
const adminRouter = require('./routes/adminRouter');


app.use('/videos', videoRouter);
app.use('/categorias', categoriaRouter);
app.use('/admin', adminRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});