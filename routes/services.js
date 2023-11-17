const { Router } = require("express");
const { check } = require("express-validator");
const {
  estadosGet,
  municipiosGet,
  coordenadasPost,
} = require("../controllers/services");

const router = Router();

router.get("/", estadosGet);
router.get("/:estado", municipiosGet);

router.post("/", coordenadasPost);

module.exports = router;
