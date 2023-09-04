const jsonwebtoken = require("jsonwebtoken")
// const { pool } = require('../src/database/index.ts')
const mysql2 = require("mysql2/promise")
const dotenv = require("dotenv")
dotenv.config()
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    port: 3306,
    password: "admin",
    database: 'vacationsapp',
});


const getTokenForAdmin = () => {
    const signedToken = jsonwebtoken.sign({ email: `userDummy@gmail.com`, userId: 9999999, role: "admin" }, "PASSWORD123456789", { expiresIn: '60m' })
    return signedToken
}

const getTokenForNonAdmin = () => {
    const signedToken = jsonwebtoken.sign({ email: `userDummy@gmail.com`, userId: 9999999, role: "user" }, "PASSWORD123456789", { expiresIn: '60m' })
    return signedToken
}

const getTokenForNonAdminFollowers = () => {
    const signedToken = jsonwebtoken.sign({ email: `user@user.com`, userId: 2, role: "user" }, "PASSWORD123456789", { expiresIn: '60m' })
    return signedToken
}




async function deleteVacationTest(destination) {
    const query = `DELETE FROM vacationsapp.vacations WHERE destination = ?`;
    const results = await pool.execute(query, [destination]);
    return results;
}


async function insertVacationTest() {
    const query = "INSERT INTO `vacationsapp`.`vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `image`) VALUES ('666', 'dfssd', 'dfsdfsd', '2023-08-29', '23-09-08', '550', 'dsfdfs');";
    const results = await pool.execute(query);
    return results;
}

async function deleteUserTest(email) {
    const query = "DELETE FROM `vacationsapp`.`users` WHERE (`email` = ?);";
    const results = await pool.execute(query, [email]);
    return results;
}



module.exports = { getTokenForAdmin, getTokenForNonAdmin, deleteVacationTest, insertVacationTest, deleteUserTest, getTokenForNonAdminFollowers }