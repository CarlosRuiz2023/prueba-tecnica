const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  emailExiste,
  existeClientePorId,
  emailInexiste,
} = require("../helpers/db-validators");

const {
  clientesGet,
  clientesPost,
  clientesPut,
  clientesDelete,
  clienteGet,
} = require("../controllers/clientes");

const router = Router();

router.get("/", clientesGet);

router.get(
  "/:id",
  [check("id").custom(existeClientePorId), validarCampos],
  clienteGet
);

router.put(
  "/:id",
  [
    check("id").custom(existeClientePorId),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("telefono", "El telefono es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("estado", "El estado es obligatorio").not().isEmpty(),
    check("municipio", "El municipio es obligatorio").not().isEmpty(),
    check("colonia", "La colonia es obligatoria").not().isEmpty(),
    check("calle", "La calle es obligatoria").not().isEmpty(),
    check("latitud", "La latitud es obligatoria").not().isEmpty(),
    check("longitud", "La longitud es obligatoria").not().isEmpty(),
    check("email", "El correo no es valido").isEmail(),
    check("email").custom((email, { req }) => {
      const id = req.params.id; // Obtén el ID de los parámetros de la ruta
      return emailInexiste(email, id);
    }),
    validarCampos,
  ],
  clientesPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("telefono", "El telefono es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("estado", "El estado es obligatorio").not().isEmpty(),
    check("municipio", "El municipio es obligatorio").not().isEmpty(),
    check("colonia", "La colonia es obligatoria").not().isEmpty(),
    check("calle", "La calle es obligatoria").not().isEmpty(),
    check("latitud", "La latitud es obligatoria").not().isEmpty(),
    check("longitud", "La longitud es obligatoria").not().isEmpty(),
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(emailExiste),
    validarCampos,
  ],
  clientesPost
);

router.delete(
  "/:id",
  [check("id").custom(existeClientePorId), validarCampos],
  clientesDelete
);

module.exports = router;
