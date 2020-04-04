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
    const foto = req.body.foto;
    const descripcion = req.body.descripcion;
    const perdido = req.body.perdido;
    const encontrado = req.body.encontrado;
    const fecha_perdida = req.body.fecha_perdida;
    const latitud_perdida = req.body.latitud_perdida;
    const longitud_perdida = req.body.longitud_perdida;
    const fecha_encontrado = req.body.fecha_encontrado;
    const latitud_encontrado = req.body.latitud_encontrado;
    const longitud_encontrado = req.body.longitud_encontrado;

    try {
        const data = await ObjetoModel.ObjetoNuevoModel(nombre, foto, descripcion, perdido, encontrado, fecha_perdida, latitud_perdida, longitud_perdida, fecha_encontrado, latitud_encontrado, longitud_encontrado);
        res.send({ "message": " 😎 Objeto creado !!!", "ID": data.insertId });
    } catch (error) {
        res.send("Error ObjetoNuevoModel; " + error);
    };
};