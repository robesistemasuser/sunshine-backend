const { Router } = require('express');
const { check } = require('express-validator');
const { getVariedades, updateVariedad, crearVariedad, deleteVariedad} = require('../controllers/variedades');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



router.get('/', validarJWT, getVariedades);
router.post('/',
[
   validarJWT,
   check('nombre','El nombre de la variedad es necesario').not().isEmpty(),
   validarCampos
  
],
crearVariedad
);

router.put('/:id', validarJWT,
[
  
],
updateVariedad
);

router.delete('/:id', validarJWT, deleteVariedad);


module.exports = router;
