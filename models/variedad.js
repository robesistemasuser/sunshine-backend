const { Schema, model, Collection } = require("mongoose");


const VariedadesSchema = Schema({
    
    nombre: {
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true

    },
    usuario:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Usuario"

    },
    
    
}, { Collection: 'variedades' });

VariedadesSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model("Variedad", VariedadesSchema);