const ObjetoTipoModel = require('../models/objetotipo.model');

exports.ObjetoTipoVer = async (req, res) => {
    try {
        const data = await ObjetoTipoModel.ObjetoTipoVerModel();
        res.send(data);
    } catch (error) {
        res.send("Error ObjetoTipoVerController: " + error);
    };
};

exports.ObjetoTipoNuevo = async (req, res) => {
    const tipo = req.body.tipo;
    const familia = req.body.familia;
    const icono = req.body.icono;

    try {
        const data = await ObjetoTipoModel.ObjetoTipoNuevoModel(tipo, icono);
        res.send({ "message": " 🌟 ObjetoTipo creado !!!", "ID": data.insertId })

    } catch (error) {
        res.send("Error ObjetiTipoNuevoController: " + error);
    }
}