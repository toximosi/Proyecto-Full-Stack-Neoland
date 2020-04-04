const ObjetoFamiliaModel = require('../models/objetofamilia.model');

exports.ObjetoFamiliaVer = async (req, res) => {
    try {
        const data = await ObjetoFamiliaModel.ObjetoFamiliaVerModel();
        res.send(data);
    } catch (error) {
        res.send("Error ObjetoFamiliaVerController: " + error);
    };
};

exports.ObjetioFamiliaNuevo = async (req, res) => {
    const familia = req.body.familia;
    const color = req.body.color;

    try {
        const data = await ObjetoFamiliaModel.ObjetoFamiliaNuevoModel(familia, color);
        res.send({ "message": " 👨‍👨‍👦‍👦 objetofamilia creada !!!", "ID": data.insertId });
    } catch (error) {
        res.send("Error ObjetoFamiliaNuevoController: " + error);
    };
};