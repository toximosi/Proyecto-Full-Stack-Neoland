const MensajeModel = require('../models/mensaje.model');

// Crrud : CREATE --> crear un nuevo mensajes
exports.MensajeNuevo = async (req, res) => {
    const emisor = req.body.emisor;
    //! la fecha la da el servidor
    const texto = req.body.texto;

    try {
        const data = await MensajeModel.MensajeNuevoModel(emisor, texto);
        res.send({ "message": " 📨 mensaje creado !!!", "ID": data.insertId });
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

    try {
        await MensajeModel.MensajeCambiarModel(ID, emisor, texto);
        res.send({ "message": ` 📨 mensaje con id = ${ID} modificado con éxito!!!!!, Oh YEa 😎 !!` });
    } catch (error) {
        res.send("Error MensajeCambiarController: " + error);
    };
};

// crruD : DELETED ID --> borrar  un mensajes por su id
exports.MensajeBorrar = async (req, res) => {
    const ID = req.params.ID;

    try {
        const data = await MensajeModel.MensajeBorrarModel(ID);
        res.send({ "message": ` 📨 mensaje con id ${ID} borrado ☠️!!` });
    } catch (error) {
        res.send("Error MensajeBorrarController: " + error);
    };
};