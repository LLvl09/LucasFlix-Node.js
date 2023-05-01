const express = require('express');
const mongoose = require('mongoose');
const Categoria = mongoose.model('Categoria');

exports.get = async (queryPage, queryLimit) => {
    const page = parseInt(queryPage) || 1;
    const limit= parseInt(queryLimit) || 10;

    const res = await Categoria.paginate({}, {page, limit});
    return res;
}

exports.getById = async (id) => {
    const res = await Categoria.findOne({_id: id });
    return res;
}

exports.create = async (body) => {
    const categoria = new Categoria(body);
    await categoria.save();
}

exports.update = async (id, body) => {

    await Categoria
        .findByIdAndUpdate(id, {
            $set: {
                titulo: body.titulo,
                cor: body.cor
            },

        })
}

exports.delete = async (id) => {
    await Categoria.findByIdAndRemove(id);
}