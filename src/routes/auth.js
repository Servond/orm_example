const { authController } = require("../controllers");
const router = require("express").Router();

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;