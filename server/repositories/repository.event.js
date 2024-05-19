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

async function addTransaction(req, res){
    const { transaksi, jumlah_nominal, tanggal } =
        req.body;
    
    try {
        const result = await pool.query(
            'INSERT INTO catatan_finansial (transaksi, jumlah_nominal, tanggal) VALUES ($1, $2, $3) RETURNING *',
            [transaksi, jumlah_nominal, tanggal]
        );
        const newEvent = result.rows[0];
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}

async function getAllTransactions(req, res){
    try {
        const result = await pool.query('SELECT * FROM catatan_finansial');
        const events = result.rows;
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateTransaction(req, res) {
    const { id } = req.params;
    const { transaksi, jumlah_nominal, tanggal } = req.body;

    try {
        const result = await pool.query(
            'UPDATE catatan_finansial SET transaksi = $1, jumlah_nominal = $2, tanggal = $3 WHERE id = $4 RETURNING *',
            [transaksi, jumlah_nominal, tanggal, id]
        );
        if (result.rowCount > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(500).json({ error: "Event not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteTransaction(req, res) {
    const eventId = req.params.id;

    try {
        const result = await pool.query(
            'DELETE FROM catatan_finansial WHERE id=$1 RETURNING *',
            [eventId]
        );
        const deletedEvent = result.rows[0];
        res.status(200).json(deletedEvent);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    addTransaction,
    getAllTransactions,
    updateTransaction,
    deleteTransaction,
};