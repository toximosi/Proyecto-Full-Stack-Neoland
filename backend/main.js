//! 🤘 Centro neural del servidor -----------------------------------
const express = require('express');// express --> para crear el servidor
const helmet = require('helmet');// helmet --> para ayudarnos con la seguridad del servidor
const bodyParser = require('body-parser');// parsea la el body
//const { check } = require('express-validator');// valida el body
require('dotenv').config();
// CONTROLADORES -- importar controladores --------------------------------------------------
const UsuarioController = require('./controllers/usuario.controller');
const ObjetoController = require('./controllers/objeto.controller');
const ObjetoFamiliaController = require('./controllers/objetofamilia.controller');
const ObjetoTipoController = require('./controllers/objetipo.controller');
const ConversacionController = require('./controllers/conversacion.controller');
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

//* 👌 usuario INICIO ----------------------------------------------------
server.get("/usuario", UsuarioController.UsuarioVer);// ver usuario
server.post("/usuarionuevo", UsuarioController.UsuarioNuevo);// incluir usuario
//* usuario FIN -------------------------------------------------------

//* 👌 objeto INICIO -----------------------------------------------------
server.get("/objeto", ObjetoController.ObjetoVer);// ver objeto
server.post("/objetonuevo", ObjetoController.ObjetoNuevo);// incluir objeto
//* objeto FIN --------------------------------------------------------

//* 👌 objetofamilia INICIO -----------------------------------------------------
server.get("/objetofamilia", ObjetoFamiliaController.ObjetoFamiliaVer);// ver objetofamilia
server.post("/objetofamilianuevo", ObjetoFamiliaController.ObjetioFamiliaNuevo);// incluir objetofamilia
//* objetofamilia FIN --------------------------------------------------------

//*👌 objetoTipo INICIO -----------------------------------------------------
server.get("/objetotipo", ObjetoTipoController.ObjetoTipoVer)// ver objetoTipo
server.post("/objetotiponuevo", ObjetoTipoController.ObjetoTipoNuevo); // incluir objetoTipo
//* objetoTipo FIN --------------------------------------------------------

//* 👌 conversacion INICIO -----------------------------------------------------
server.get("/conversacion", ConversacionController.ConversacionVer)// ver conversacion
server.post("/conversacionnuevo", ConversacionController.ConversacionNuevo); // incluir conversacion
//* conversacion FIN --------------------------------------------------------

//* 👌 mensaje INICIO -----------------------------------------------------
server.get("/mensaje", MensajeController.MensajeVer)// ver mensaje
server.post("/mensajenuevo", MensajeController.MensajeNuevo); // incluir mensaje
//* mensaje FIN --------------------------------------------------------

//* 👌 alarma INICIO -----------------------------------------------------
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

