const ConversacionModel = require('../models/conversacion.model');

exports.ConversacionVer = async (req, res) => {
    try {
        const data = await ConversacionModel.ConversacionVerModel();
        res.send(data);
    } catch (error) { res.send("Error ConversacionVerController: " + error) };
};

exports.ConversacionNuevo = async (req, res) => {
    const emisor = req.body.emisor;
    const receptor = req.body.receptor;
    const asunto = req.body.asunto;

    try {
        const data = await ConversacionModel.ConversacionNuevoModel(emisor, receptor, asunto);
        res.send({ "message": " 📪 conversacion creada !!!", "ID": data.insertId });

    } catch (error) {
        res.send("Error ConversacionNuevoController: " + error)
    }

}