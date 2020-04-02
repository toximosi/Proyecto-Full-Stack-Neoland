const MensajeModel = require('../models/mensaje.model');

exports.MensajeVer = async (req, res) => {
    try {
        const data = await MensajeModel.MensajeVerModel();
        res.send(data);
    } catch (error) {
        res.send("Error MensaVerController: " + error);
    };
};

exports.MensajeNuevo = async (req, res) => {
    const emisor = req.body.emisor;
    const receptor = req.body.receptor;
    const asunto = req.body.asunto;
    const mensaje = req.body.mensaje;
    const respuesta = req.body.respuesta;

    try {
        const data = await MensajeModel.MensajeNuevoModel(emisor, receptor, asunto, mensaje, respuesta);
        res.send({ "message": " 📪 mensaje creado !!!", "ID": data.insertId });
    } catch (error) {
        res.send("Error MensajeNuevoController: " + error);
    };
};
