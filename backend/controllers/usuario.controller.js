const UsuarioModel = require('../models/usuario.model');
const moment = require('moment');

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
    const alias = req.body.alias;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const edad = req.body.edad;
    const email = req.body.email;
    const password = req.body.password;
    const avatar = req.body.avatar;
    //! la fecha la incluye directamente mysql

    try {
        const data = UsuarioModel.UsuarioNuevoModel(alias, nombre, apellidos, edad, email, password, avatar);
        res.send({ "message": " 👨‍🎤 usuario creado !!!", "ID": data.insertId });

    } catch (error) {
        res.send("Error UsuarioNuevoController:" + error);
    };
};