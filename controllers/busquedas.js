const { response } = require('express'); 
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const Variedad = require('../models/variedad');
const Grado = require('../models/grado');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex  = new RegExp(busqueda, 'i' );

    const [ usuarios, productos, variedades, grados] = await Promise.all([
         Usuario.find({ nombre: regex }),
         Producto.find({ nombre: regex }),
         Variedad.find({ nombre: regex }),
         Grado.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        productos,
        variedades,
        grados
        
    });

   /*  const desde = Number(req.query.desde) || 0;

    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google')
            .skip( desde )
            .limit( 5 ),

       //Usuario.count()
    ]);
     

    res.json({
        ok: true,
        usuarios, 
        total
        
    });
     */
   
}

const getDocumentsColeccion = async(req, res = response) => {
    
    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp(busqueda, 'i' );

    let data = [];

    switch (tabla) {
        case "productos":
            data = await Producto.find({ nombre: regex })
                                  .populate('usuario', 'nombre img')
                                  .populate('variedad', 'nombre ')
                                  .populate('grado', 'nombre ')
        break;
        case "variedades":
            data = await Variedad.find({ nombre: regex })
                                  .populate('usuario', 'nombre img')
        break;
        case "grados":
            data = await Grado.find({ nombre: regex })
                              .populate('usuario', 'nombre img')
        break;
        case "usuarios":
             data = await Usuario.find({ nombre: regex });
           
        break;
    
        default:
            res.status(400).json({
                ok: false,
                msg: "La tabla tiene que ser usuarios/productos/variedades/grados"
            });
          
    }

    res.json({
        ok:true,
        resultado: data
    })    
}


module.exports = {
    getTodo,
    getDocumentsColeccion,
}