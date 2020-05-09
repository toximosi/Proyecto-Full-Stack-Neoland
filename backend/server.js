//! 🤘 Centro neural del servidor -----------------------------------

const express = require('express');// express --> para crear el servidor
const helmet = require('helmet');// helmet --> para ayudarnos con la seguridad del servidor
const bodyParser = require('body-parser');// parsea la el body
const cookieParser = require('cookie-parser');//incluir una cookie de seguimiento en el ¿body?
const { check } = require('express-validator');// valida el body
const cors = require('cors');
const middlewares = require('./middlewares/jwt.middleware')//importamos los middleware

require('dotenv').config();//para el archivo de entorno de .env
// CONTROLADORES -- importar controladores --------------------------------------------------
const UsuarioController = require('./controllers/usuario.controller');
const ObjetoController = require('./controllers/objeto.controller');
const ObjetoFamiliaController = require('./controllers/objetofamilia.controller');
const ObjetoTipoController = require('./controllers/objetipo.controller');
const ConversacionController = require('./controllers/conversacion.controller');
const MensajeController = require('./controllers/mensaje.controller');
const AlarmaController = require('./controllers/alarma.controller');
const FicticioController = require('./controllers/ficticio.controller');

//* 👌 montamos el servidor, Oh yeah!!  -----------------------------
const server = express();
require('dotenv').config();
//* MIDDLEWARE al ataque!!!! 
server.use(helmet());//Servidor protegido :)
server.use(bodyParser.json());//parseamose el body al estilo json, así puedo acceder a sus propiedades como si fuera  un objeto
server.use(cookieParser());//incluye una cookie en el navegador para saber si el usuario esta registrado

//! servidor estático -----> Heroku
//crea el servidor estático en la dirección donde esta todo el material que se trae del ng buli de frontend
server.use(express.static(__dirname + './dist/frontend/'));
//manda todas las request a index.html
server.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './dist/frontend/index.html'));
});

server.use(cors());//si no se pone esto va a dar problemas entre llamadas de localhoster


// 👇 AQUÍ EMPIEZA LA API -------------------------------------------
//! ENDPOINTS ---------------------------------------------------------
//* 👌 usuario INICIO ----------------------------------------------------
server.get("/usuario", middlewares.checkTokenHeader, UsuarioController.UsuarioVer);// ver usuario
/* server.get("/usuario", UsuarioController.UsuarioVer);// ver usuario */
server.get("/usuario/:ID", middlewares.checkTokenHeader, UsuarioController.UsuarioVerId);// ver usuario por ID
server.post("/usuario/nuevo", [
    check('alias').isString().escape().trim(),
    check('nombre').isString().escape().trim(),
    check('apellidos').isString().escape().trim(),
    check('edad').isNumeric(),
    check('email').isEmail().trim(),
    check('password').isString().trim(),
    check('foto').isString().trim()
], UsuarioController.UsuarioNuevo);// incluir usuario
server.put("/usuario/cambiar", UsuarioController.UsuarioCambiar);// modificar usuario
server.delete("/usuario/borrar/:ID", UsuarioController.UsuarioBorrar);// ver usuario por ID
//Extra
server.get("/usuario-conversacion", UsuarioController.UsuarioConversacion);//obtener las conversaciones del usuario
server.get("/usuario-completo", UsuarioController.UsuarioCompleto);//obtener las conversaciones del usuario
server.get("/usuario-completo/:ID", UsuarioController.UsuarioCompletoID);//obtener las conversaciones del usuario
server.post("/login", [
    //check('alias').isString().escape().trim(),
    /* check('nombre').isString(), */
    check('email').isEmail(),
    check('password').isString()
], UsuarioController.UsuarioLogin);//login con hash
server.post("/usuario/registro", [
    check('alias').isString().escape().trim(),
    check('nombre').isString().escape().trim(),
    check('apellidos').isString().escape().trim(),
    check('edad').isNumeric(),
    check('email').isEmail().trim(),
    check('password').isString().trim(),
    check('foto').isString().trim()
], UsuarioController.UsuarioRegistro);// incluir usuario --> Registrar
//* usuario FIN -------------------------------------------------------

//* 👌 objeto INICIO -----------------------------------------------------
server.get("/objeto", ObjetoController.ObjetoVer);// ver objeto
server.get("/objeto/:ID", ObjetoController.ObjetoVerId);// ver objeto por id
server.post("/objeto/nuevo", [
    check('nombre').isString().escape().trim(),
    check('foto').isString().trim(),
    check('descripcion').isString().trim(),
    check('perdido').isNumeric(),
    check('direccion_perdido').isString(),
    check('encontrado').isNumeric(),
    check('fecha_perdido'),
    check('latitud_perdido'),
    check('longitud_perdido'),
    check('fecha_encontrado'),
    check('latitud_encontrado'),
    check('longitud_encontrado'),
    check('fk_usuario').isNumeric()
], ObjetoController.ObjetoNuevo);// incluir objeto
server.put("/objeto/cambiar", ObjetoController.ObjetoCambiar);// cambiar objeto
server.delete("/objeto/borrar/:ID", ObjetoController.ObjetoBorrar);// borrar objeto por id
server.get("/objeto-completo", ObjetoController.ObjetoCompleto);//obtener el objeto con su tipo y familia
//* objeto FIN --------------------------------------------------------

//* 👌 objetofamilia INICIO -----------------------------------------------------
server.get("/objetofamilia", ObjetoFamiliaController.ObjetoFamiliaVer);// ver objetofamilia
server.get("/objetofamilia/:ID", ObjetoFamiliaController.ObjetoFamiliaVerId); //ver obejetofamilia por id
server.post("/objetofamilia/nuevo", [
    check('familia').isAlpha().escape().trim(),
    check('color').isHexadecimal().trim()
], ObjetoFamiliaController.ObjetioFamiliaNuevo);// incluir objetofamilia
server.put("/objetofamilia/cambiar", ObjetoFamiliaController.ObjetoFamiliaCambiar);//cambiar objetofamilia
server.delete("/objetofamilia/borrar/:ID", ObjetoFamiliaController.ObjetoFamiliaBorrar);// borrar objetofamilia
server.get("/objetofamilia-completo", ObjetoFamiliaController.ObjetoFamiliaTipo);//obtener la realcion de onjetosfamilia y objetos tipo

//* objetofamilia FIN --------------------------------------------------------

//*👌 objetoTipo INICIO -----------------------------------------------------
server.get("/objetotipo", ObjetoTipoController.ObjetoTipoVer)// ver objetoTipo
server.get("/objetotipo/:ID", ObjetoTipoController.ObjetoTipoVerId)// ver objetotipo por ID
server.post("/objetotipo/nuevo", [
    check('tipo').isAlpha().escape().trim(),
    check('icono').isString().trim()
], ObjetoTipoController.ObjetoTipoNuevo); // incluir objetoTipo
server.put("/objetotipo/cambiar", ObjetoTipoController.ObjetoTipoCambiar);// cambiar objeto tipo
server.delete("/objetotipo/borrar/:ID", ObjetoTipoController.ObjetoTipoBorrar); //borrar objeto tipo por ID
//* objetoTipo FIN -------------------------------------------------------- */

//* 👌 conversacion INICIO -----------------------------------------------------
server.get("/conversacion", ConversacionController.ConversacionVer)// ver conversacion
server.get("/conversacion/:ID", ConversacionController.ConversacionVerId); //ver conversacion por id
server.post("/conversacion/nuevo", [
    check('emisor').isNumeric(),
    check('receptor').isNumeric(),
    check('asunto').isString().escape().trim()
], ConversacionController.ConversacionNuevo); // incluir conversacion
server.put("/conversacion/cambiar", ConversacionController.ConversacionCambiar);//cambiar conversacion
server.delete("/conversacion/borrar/:ID", ConversacionController.ConversacionBorrar);//borrar conversacion
//Extra
server.get("/conversacion-completo", ConversacionController.ConversacionCompleta)// ver conversacion
server.get("/conversacion-completo/:ID", ConversacionController.ConversacionMensajeId)// ver conversacion
//* conversacion FIN -------------------------------------------------------- */

//* 👌 mensaje INICIO -----------------------------------------------------
server.get("/mensaje", MensajeController.MensajeVer);// ver mensaje
server.get("/mensaje/:ID", MensajeController.MensajeVerId);// ver mensaje por id
server.post("/mensaje/nuevo", [
    check('emisor').isNumeric(),
    check('texto').isString().escape().trim(),
    check('fk_conversacion').isNumeric(),
], MensajeController.MensajeNuevo); // incluir mensaje
server.put("/mensaje/cambiar", MensajeController.MensajeCambiar); // cambiar mensaje
server.delete("/mensaje/borrar/:ID", MensajeController.MensajeBorrar);// borrar mensaje
//* mensaje FIN -------------------------------------------------------- */

//* 👌 alarma INICIO -----------------------------------------------------
server.get("/alarma", AlarmaController.AlarmaVer);// ver alarmas
server.get("/alarma/:ID", AlarmaController.AlarmaVerId);// ver alarmas id
server.post("/alarma/nuevo", [
    check('foto').isString().trim(),
    check('titulo').isString().escape().trim(),
    check('texto').isString().trim()
], AlarmaController.AlarmaNuevo); // incluir alarmas
server.put("/alarma/cambiar", AlarmaController.AlarmaCambiar); // cambiar alarmas
server.delete("/alarma/borrar/:ID", AlarmaController.AlarmaBorrar);// borrar alarma
//* alarma FIN -------------------------------------------------------- */

//* 👌 ficticio INICIO -----------------------------------------------------
server.get("/ficticio", FicticioController.FicticioVer);// ver Ficticios
server.get("/ficticio/:ID", FicticioController.FicticioVerId);// ver Ficticios id
server.post("/ficticio/nuevo", [
    check('nombre').isString().trim(),
    check('foto').isString().trim(),
    check('icono').isString().trim(),
    check('descripcion').isString().escape().trim(),
    check('latitud').isNumeric(),
    check('longitud').isNumeric()
], FicticioController.FicticioNuevo); // incluir Ficticios
server.put("/ficticio/cambiar", FicticioController.FicticioCambiar); // cambiar Ficticios
server.delete("/ficticio/borrar/:ID", FicticioController.FicticioBorrar);// borrar Ficticio
//* ficticio FIN -------------------------------------------------------- */

//*Testeamos --- fuciona los Endpoints? -------------------------------
server.get("/test", (req, res) => { res.send(" 🖐 Hola Mundo!!!!"); });

//! LISTEN --------------------------------------------------------------
// --> llamada al servidor en el puerto 3000
//const PORT = process.env.PORT;
const PORT = process.argv[2];
/* console.log(process.env.PORT); */
server.listen(process.env.PORT || PORT, () => {
    console.log(`👾 Servidor escuchando en el puerto ${PORT} 👾`);
});//nodemon server.js 3000