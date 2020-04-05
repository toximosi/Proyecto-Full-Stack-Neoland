const AlarmaModel = require('../models/alarma.model');

// Crrud : CREATE --> crear un nuevo objetos
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

// cRrud : READ --> Leer o ver todos los objetos
exports.AlarmaVer = async (req, res) => {
    try {
        const data = await AlarmaModel.AlarmaVerModel();
        res.send(data);
    } catch (error) {
        res.send("Error AlarmaVerModel: " + error);
    };
};

// crRud : READ --> Leer o ver un objetos por su id
exports.AlarmaVerId = async (req, res) => {
    const ID = req.params.ID;

    try {
        const data = await AlarmaModel.AlarmaVerIdModel(ID);
        res.send(data);
    } catch (error) {
        res.send("Error AlarmaVerId: " + error);
    }
}

// crrUd : UPLOAD --> actualizar objetos por su id
exports.AlarmaCambiar = async (req, res) => {
    const ID = req.body.ID;
    const imagen = req.body.imagen;
    const titulo = req.body.titulo;
    const texto = req.body.texto;

    try {
        await AlarmaModel.AlarmaCambiarModel(ID, imagen, titulo, texto);
        res.send({ "message": `🐨 Alarma ${titulo} con id = ${ID} modificado con éxito!!!!!, Oh YEa 😎 !!` });
    } catch (error) {
        res.send("Error AlarmaCambiarController: " + error);
    }
}
// crruD : DELETED ID --> borrar  un objetos por su id
exports.AlarmaBorrar = async (req, res) => {
    const ID = req.params.ID;

    try {
        await AlarmaModel.AlarmaBorrarModel(ID);
        res.send({ "message": `🐨 Alarma con id ${ID} borrado ☠️!!` });
    } catch (error) {
        res.send("Error AlarmaBorrarController: " + error);
    }
}
