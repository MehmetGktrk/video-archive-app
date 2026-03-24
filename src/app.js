const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const errorMiddleware = require("./middlewares/error.middleware");




const app = express();


app.use(cors());

app.use(express.json());



app.use(errorMiddleware);

module.exports = app;   