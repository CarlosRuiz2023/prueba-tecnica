const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { emailExiste, existeClientePorId } = require("../helpers/db-validators");

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
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(emailExiste),
    validarCampos,
  ],
  clientesPut
);

router.post(
  "/",
  [
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
