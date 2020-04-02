//! 🤘 Centro neural del servidor -----------------------------------
const express = require('express');// express --> para crear el servidor
const helmet = require('helmet');// helmet --> para ayudarnos con la seguridad del servidor
const bodyParser = require('body-parser');// parsea la el body
//const { check } = require('express-validator');// valida el body

// CONTROLADORES -- importar controladores --------------------------------------------------
const UsuarioController = require('./controllers/usuario.controller');
const ObjetoController = require('./controllers/objeto.controller');
const ObjetoTipoController = require('./controllers/objetipo.controller');
const MensajeController = require('./controllers/mensaje.controller');
const AlarmaController = require('./controllers/alarma.controller');

//* 👌 montamos el servidor, Oh yeah!!  -----------------------------
const server = express();

//* MIDDLEWARE al ataque!!!! 
server.use(helmet());//Servidor protegido :)
server.use(bodyParser.json());
//server.us(express.static('static'));//servidor estático:

// 👇 AQUÍ EMPIEZA LA API -------------------------------------------
//! ENDPOINTS ---------------------------------------------------------

//* usuario INICIO ----------------------------------------------------
server.get("/usuario", UsuarioController.UsuarioVer);
server.post("/usuarionuevo", UsuarioController.UsuarioNuevo);
//* usuario FIN -------------------------------------------------------

//* objeto INICIO -----------------------------------------------------
server.get("/objeto", ObjetoController.ObjetoVer);
server.post("/objetonuevo", ObjetoController.ObjetoNuevo);
//* objeto FIN --------------------------------------------------------

//* objetoTipo INICIO -----------------------------------------------------
server.get("/objetotipo", ObjetoTipoController.ObjetoTipoVer)// ver alarmas
server.post("/objetotiponuevo", ObjetoTipoController.ObjetoTipoNuevo); // incluir alarmas
//* objetoTipo FIN --------------------------------------------------------

//* mensaje INICIO -----------------------------------------------------
server.get("/mensaje", MensajeController.MensajeVer)// ver alarmas
server.post("/mensajenuevo", MensajeController.MensajeNuevo); // incluir alarmas
//* mensaje FIN --------------------------------------------------------

//* alarma INICIO -----------------------------------------------------
server.get("/alarma", AlarmaController.AlarmaVer)// ver alarmas
server.post("/alarmanuevo", AlarmaController.AlarmaNuevo); // incluir alarmas
//* alarma FIN --------------------------------------------------------

//*Testeamos --- fuciona los Endpoints? -------------------------------
server.get("/test", (req, res) => { res.send(" 🖐 Hola Mundo!!!!"); });

//! LISTEN --------------------------------------------------------------
// --> llamada al servidor en el puerto 3000
//const PORT = process.env.PORT;
const PORT = process.argv[2];
server.listen(PORT, () => {
    console.log(`👾 Servidor escuchando en el puerto ${PORT} 👾`);
})
//nodemon main.js 3000

