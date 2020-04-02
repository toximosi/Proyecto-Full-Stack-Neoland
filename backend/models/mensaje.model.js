const connection = require('./db.model');

exports.MensajeVerModel = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM mensaje;`);
            resolve(data);
        } catch (error) {
            reject("Error MensajeVerModel: " + error);
        };
    });
};

exports.MensajeNuevoModel = (emisor, receptor, mensaje, respuesta) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`INSERT INTO mensaje (emisor, receptor, asunto, mensaje, respuesta) VALUE ("${emisor}", "${receptor}","${asunto}", "${mensaje}", "${respuesta}");`)
            resolve(data);
        } catch (error) {
            reject("Error MensajeNuevoModel: " + error);
        };
    });
};