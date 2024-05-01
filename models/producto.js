const { Schema, model } = require("mongoose");


const ProductoSchema = Schema({
    
    nombre: {
        type: String,
        required: true
    },
    especie:{
        type: String,
        required: true

    },
    variedad: {
        type: String,
        required: true
    },
    grado: {
        type: String,
        required: true
    },
    imagenUrl: {
        type: String,
    }, 
});

ProductoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model("Producto", ProductoSchema);