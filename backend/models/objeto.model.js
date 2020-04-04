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

exports.ObjetoNuevoModel = (nombre, foto, descripcion, perdido, encontrado, fecha_perdida, latitud_perdida, longitud_perdida, fecha_encontrado, latitud_encontrado, longitud_encontrado) => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await connection.query(`INSERT INTO objeto (nombre, foto, descripcion, perdido, encontrado, fecha_perdida, latitud_perdida, longitud_perdida, fecha_encontrado, latitud_encontrado, longitud_encontrado) VALUE ("${nombre}", "${foto}", ${descripcion}, ${perdido}, ${encontrado},"${fecha_perdida}", ${latitud_perdida}, ${longitud_perdida}, "${fecha_encontrado}", ${latitud_encontrado}, ${longitud_encontrado});`);
            resolve(data);
        } catch (error) {
            reject("Error ObjetoNuevoModel: " + error);
        }
    });
};