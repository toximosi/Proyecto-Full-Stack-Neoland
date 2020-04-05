const ConversacionModel = require('../models/conversacion.model');

// Crrud : CREATE --> crear un nuevo conversacion
exports.ConversacionNuevo = async (req, res) => {
    const emisor = req.body.emisor;
    const receptor = req.body.receptor;
    const asunto = req.body.asunto;

    try {
        const data = await ConversacionModel.ConversacionNuevoModel(emisor, receptor, asunto);
        res.send({ "message": " 📪 conversacion creada !!!", "ID": data.insertId });
    } catch (error) {
        res.send("Error ConversacionNuevoController: " + error)
    };
};

// cRrud : READ --> Leer o ver todos los conversacion
exports.ConversacionVer = async (req, res) => {
    try {
        const data = await ConversacionModel.ConversacionVerModel();
        res.send(data);
    } catch (error) { res.send("Error ConversacionVerController: " + error) };
};

// crRud : READ --> Leer o ver un conversacion por su id
exports.ConversacionVerId = async (req, res) => {
    const ID = req.params.ID;

    try {
        const data = await ConversacionModel.ConversacionVerIdModel(ID);
        res.send(data);
    } catch (error) {
        res.send("Error ConversacionVerId: " + error);
    }
};
// crrUd : UPLOAD --> actualizar conversacion por su id
exports.ConversacionCambiar = async (req, res) => {
    const ID = req.body.ID;
    const emisor = req.body.emisor;
    const receptor = req.body.receptor;
    const asunto = req.body.asunto;

    try {
        await ConversacionModel.ConversacionCambiarModel(ID, emisor, receptor, asunto);
        res.send({ "message": ` 📪 conversacion ${asunto} con id = ${ID} modificado con éxito!!!!!, Oh YEa 😎 !!;` });
    } catch (error) {
        res.send("Error ConversacionCambiarController: " + error);
    };
};
// crruD : DELETED ID --> borrar  un conversacion por su id
exports.ConversacionBorrar = async (req, res) => {
    const ID = req.params.ID;

    try {
        const data = await ConversacionModel.ConversacionBorrarModel(ID);
        res.send({ "message": `📪 conversacion con id ${ID} borrado ☠️!!` });
    } catch (error) {
        res.send("Error X: " + error);
    };
};