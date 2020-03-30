const usuarioModel = require('../models/usuario.model');

exports.listUsuarios = async (req, res) => {
    try {
        const data = await usuarioModel.getAllUsuarios();
        res.send(data);
        //console.log(data);
    } catch (error) {
        res.send(error);
    }
}
