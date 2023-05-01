const e = require('express');
const mongoose = require('mongoose');
const Video = mongoose.model('Video');
const Categoria = mongoose.model('Categoria');


exports.get = async (queryPage, queryLimit) => {
    const page = parseInt(queryPage) || 1;
    const limit= parseInt(queryLimit) || 10;

    const res= await Video.paginate({}, {page, limit});

    return res;
}

exports.getById= async (id) => {
    const res = await Video.findOne({ _id: id });
    return res;
}

exports.create = async (body, categoriaId) =>{
    const video = new Video(body);
    const categoria = await Categoria.findById(categoriaId);

    categoria.Videos.push(video);
    await categoria.save();
    await video.save();

    
}

exports.update = async (id, body) => {
    await Video
        .findByIdAndUpdate(id, {
            $set: {
                titulo: body.titulo,
                descricao: body.descricao,
                url: body.url,
                categoria: body.categoria
            }
        })
}

exports.delete = async (id) => {
    await Video.findByIdAndRemove(id);
}