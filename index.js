require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require('./database/config');


const app = express();
 
app.use(cors());

app.use(express.json());

dbConnection();

app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/variedades", require("./routes/variedades"));
app.use("/api/grados", require("./routes/grados"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/todo", require("./routes/busquedas"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/upload", require("./routes/uploads"));



app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
