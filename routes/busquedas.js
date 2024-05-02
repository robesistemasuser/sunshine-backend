const { Router } = require('express');
const router = Router();
const { getTodo, getDocumentsColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/:busqueda', validarJWT, getTodo);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentsColeccion);


module.exports = router;