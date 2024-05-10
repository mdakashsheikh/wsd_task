require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { conntectDB } = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001

conntectDB();

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

