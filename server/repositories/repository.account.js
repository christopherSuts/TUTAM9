const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,

     // Set to true if you are using a remote server that uses HTTPS
    ssl: {
        require: true,
    },
});

pool.connect().then(() => {
    console.log("Connected to PostgreSQL database");
});

const actionLogin = async (req, res) => {
const { npm, password } = req.body;

try {
    const result = await pool.query("SELECT * FROM account WHERE npm = $1 AND password = $2", 
    [npm, password]);
    if (!result.rows.length) {
        res.status(200).json({ message: "The Password or NPM is wrong" });
    } else {
        res.status(200).json(result.rows[0]);
    }
} catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
}
};

const actionSignup = async (req, res) => {
const { npm, password, display_name } =
    req.body;

try {
    await pool.query("INSERT INTO account (npm, password, display_name) VALUES ($1, $2, $3)", [npm, password, display_name]);
    res.status(200).send("Sukses signup");
} catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
}
};


module.exports = {
actionLogin,
actionSignup,
};