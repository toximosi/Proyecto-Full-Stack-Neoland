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

exports.MensajeNuevoModel = (emisor, texto) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`INSERT INTO mensaje (emisor, texto) VALUE ("${emisor}", "${texto}");`)
            resolve(data);
        } catch (error) {
            reject("Error MensajeNuevoModel: " + error);
        };
    });
};