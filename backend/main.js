//! Centro neural del servidor -----------------------
const express = require('express');
const helmet = require('helmet');


//* montamos el servidor -----------------------------
const server = express();
server.use(helmet());

// xxxxxxxx -------------------------------------------

//-----------------------------------------------------

// Endpoint -------------------------------------------

//-----------------------------------------------------


// --> llamada al servidor en el puerto 3000
//const PORT = process.env.PORT;
server.listen(3000, () => {
    console.log(`Servidor escuchando en el puerto 3000`)
})