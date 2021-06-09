require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT||3000;
const cors = require('cors');
 
const server = express();

// Above are required packages import //
// const database=require('./database');
const userController=require('./controllers/userController');

server.use(morgan('dev'));
server.use(cors());
server.use('/api/user', userController);
server.all('/',
    (req, res) => {
        return res.json({
            status: true,
            message: 'Welcome to crime-report-server'
        });
    }
);

server.listen(port, () => {
    console.log(`Server started running at : https://localhost:${port}`);
});