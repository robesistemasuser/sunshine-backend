const { response } = require('express'); 
const Variedad = require('../models/variedad'); 


const getVariedades = async(req, res) => {
    const variedades = await Variedad.find()
                                    .populate('usuario', 'nombre')
    res.json({
        ok: true,
        variedades
        
    });
    
   
}

const updateVariedad = async(req, res = response) => {

    const uid = req.params.id;

     try {

        const variedadDB = await Variedad.findById( uid )

        if(!variedadDB){
            return res.status(404).json({
                ok: false,
                msg: "No existe una variedad por ese id"
            });
        }

        const { nombre, ...campos } = req.body;

        if (variedadDB.nombre !==  nombre) {
            
            const existeNombre = await Variedad.findOne({  nombre });
            if( existeNombre ){
                return res.status(400).json({
                    ok:false,
                    msg: "Ya existe una variedad con ese nombre"
                })
            }
        }

        campos.nombre = nombre;
        const variedadActualizado = await Variedad.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok:true,
            variedad: variedadActualizado
        })
        
     } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error inesperado"
        })
     }
    
   
}


const crearVariedad = async(req, res) => {
   
    const { nombre, color } = req.body;

    const uid = req.uid;
   
    const variedad = new Variedad({
        usuario: uid,
        ...req.body
    });
   
    try {

        const existeNombre = await Variedad.findOne({ nombre })

        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: "La variedad ya existe"
            });
        }
        
        const variedadDB  = await variedad.save();
    
        res.json({
            ok: true,
            variedad : variedadDB
            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error inesperado"
        })
        
    }
  
    
   
}

const deleteVariedad = async(req, res = response) => {

    const uid = req.params.id;

    try {

       const variedadDB = await Variedad.findById( uid )

       if(!variedadDB){
           return res.status(404).json({
               ok: false,
               msg: "No existe una variedad por ese id"
           });
       }

       
     await Variedad.findByIdAndDelete( uid );

       res.json({
           ok:true,
           msg: "Variedad Eliminada"
       })
       
    } catch (error) {
       console.log(error);
       res.status(500).json({
           ok:false,
           msg: "Error inesperado"
       })
    }
    
  
}


module.exports = {
    getVariedades,
    updateVariedad,
    crearVariedad,
    deleteVariedad,
}