const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, '../.env')
})
const port = process.env.PORT || 8000;
const express = require("express");
const db = require("./models");
const app = express();

const { branchRoutes } = require("./routes");

app.use(express.json());

app.use("/branch-management", branchRoutes)

// const db = require("./models");
// const user = db.Users;
// const branch = db.Branch;

// db.sequelize.sync({ alter: true });

// const createBranch = async () => {
//   const result = await branch.create({
//     branchName: 'Bandung',
//     address: 'Jalan Bandung'
//   })
//   console.log(result);
// }

// const findBranch = async () => {
//   const result = await branch.findAll();
//   console.log(result);
// }
// createBranch();
// findBranch();
// const createUser = async() => {
//   // insert into user(firstname,lastname) values(jhon, dee)
//   const result = await user.create({
//     firstName: 'jhon',
//     lastName: 'dee'
//   });
//   console.log(result);
// }

// const findUser = async() => {
//   const result = await user.findAll();
//   result.forEach((item) => {
//     console.log(item.firstName, item.lastName);
//   })
// }

// createUser();
// findUser();

app.listen(port, function () {
    console.log(`server is running on localhost ${port}`)
})
