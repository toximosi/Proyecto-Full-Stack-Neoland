const ObjetoFamiliaModel = require('../models/objetofamilia.model');

// Crrud : CREATE --> crear un nuevo objetoFamilia
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
// cRrud : READ --> Leer o ver todos los objetoFamilia
exports.ObjetoFamiliaVer = async (req, res) => {
    try {
        const data = await ObjetoFamiliaModel.ObjetoFamiliaVerModel();
        res.send(data);
    } catch (error) {
        res.send("Error ObjetoFamiliaVerController: " + error);
    };
};

// crRud : READ --> Leer o ver un objetoFamilia por su id
exports.ObjetoFamiliaVerId = async (req, res) => {
    const ID = req.params.ID;

    try {
        const data = await ObjetoFamiliaModel.ObjetoFamiliaVerIdModel(ID);
        res.send(data);
    } catch (error) {
        res.send("Error ObjetoFamiliaVerIdController" + error);
    };
};

// crrUd : UPLOAD --> actualizar objetoFamilia por su id
exports.ObjetoFamiliaCambiar = async (req, res) => {
    const ID = req.body.ID;
    const familia = req.body.familia;
    const color = req.body.color;

    try {
        await ObjetoFamiliaModel.ObjetoFamiliaCambiarModel(ID, familia, color);
        res.send({
            "message": `👨‍👨‍👦‍👦 objetodamilia con id = ${ID} modificado con éxito!!!!!, Oh YEa 😎 !!`
        });
    } catch (error) {
        res.send("Error ObjetoFamiliaCambiar: " + error);
    };
};
// crruD : DELETED ID --> borrar  un objetoFamilia por su id
exports.ObjetoFamiliaBorrar = async (req, res) => {
    const ID = req.params.ID;

    try {
        await ObjetoFamiliaModel.ObjetoFamiliaBorrarModel(ID);
        res.send({ "message": `👨‍👨‍👦‍👦 objetofamilia con id ${ID} borrado ☠️!!` })
    } catch (error) {
        res.send("Error ObjetoFamiliaBrorrar: " + error);
    };
};