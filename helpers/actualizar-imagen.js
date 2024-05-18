const Usuario = require('../models/usuario');
const fs = require('fs');

const Producto = require('../models/producto');
const Variedad = require('../models/variedad');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'producto':
            const producto = await Prodcto.findById(id);
            if ( !producto ) {
                console.log('No es un producto por id');
                return false;
            }

            pathViejo = `./uploads/productos/${ producto.img }`;
            borrarImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;
        
        case 'variedades':
            const variedad = await Variedad.findById(id);
            if ( !variedad ) {
                console.log('No es un variedad por id');
                return false;
            }

            pathViejo = `./uploads/variedades/${ variedad.img }`;
            borrarImagen( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        break;
        
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/productos/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;
    }


}



module.exports = { 
    actualizarImagen
}
