import express from 'express'
import dbConfig from './app/databaseConfig/dbConfig'
//for parsing the body of the request
import bodyParser from 'body-parser';
//routes of the application
import bank from './app/routes/routes'

import config from './config.json'
//for adding the response to the route
import response from './response'

import swaggerUi from 'swagger-ui-express'

import swaggerDocument from './swagger.json'

const app=express();
class server{
    dbConnection(){
        app.listen(3000);
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
        app.use('/shop',response.response);
        app.use('/shop',bank);
        app.use('/shop', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
        const connection=new dbConfig.config();
        connection.mongooseConnection();
        global.config=config;
    }
} 

let Server=new server();
Server.dbConnection();






