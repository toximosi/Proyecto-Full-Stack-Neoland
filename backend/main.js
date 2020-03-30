//! 🤘 Centro neural del servidor -----------------------
// express --> para crear el servidro
const express = require('express');
// helmet --> para ayudarnos con la seguridad del servidor
const helmet = require('helmet');

const usuarioController = require('./controllers/usuario.controller');






//* 👌 montamos el servidor, Oh yeaH!!  -----------------------------
const server = express();

//* MIDDLEWARE al ataque!!!! 
//Servidor protegido :)
server.use(helmet());

// 👇 AQUÍ EMPIEZA LA API -------------------------------------------

//! ENDPOINTS ---------------------------------------------------------




//CRUD --------------------------------------------------------------
// LEER (READ) (GET)
/* server.get('/', async (req, res) => {
    //res.send("<h1> Esto arranca,<br> Metamosle Caña 🤘 !!!!! </h1>"
}) */
server.get('/', usuarioController.listUsuarios);

// CREAR (CREATE) (POST)

// EDITAR (EDIT) (PUT)

// ELIMINAR (DELETE) (DELETE)

//! LISTEN --------------------------------------------------------------

// --> llamada al servidor en el puerto 3000
//const PORT = process.env.PORT;
server.listen(3000, () => {
    console.log(`Servidor escuchando en el puerto 3000`);
})