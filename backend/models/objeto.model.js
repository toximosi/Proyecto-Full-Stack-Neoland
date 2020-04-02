const connection = require('./db.model');

exports.ObjetoVerModel = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM objeto`);
            resolve(data);
        } catch (error) {
            reject("Error  ObjetoVerModel: " + error);
        }
    });
};

exports.ObjetoNuevoModel = (nombre, descripcion, estado) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`INSERT INTO objeto (nombre, descripcion, estado) VALUE ("${nombre}","${descripcion}","${estado}");`);
            resolve(data);
        } catch (error) {
            reject("Error ObjetoNuevoModel: " + error);
        }
    });
};