require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { conntectDB } = require('./config/db');
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute')
const errorHandler = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


const PORT = process.env.PORT || 5001
conntectDB();

app.use('/api/v1/users', userRoute);
app.use('/api/v1/message', messageRoute);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

