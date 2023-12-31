const bcrypt = require("bcrypt");
const path = require("path");
const transporter = require("../helpers/transporter");
const jwt = require("jsonwebtoken");
const db = require("../models");
const user = db.User;
const fs = require("fs").promises;
const handlebars = require("handlebars");

// npm i handlebars

const AuthController = {
    register: async (req, res) => {
        try {
            let token = req.headers.authorization;
            const { userName, email, password } = req.body;
            // if (password !== confirmPassword) {
            //     return res.status(500).send("password dan confirm password tidak sama")
            // }
            const isEmailExist = await user.findOne({ 
                where: {
                    email,
                }
            })
            if (isEmailExist) {
                return res.status(500).json({
                    message: "Email or username Already Exist",
                })
            }

            const data = await fs.readFile(path.resolve(__dirname, "../emails/registerEmail.html"), 'utf-8');
            const tempCompile = await handlebars.compile(data);
            console.log(token);
            const tempResult = tempCompile({ token })

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            await db.sequelize.transaction( async (t) => {
                const result = await user.create({
                    userName,
                    email,
                    password: hashPassword
                }, { transaction: t });

                await transporter.sendMail({
                    to: email,
                    subject: 'Account Activation',
                    html: tempResult
                })

                return res.status(200).json({
                message: "Register success",
                data: result
            })
            });

        } catch (err) {
            return res.status(500).json({
                message: "Register failed",
                error: err.message
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const checkLogin = await user.findOne({
                where: {
                    email,
                    // password
                }
            });

            if (!checkLogin) {
                return res.status(404).json({
                    message: "email not found",
                })
            }

            const isValid = await bcrypt.compare(password, checkLogin.password);
            if (!isValid) {
                return res.status(404).json({
                    message: "password is incorrect",
                })
            }

            let payload = { 
                id: checkLogin.id,
                email: checkLogin.email,
                isAdmin: checkLogin.isAdmin,
                userName: checkLogin.userName
            }

            const token = jwt.sign(
                payload, 
                process.env.JWT_KEY,
                {
                    expiresIn: '1h'
                }
            )

            return res.status(200).json({
                message: "Login success",
                data: token
            })
        } catch (err) {
            return res.status(500).json({
                message: "Register failed",
                error: err.message
            })
        }
    },
    changeAvatar: async (req, res) => {
        try {
            const { id } = req.user;
            const { username } = req.body;
            console.log(username);
            // console.log(req.file);
            // const images = req.files;
            // console.log(images);
            await db.sequelize.transaction( async (t) => {
                const result = await user.update({
                    img_avatar: req.file.path
                }, { 
                    where: {
                        id
                    }
                }, { transaction: t });

                return res.status(200).json({
                message: "Change avatar success"
            })
            });


        } catch (err) {
             return res.status(500).json({
                message: "change avatar failed",
                error: err.message
            })
        }
    }
    
}

module.exports = AuthController;