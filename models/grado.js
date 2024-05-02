const { Schema, model, Collection } = require("mongoose");


const GradosSchema = Schema({
    
    nombre: {
        type: String,
        required: true
    }, 
    usuario:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Usuario"

    },
    
    
}, { Collection: 'grados' });

GradosSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model("Grado", GradosSchema);