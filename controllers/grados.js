const { response } = require('express'); 
const Grado = require('../models/grado'); 


const getGrados = async(req, res) => {
    const grados = await Grado.find()
                    .populate('usuario', 'nombre')
    res.json({
        ok: true,
        grados
        
    });  
   
}

const updateGrado = async(req, res = response) => {

    const uid = req.params.id;

     try {

        const gradodDB = await Grado.findById( uid )

        if(!gradodDB){
            return res.status(404).json({
                ok: false,
                msg: "No existe un grado por ese id"
            });
        }

        const { nombre, ...campos } = req.body;

        if (gradodDB.nombre !==  nombre) {
            
            const existeNombre = await Grado.findOne({  nombre });
            if( existeNombre ){
                return res.status(400).json({
                    ok:false,
                    msg: "Ya existe un grado con ese nombre"
                })
            }
        }

        campos.nombre = nombre;
        const gradoActualizado = await Grado.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok:true,
            grado: gradoActualizado
        })
        
     } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error inesperado"
        })
     }
    
   
}


const crearGrado = async(req, res) => {
    const { nombre } = req.body;
   
    const uid = req.uid;
   
    const grado = new Grado({
        usuario: uid,
        ...req.body
    });
   
   try {

    const existeNombre = await Grado.findOne({ nombre })

    if(existeNombre){
        return res.status(400).json({
            ok: false,
            msg: "El grado ya existe"
        });
    }

     const gradoDB = await grado.save();

    res.json({
        ok: true,
        grado: gradoDB
        
    });
    
    
   } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error inesperado"
        })
    
   }    
   
}

const deleteGrado = async(req, res = response) => {

    const uid = req.params.id;

    try {

       const gradoDB = await Grado.findById( uid )

       if(!gradoDB){
           return res.status(404).json({
               ok: false,
               msg: "No existe un grado por ese id"
           });
       }

       
     await Grado.findByIdAndDelete( uid );

       res.json({
           ok:true,
           msg: "Grado Eliminado"
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
    getGrados,
    updateGrado,
    crearGrado,
    deleteGrado,
}