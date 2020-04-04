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
    //! la fecha la da el servidor
    const texto = req.body.texto;

    try {
        const data = await MensajeModel.MensajeNuevoModel(emisor, texto);
        res.send({ "message": " 📨 mensaje creado !!!", "ID": data.insertId });
    } catch (error) {
        res.send("Error MensajeNuevoController: " + error);
    };
};
