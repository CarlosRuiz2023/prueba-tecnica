const { Router } = require("express");
const { check } = require("express-validator");
const { estadosGet, municipiosGet } = require("../controllers/services");

const router = Router();

router.get("/", estadosGet);
router.get("/:estado", municipiosGet);

module.exports = router;
