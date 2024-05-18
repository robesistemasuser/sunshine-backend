const { response } = require('express');

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const Variedad = require('../models/variedad');


const getTodo = async(req, res = response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [ usuarios, productos, variedades ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Producto.find({ nombre: regex }),
        Variedad.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        productos,
        variedades
    })

}

const getDocumentosColeccion = async(req, res = response ) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp( busqueda, 'i' );

    let data = [];

    switch ( tabla ) {
        case 'variedades':
            data = await Variedad.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('producto', 'nombre img');
        break;

        case 'productos':
            data = await Producto.find({ nombre: regex })
                                    .populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/productos/variedades'
            });
    }
    
    res.json({
        ok: true,
        resultados: data
    })

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}

