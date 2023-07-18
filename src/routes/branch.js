const { branchController } = require("../controllers");
const router = require("express").Router();
const { body } = require("express-validator");
const { validateResult } = require("../middleware/validator");

const createBranchValidator = [
    body("branchName").notEmpty().withMessage("Branch name cannot be empty!"),
    body("address").notEmpty().withMessage("Address cannot be empty!")
]

router.get("/branches/:id", branchController.getById);
router.get("/branches", branchController.getAll);
router.post("/branches", createBranchValidator, validateResult, branchController.createBranch);

module.exports = router;