//! 🤘 Centro neural del servidor -----------------------------------

const express = require('express');// express --> para crear el servidor
const helmet = require('helmet');// helmet --> para ayudarnos con la seguridad del servidor
const bodyParser = require('body-parser');// parsea la el body
const cookieParser = require('cookie-parser');//incluir una cookie de seguimiento en el ¿body?
//const jwtController = require('./middleware/jwt.middleware');
const { check } = require('express-validator');// valida el body
const cors = require('cors');

require('dotenv').config();//para el archivo de entorno de .env
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
server.use(bodyParser.json());//parseamose el body al estilo json, así puedo acceder a sus propiedades como si fuera  un objeto
server.use(cookieParser());//incluye una cookie en el navegador para saber si el usuario esta registrado
//server.use(jwtController.checkToken());
//server.us(express.static('static'));//servidor estático:
server.use(cors());

// 👇 AQUÍ EMPIEZA LA API -------------------------------------------
//! ENDPOINTS ---------------------------------------------------------

//* 👌 usuario INICIO ----------------------------------------------------
server.get("/usuario", UsuarioController.UsuarioVer);// ver usuario
server.get("/usuario/:ID", UsuarioController.UsuarioVerId);// ver usuario por ID
server.post("/usuario/nuevo", [
    check('alias').isString().escape().trim(),
    check('nombre').isString().escape().trim(),
    check('apellidos').isString().escape().trim(),
    check('edad').isNumeric(),
    check('email').isEmail().trim(),
    check('password').isString().trim(),
    check('avatar').isString().trim()
], UsuarioController.UsuarioNuevo);// incluir usuario
server.put("/usuario/cambiar", UsuarioController.UsuarioCambiar);// modificar usuario
server.delete("/usuario/borrar/:ID", UsuarioController.UsuarioBorrar);// ver usuario por ID
//Extra
server.get("/usuario-conversacion", UsuarioController.UsuarioConversacion);//obtener las conversaciones del usuario
server.get("/usuario-completo", UsuarioController.UsuarioCompleto);//obtener las conversaciones del usuario
server.post("/login", [
    //check('alias').isString().escape().trim(),
    check('nombre').isString(),
    check('email').isEmail(),
    check('password').isString(),
], UsuarioController.UsuarioLogin);//login con hash
//* usuario FIN -------------------------------------------------------

//* 👌 objeto INICIO -----------------------------------------------------
server.get("/objeto", ObjetoController.ObjetoVer);// ver objeto
server.get("/objeto/:ID", ObjetoController.ObjetoVerId);// ver objeto por id
server.post("/objeto/nuevo", [
    check('nombre').isAlpha().escape().trim(),
    check('foto').isAlphanumeric().trim(),
    check('descripcion').isAlphanumeric().trim(),
    check('perdido').isNumeric(),
    check('encontrado').isNumeric(),
    check('fecha_perdida').isAlphanumeric(),
    check('latitud_perdida').isNumeric(),
    check('longitud_perdida').isNumeric(),
    check('fecha_encontrado').isAlphanumeric(),
    check('latitud_encontrado').isNumeric(),
    check('longitud_encontrado').isNumeric()
], ObjetoController.ObjetoNuevo);// incluir objeto
server.put("/objeto/cambiar", ObjetoController.ObjetoCambiar);// cambiar objeto
server.delete("/objeto/borrar/:ID", ObjetoController.ObjetoBorrar);// borrar objeto por id
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
//* objetofamilia FIN --------------------------------------------------------

//*👌 objetoTipo INICIO -----------------------------------------------------
server.get("/objetotipo", ObjetoTipoController.ObjetoTipoVer)// ver objetoTipo
server.get("/objetotipo/:ID", ObjetoTipoController.ObjetoTipoVerId)// ver objetotipo por ID
server.post("/objetotipo/nuevo", [
    check('tipo').isAlpha().escape().trim(),
    check('icono').isAlphanumeric().trim()
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
    check('asunto').isAlphanumeric().escape().trim()
], ConversacionController.ConversacionNuevo); // incluir conversacion
server.put("/conversacion/cambiar", ConversacionController.ConversacionCambiar);//cambiar conversacion
server.delete("/conversacion/borrar/:ID", ConversacionController.ConversacionBorrar);//borrar conversacion
//Extra
server.get("/conversacion-mensaje", ConversacionController.ConversacionMensaje)// ver conversacion
//* conversacion FIN -------------------------------------------------------- */

//* 👌 mensaje INICIO -----------------------------------------------------
server.get("/mensaje", MensajeController.MensajeVer);// ver mensaje
server.get("/mensaje/:ID", MensajeController.MensajeVerId);// ver mensaje por id
server.post("/mensaje/nuevo", [
    check('emisor').isNumeric(),
    check('texto').isAlphanumeric().escape().trim()
], MensajeController.MensajeNuevo); // incluir mensaje
server.put("/mensaje/cambiar", MensajeController.MensajeCambiar); // cambiar mensaje
server.delete("/mensaje/borrar/:ID", MensajeController.MensajeBorrar);// borrar mensaje
//* mensaje FIN -------------------------------------------------------- */

//* 👌 alarma INICIO -----------------------------------------------------
server.get("/alarma", AlarmaController.AlarmaVer);// ver alarmas
server.get("/alarma/:ID", AlarmaController.AlarmaVerId);// ver alarmas id
server.post("/alarma/nuevo", [
    check('imagen').isAlphanumeric().trim(),
    check('titulo').isAlphanumeric().escape().trim(),
    check('texto').isAlphanumeric().trim()
], AlarmaController.AlarmaNuevo); // incluir alarmas
server.put("/alarma/cambiar", AlarmaController.AlarmaCambiar); // cambiar alarmas
server.delete("/alarma/borrar/:ID", AlarmaController.AlarmaBorrar);// borrar alarma
//* alarma FIN -------------------------------------------------------- */

//*Testeamos --- fuciona los Endpoints? -------------------------------
server.get("/test", (req, res) => { res.send(" 🖐 Hola Mundo!!!!"); });

//! LISTEN --------------------------------------------------------------
// --> llamada al servidor en el puerto 3000
//const PORT = process.env.PORT;
const PORT = process.argv[2];
server.listen(process.env.PORT || PORT, () => {
    console.log(`👾 Servidor escuchando en el puerto ${PORT} 👾`);
});//nodemon server.js 3000