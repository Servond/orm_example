const { body, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
    // body("branchName").notEmpty().withMessage("Branch name cannot be empty!"),
    // body("email").notEmpty()
    // body("address").notEmpty().withMessage("Address cannot be empty!")
    

    const errors = validationResult(req);
    console.log(errors);
    if (errors) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next();
}

module.exports = {
    validateResult
}