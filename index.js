const express = require('express')
const helmet = require("helmet");
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
let CORS = require('cors');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const crypto = require('crypto');
require('dotenv').config()

const app = express()
app.use(helmet());
const errorHandler = require('./service/error-handler');

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json({ limit: '10mb' }));

app.use(CORS());
app.use('/users', require('./controller/users.controller'));
 

app.get('/', (req, res) => {
    res.send('Leap forg backend');
})
app.use(errorHandler.errorHandler);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOURL, (err, res) => {
    console.log('err',err);
    if (err) return err;
    app.listen(process.env.PORT, () => {
      console.log('Port 3000 running');
    });
  })