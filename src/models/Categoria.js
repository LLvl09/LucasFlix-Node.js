const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    cor: {
        type: String,
        required: true,
        trim: true
    },
    Videos: [{
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    }]
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model("Categoria", schema);