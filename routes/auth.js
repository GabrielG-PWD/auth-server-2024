const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

// crear un nuevo usuario...
router.post('/new', [
  check('name', 'el nombre es obligatorio').not().isEmpty(),
  check('email', 'el email es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
  validarCampos
], crearUsuario);


// login de usuario...
router.post('/', [
  check('email', 'el email es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
  validarCampos
], loginUsuario);


// validar y revalidar token...
router.get('/renew', validarJWT, revalidarToken);


// exportar router
module.exports = router;