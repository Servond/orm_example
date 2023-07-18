const { authController } = require("../controllers");
const { multerUpload } = require("../middleware/multer");
const { verifyToken } = require("../middleware/auth");
 
const router = require("express").Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
// router.patch("/profile", verifyToken, multerUpload.array('avatars', 3), authController.changeAvatar);
router.patch("/profile", verifyToken, multerUpload.single('product'), authController.changeAvatar);

module.exports = router;