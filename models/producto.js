const { Schema, model, Collection } = require("mongoose");
const grado = require("./grado");


const ProductoSchema = Schema({
    
    nombre: {
        type: String,
        required: true
    },
    especie:{
        type: String,
        required: true

    },
    
    img: {
        type: String,
    }, 

    usuario:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Usuario"

    },

    variedad: [{
        
        type: Schema.Types.ObjectId,
        ref: "Variedad"
    }],

    grado: [{
        
        type: Schema.Types.ObjectId,
        ref: "Grado"
    }],
}, { Collection: 'productos' });

ProductoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model("Producto", ProductoSchema);