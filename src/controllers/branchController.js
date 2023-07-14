const db = require("../models");
const branch = db.Branch;
const user = db.User;
const sequelize = db.Sequelize;
const { Op } = sequelize;

const BranchController = {
    getById: async (req, res) => {
        try {
            // ambil id dari parameter path url
            const { id } = req.params;

            // select * from branch where id = id

            // select * 
            	// from branches
                // left join users on users.branchId = branches.id
                // where branches.id = 1;
            const result = await branch.findOne({
                where: {
                    id
                },
                // eager loading
                include: [
                    {
                        model: user,
                    },
                ]
            });

            // lazy loading
            // const userData = await result.getUsers({
            //     where: {
            //         id: 1
            //     }
            // }); 
            // const data = await userData.getCategory()

            //return function if successs
            return res.status(200).json({
                message: "Get data success",
                data: userData
            })
        } catch (err) {
            // return function if fail or error
            return res.status(500).json({
                message: "Get data failed",
                error: err.message
            })
        }
    },
    getAll: async (req, res) => {
        try {
            const { branchName } = req.query;

            const result = await branch.findAll(
                {
                    attributes: {
                        includes: [
                        sequelize.fn('COUNT', sequelize.col('id')), 'n_id'
                        ]
                    },
                    where: {
                        id: {
                            [Op.and]: 
                            {
                                [Op.gte]: 1,
                                [Op.lte]: 10,
                                [Op.ne]: 7,
                                [Op.or]: {

                                }
                            }
                        }
                    }
                }
            );
            return res.status(200).json({
                message: "Get data success",
                data: result
            })
        } catch (err) {
            return res.status(500).json({
                message: "Get data failed",
                error: err.message
            })
        }
    },
    createBranch: async (req, res) => {
        try {
            const { branchName, address } = req.body;
            
            await db.sequelize.transaction( async (a) => {
                const result = await branch.create({
                    branchName,
                    address
                }, { transaction: a });

                return res.status(200).json({
                message: "Create data success",
                data: result
            })
            });
        } catch (err) {
           return res.status(500).json({
                message: "Create data failed",
                error: err.message
            }) 
        }
    },
    editBranch: async (req, res) => {
        try {
            const { id } = req.query;
            const { branchName, address } = req.body;
            
            await db.sequelize.transaction( async (t) => {
                const result = await branch.update(
                    {
                        branchName,
                        address
                    }, 
                    {
                        where: {
                            id
                        }
                    },
                { transaction: t });

                return res.status(200).json({
                message: "Create data success",
                data: result
            })
            });
        } catch (err) {
           return res.status(500).json({
                message: "Create data failed",
                error: err.message
            }) 
        }
    }
}

module.exports = BranchController;