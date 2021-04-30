const express = require('express');
const dbConfig = require("./app/databaseConfig/dbConfig");
const app=express();
const bodyParser = require('body-parser');
const bank = require('./app/routes/routes');
const config = require("./config.json");
const response = require("./response");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.listen(3000);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/',response.response);
app.use('/',bank);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// const connection=new dbConfig.config();
// connection.mongooseConnection();
global.config=config;







