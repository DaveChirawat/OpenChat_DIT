const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const userController = require('./controllers/UserController');
const productController = require("./controllers/ProductController");
const openchatController = require("./controllers/OpenChatController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use('/user', userController);
app.use('/product', productController);
app.use('/openchat', openchatController);


app.listen(3001);