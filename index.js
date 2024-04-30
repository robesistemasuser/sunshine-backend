require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require('./database/config');


const app = express();
 
app.use(cors());

dbConnection();

app.get('/', (req, res) => {
   
    res.json({
        ok:true,
        msg:'Hola Mundo'
    });
    
   
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
