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
server.get("/usuario/:ID", UsuarioController.UsuarioVerId);// ver usuario por ID
server.post("/usuario/nuevo", UsuarioController.UsuarioNuevo);// incluir usuario
server.put("/usuario/cambiar", UsuarioController.UsuarioCambiar);// modificar usuario
server.delete("/usuario/borrar/:ID", UsuarioController.UsuarioBorrar);// ver usuario por ID
//* usuario FIN -------------------------------------------------------

//* 👌 objeto INICIO -----------------------------------------------------
server.get("/objeto", ObjetoController.ObjetoVer);// ver objeto
server.get("/objeto/:ID", ObjetoController.ObjetoVerId);// ver objeto por id
server.post("/objeto/nuevo", ObjetoController.ObjetoNuevo);// incluir objeto
server.put("/objeto/cambiar", ObjetoController.ObjetoCambiar);// cambiar objeto
server.delete("/objeto/borrar/:ID", ObjetoController.ObjetoBorrar);// 👿 borrar objeto por id
//* objeto FIN --------------------------------------------------------

//* 👌 objetofamilia INICIO -----------------------------------------------------
server.get("/objetofamilia", ObjetoFamiliaController.ObjetoFamiliaVer);// ver objetofamilia
server.get("/objetofamilia/:ID", ObjetoFamiliaController.ObjetoFamiliaVerId); //ver obejetofamilia por id
server.post("/objetofamilia/nuevo", ObjetoFamiliaController.ObjetioFamiliaNuevo);// incluir objetofamilia
server.put("/objetofamilia/cambiar", ObjetoFamiliaController.ObjetoFamiliaCambiar);//cambiar objetofamilia
server.delete("/objetofamilia/borrar/:ID", ObjetoFamiliaController.ObjetoFamiliaBorrar);// borrar objetofamilia
//* objetofamilia FIN --------------------------------------------------------

//*👌 objetoTipo INICIO -----------------------------------------------------
server.get("/objetotipo", ObjetoTipoController.ObjetoTipoVer)// ver objetoTipo
server.get("/objetotipo/:ID", ObjetoTipoController.ObjetoTipoVerId)// ver objetotipo por ID
server.post("/objetotipo/nuevo", ObjetoTipoController.ObjetoTipoNuevo); // incluir objetoTipo
server.put("/objetotipo/cambiar", ObjetoTipoController.ObjetoTipoCambiar);// cambiar objeto tipo
server.delete("/objetotipo/borrar/:ID", ObjetoTipoController.ObjetoTipoBorrar); //borrar objeto tipo por ID
//* objetoTipo FIN --------------------------------------------------------

//* 👌 conversacion INICIO -----------------------------------------------------
server.get("/conversacion", ConversacionController.ConversacionVer)// ver conversacion
server.get("/conversacion/:ID", ConversacionController.ConversacionVerId); //ver conversacion por id
server.post("/conversacion/nuevo", ConversacionController.ConversacionNuevo); // incluir conversacion
server.put("/conversacion/cambiar", ConversacionController.ConversacionCambiar);//cambiar conversacion
server.delete("/conversacion/borrar/:ID", ConversacionController.ConversacionBorrar);//borrar converscion
//* conversacion FIN --------------------------------------------------------

//* 👌 mensaje INICIO -----------------------------------------------------
server.get("/mensaje", MensajeController.MensajeVer);// ver mensaje
server.get("/mensaje/:ID", MensajeController.MensajeVerId);// ver mensaje por id
server.post("/mensaje/nuevo", MensajeController.MensajeNuevo); // incluir mensaje
server.put("/mensaje/cambiar", MensajeController.MensajeCambiar); // cambiar mensaje
server.delete("/mensaje/borrar/:ID", MensajeController.MensajeBorrar);// borrar mensaje
//* mensaje FIN --------------------------------------------------------

//* 👌 alarma INICIO -----------------------------------------------------
server.get("/alarma", AlarmaController.AlarmaVer);// ver alarmas
server.get("/alarma/:ID", AlarmaController.AlarmaVerId);// ver alarmas id
server.post("/alarma/nuevo", AlarmaController.AlarmaNuevo); // incluir alarmas
server.put("/alarma/cambiar", AlarmaController.AlarmaCambiar); // cambiar alarmas
server.delete("/alarma/borrar/:ID", AlarmaController.AlarmaBorrar)// borrar alarma
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
//nodemon server.js 3000

