const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const eventRepo = require('./repositories/repository.event');
const accountRepo = require('./repositories/repository.account');
require('dotenv').config();

const corsOptions = {
    origin: "http://localhost:5173",
};

const port = 5000;
const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// Endpoint
app.post('/transaction', eventRepo.addTransaction);
app.get('/transaction', eventRepo.getAllTransactions);
app.delete('/transaction/:id', eventRepo.deleteTransaction);
app.put('/transaction/:id', eventRepo.updateTransaction);

app.listen(port, () => {
    console.log("Server is running and listening on port", port);
});