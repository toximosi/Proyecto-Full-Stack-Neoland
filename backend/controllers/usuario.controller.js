const UsuarioModel = require('../models/usuario.model');

exports.UsuarioVer = async (req, res) => {
    try {
        const data = await UsuarioModel.UsuarioVerModel();
        res.send(data);
    } catch (error) {
        res.send("Error UsuarioVerController:" + error);
    };
};

exports.UsuarioNuevo = async (req, res) => {
    //request, response --> solicitud, respuesta
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const email = req.body.email;

    try {
        const data = UsuarioModel.UsuarioNuevoModel(nombre, apellidos, email);
        res.send({ "message": " 👨‍🎤 usuario creado !!!", "ID": data.insertId });

    } catch (error) {
        res.send("Error UsuarioNuevoController:" + error);
    };
};