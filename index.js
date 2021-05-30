require('dotenv').config();
const expressjs = require('express');
const morganDev = require('morgan');
const port = process.env.PORT;
const corsDev = require('cors');
// const db = require('./data/database')
// Above are required packages import //


const server = expressjs();

server.use(morganDev('dev'));
server.use(corsDev());
server.use(expressjs.urlencoded({ extended: true }));
server.use(expressjs.json());

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