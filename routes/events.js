const { Router } = require("express");
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
  } = require("../controllers/event");
const { check } = require("express-validator");
const { validarCampos} = require('../middlewares/validar-campos');
const {isDate} = require('../helpers/isDate');

/**
  Event Routes
  /api/events
 */

  router.use(validarJWT);

//* TOdas tienen que pasar por la validacion de token
//* obtener eventos
router.get('/', getEvento);

//* crear eventos
router.post('/',[
  check('title','titulo es obligatorio').not().isEmpty(),
  check('start','fecha start es obligatorio').custom( isDate ),
  check('end','fecha end es obligatorio').custom( isDate ),
  validarCampos
] ,crearEvento);

//* actualizar eventos
router.put('/:id', actualizarEvento);

//* borrar eventos
router.delete('/:id', eliminarEvento);


module.exports = router;
