const AlarmaModel = require('../models/alarma.model');

exports.AlarmaVer = async (req, res) => {
    try {
        const data = await AlarmaModel.AlarmaVerModel();
        res.send(data);
    } catch (error) {
        res.send("Error AlarmaVerModel: " + error);
    };
};

exports.AlarmaNuevo = async (req, res) => {
    const imagen = req.body.imagen;
    const titulo = req.body.titulo;
    const texto = req.body.texto;

    try {
        const data = await AlarmaModel.AlarmaNuevoModel(imagen, titulo, texto);
        res.send({ "message": " 🐨 Alarma creada !!!", "ID": data.insertId });
    } catch (error) {
        res.send("Error AlarmaNuevoModel: " + error);
    };
};

