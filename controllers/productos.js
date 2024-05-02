const { response } = require('express'); 
const Producto = require('../models/producto');


const getProductos = async(req, res = response) => {

   const desde = Number(req.query.desde) || 0;

    const [ productos, total ] = await Promise.all([
        Producto
            .find()
            .populate('usuario', 'nombre')
            .populate('variedad', 'nombre')
            .populate('grado', 'nombre')
            .skip( desde )
            .limit( 5 ),

        Producto.countDocuments()

    ]);

    res.json({
        ok: true,
        productos,
        total
        
    });
    
   
}

const updateProducto = async(req, res = response) => {

    const uid = req.params.id;

     try {

        const productoDB = await Producto.findById( uid )

        if(!productoDB){
            return res.status(404).json({
                ok: false,
                msg: "No existe un producto por ese id"
            });
        }

        const { nombre, ...campos } = req.body;

        if (productoDB.nombre !==  nombre) {
            
            const existeNombre = await Producto.findOne({  nombre });
            if( existeNombre ){
                return res.status(400).json({
                    ok:false,
                    msg: "Ya existe un producto con ese nombre"
                })
            }
        }

        campos.nombre = nombre;
        const productoActualizado = await Producto.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok:true,
            producto: productoActualizado
        })
        
     } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error inesperado"
        })
     }
    
   
}


const crearProducto = async(req, res) => {

    const { nombre, especie, variedad, grado, imagenUrl } = req.body;   
    
    const uid = req.uid;
   
    const producto = new Producto({
        usuario: uid,
        ...req.body
    });
    

    try {
       
        const existeNombre = await Producto.findOne({ nombre })

        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: "EL producto ya existe"
            });
        }

        const productoDB = await producto.save();
    
        res.json({
            ok: true,
            producto: productoDB
            
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error inesperado"
        })
     }
   
}

const deleteProducto = async(req, res = response) => {

    const uid = req.params.id;

    try {

       const productoDB = await Producto.findById( uid )

       if(!productoDB){
           return res.status(404).json({
               ok: false,
               msg: "No existe un producto por ese id"
           });
       }

       
     await Producto.findByIdAndDelete( uid );

       res.json({
           ok:true,
           msg: "Producto Eliminado"
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
    getProductos,
    updateProducto,
    crearProducto,
    deleteProducto,
}