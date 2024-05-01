const Producto = require('../models/producto');


const getProductos = async(req, res) => {
    const productos = await Producto.find({},'nombre especie variedad grado imagenUrl');
    res.json({
        ok: true,
        productos
        
    });
    
   
}
const crearProductos = async(req, res) => {
   
    const { nombre, especie, variedad, grado, imagenUrl } = req.body;
   
    const producto = new Producto( req.body );

    await producto.save();

    res.json({
        ok: true,
        producto
        
    });
    
   
}



module.exports = {
    getProductos,
    crearProductos,
}