const fs = require ('fs');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');  


const borrarImagen = ( path ) => {
    if (fs.existsSync( path )){
        fs.unlinkSync( path );
    }

}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let  pathViejo = '';

            switch (tipo) {
                case 'productos':
                    const producto = await Producto.findById(id);
                    if(!producto){
                        console.log("No es un producto por id");
                        return false;
                    }
                    
                      pathViejo = `./uploads/productos/${ producto.img }`;
                   
                    borrarImagen( pathViejo );

                    producto.img = nombreArchivo;
                    await producto.save();
                    return true;

                break;
                case 'usuarios':
                    const usuario = await Usuario.findById(id);
                    if(!usuario){
                        console.log("No es un usuario por id")
                        return false;
                    }
                    
                      pathViejo = `./uploads/usuarios/${ usuario.img }`;
                   
                    borrarImagen( pathViejo );

                    usuario.img = nombreArchivo;
                    await usuario.save();
                    return true;

                    
                break;
            
                default:
                    break;
            }

}

module.exports = {
    actualizarImagen
}       