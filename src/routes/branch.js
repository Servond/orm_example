const { branchController } = require("../controllers");
const router = require("express").Router();

router.get("/branches/:id", branchController.getById);
router.get("/branches", branchController.getAll);
router.post("/branches", branchController.createBranch);

module.exports = router;