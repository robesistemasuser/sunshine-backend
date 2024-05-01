const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');


const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({},'nombre email role google');
   
    res.json({
        ok: true,
        usuarios 
        
    });
    
   
}

const crearUsuario = async(req, res = response) => {
    
    const { email, password } = req.body;

   

    try {
        const existeEmail = await Usuario.findOne({ email })

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: "EL correo ya existe"
            });
        }

        const usuario = new Usuario( req.body );

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error inesperado"
        })
    }
    
   
}

const updateUsuario = async(req, res = response) => {

    const uid = req.params.id;

     try {

        const usuarioDB = await Usuario.findById( uid )

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese id"
            });
        }

        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !==  email) {
            
            const existeEmail = await Usuario.findOne({  email });
            if( existeEmail ){
                return res.status(400).json({
                    ok:false,
                    msg: "Ya existe un usuario con ese email"
                })
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok:true,
            usuario: usuarioActualizado
        })
        
     } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error inesperado"
        })
     }
    
   
}

const deleteUsuario = async(req, res = response) => {

     const uid = req.params.id;

     try {

        const usuarioDB = await Usuario.findById( uid )

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese id"
            });
        }

        
      await Usuario.findByIdAndDelete( uid );

        res.json({
            ok:true,
            msg: "Usuario Eliminado"
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
    getUsuarios,
    crearUsuario,
    updateUsuario,
    deleteUsuario,
}