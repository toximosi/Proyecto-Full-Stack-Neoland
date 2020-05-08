const MensajeModel = require('../models/mensaje.model');
const UsuarioModel = require('../models/usuario.model');
const { validationResult } = require('express-validator');// valida el body

// CRRUD --> CREATE, READ, READ ID, UPLOAD, DELETE
// Crrud : CREATE --> crear un nuevo mensajes
exports.MensajeNuevo = async (req, res) => {
    const emisor = req.body.emisor;
    //! la fecha la da el servidor
    const texto = req.body.texto;
    const fk_conversacion = req.body.fk_conversacion;

    const errors = validationResult(req);//Ejecuta las validaciones 

    try {

        if (!errors.isEmpty()) {
            return res.status(422).json({ "error": "El body esta mal formado", "Explicacion": errors });
        } else {
            const data = await MensajeModel.MensajeNuevoModel(emisor, texto, fk_conversacion);
            res.send({ "message": " 📨 mensaje creado !!!", "ID": data.insertId });
        };
    } catch (error) {
        res.send("Error MensajeNuevoController: " + error);
    };
};

// cRrud : READ --> Leer o ver todos los mensajes
exports.MensajeVer = async (req, res) => {
    try {
        const data = await MensajeModel.MensajeVerModel();
        res.send(data);
    } catch (error) {
        res.send("Error MensaVerController: " + error);
    };
};

// crRud : READ --> Leer o ver un mensajes por su id
exports.MensajeVerId = async (req, res) => {
    const ID = req.params.ID;

    try {
        const data = await MensajeModel.MensajeVerIdModel(ID);
        res.send(data);
    } catch (error) {
        res.send("Error MensajeVerIdController: " + error);
    };
};

// crrUd : UPLOAD --> actualizar mensajes por su id
exports.MensajeCambiar = async (req, res) => {
    const ID = req.body.ID;
    const emisor = req.body.emisor;
    const texto = req.body.texto;

    const errors = validationResult(req);//Ejecuta las validaciones

    try {

        if (!errors.isEmpty()) {
            return res.status(422).json({ "error": "El body esta mal formado", "Explicacion": errors });
        } else {
            const data = await MensajeModel.MensajeCambiarModel(ID, emisor, texto);

            if (data.affectedRows > 0) {
                res.send({ "message": ` 📨 mensaje con id = ${ID} modificado con éxito!!!!!, Oh YEa 😎 !!` });
            } else {
                res.status(404).send({ "error": `Ese 📨 mensaje con id = ${ID} no existe 😱` })
            };
        };
    } catch (error) {
        res.send("Error MensajeCambiarController: " + error);
    };
};

// crruD : DELETED ID --> borrar  un mensajes por su id
exports.MensajeBorrar = async (req, res) => {
    const ID = req.params.ID;

    try {
        const data = await MensajeModel.MensajeBorrarModel(ID);
        if (data.affectedRows > 0) {
            res.send({ "message": ` 📨 mensaje con id ${ID} borrado ☠️!!` });
        } else {
            res.status(404).send({ "error": `Ese 📨 mensaje con id = ${ID} no existe 😱` })
        };
    } catch (error) {
        res.send("Error MensajeBorrarController: " + error);
    };
};

//objeter el mansaje segun la conversacion a la que pertenece
exports.MensajeConversacionId = async (req, res) => {
    const ID = req.params.ID;

    try {
        const data = await MensajeModel.MensajeConversacionId(ID);
        res.send(data);
    } catch (error) {
        res.send("Error MensajeConversacionIdController: " + error);
    };
};