const ObjetoModel = require('../models/objeto.model');

exports.ObjetoVer = async (req, res) => {
    try {
        const data = await ObjetoModel.ObjetoVerModel();
        res.send(data);
    } catch (error) {
        res.send("Error ObjetoVerModel: " + error);
    };
};

exports.ObjetoNuevo = async (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const estado = req.body.estado;

    try {
        const data = ObjetoModel.ObjetoNuevoModel(nombre, descripcion, estado);
        res.send({ "message": " 😎 Objeto creado !!!", "ID": data.insertId });
    } catch (error) {
        res.send("Error ObjetoNuevoModel; " + error);
    };
};