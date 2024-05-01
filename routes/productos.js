const { Router } = require('express');
const { getProductos, crearProductos } = require('../controllers/productos');

const router = Router();


router.get('/', getProductos);
router.post('/', crearProductos);

module.exports = router;

/* router.get('/', (req, res) => {
    res.json({
        ok: true,
        productos: [{
            id: 1234,
            nombre: "Nombre",
            especie: "Especie",
            variedad: "Variedad1",
            grado: "Grado1",
            imagenUrl: "Foto del producto"
        }]
        
    });
    
 }); */

 