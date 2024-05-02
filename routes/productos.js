const { Router } = require('express');
const { check } = require('express-validator');
const { getProductos, updateProducto, crearProducto, deleteProducto } = require('../controllers/productos');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



router.get('/', validarJWT, getProductos);
router.post('/', 
[
   validarJWT,
   check('nombre','El nombre del producto es necesario').not().isEmpty(),
   check('especie','la especie del producto es necesario').not().isEmpty(),
   check('variedad','La variedada id debe ser es valido').isMongoId(),
   check('grado','El grado id debe ser es valido').isMongoId(),

   validarCampos
  
],
crearProducto
);

router.put('/:id', validarJWT,
[
  
],
   updateProducto
);

router.delete('/:id', validarJWT, deleteProducto);


module.exports = router;
