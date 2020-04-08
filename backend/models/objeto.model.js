const connection = require('./db.model');

// CRRUD --> CREATE, READ, READ ID, UPLOAD, DELETE
// Crrud : CREATE --> crear un nuevo objetos
exports.ObjetoNuevoModel = (nombre, foto, descripcion, perdido, encontrado, fecha_perdida, latitud_perdida, longitud_perdida, fecha_encontrado, latitud_encontrado, longitud_encontrado) => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await connection.query(`INSERT INTO objeto (nombre, foto, descripcion, perdido, encontrado, fecha_perdida, latitud_perdida, longitud_perdida, fecha_encontrado, latitud_encontrado, longitud_encontrado) VALUE (
            "${nombre}",
            "${foto}",
            ${descripcion},
            ${perdido},
            ${encontrado},
            "${fecha_perdida}",
            ${latitud_perdida},
            ${longitud_perdida},
            "${fecha_encontrado}",
            ${latitud_encontrado},
            ${longitud_encontrado});`);
            resolve(data);
        } catch (error) {
            reject("Error ObjetoNuevoModel: " + error);
        }
    });
};
// cRrud : READ --> Leer o ver todos los objetos
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

// crRud : READ --> Leer o ver un objetos por su id
exports.ObjetoVerIdModel = (ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM objeto WHERE ID = ${ID};`);
            resolve(data);
        } catch (error) {
            reject("Error ObjetoVerIdModel: " + error)
        }
    });
};
// crrUd : UPLOAD --> actualizar objetos por su id
exports.ObjetoCambiarModel = (ID, nombre, foto, descripcion, perdido, encontrado, fecha_perdida, latitud_perdida, longitud_perdida, fecha_encontrado, latitud_encontrado, longitud_encontrado) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`UPDATE objeto SET nombre = "${nombre}",
            foto = "${foto}",
            descripcion = "${descripcion}",
            perdido = "${perdido}",
            encontrado = "${encontrado}",
            fecha_perdida = "${fecha_perdida}",
            latitud_perdida = ${latitud_perdida},
            longitud_perdida = ${longitud_perdida},
            fecha_encontrado = "${fecha_encontrado}",
            latitud_encontrado = ${latitud_encontrado},
            longitud_encontrado = ${longitud_encontrado}
            WHERE ID= ${ID}`);
            resolve(data);
        } catch (error) {
            reject("Error: ObjetCambiarModel: " + error);
        };
    });
};
// crruD : DELETED ID --> borrar  un objetos por su id

exports.ObjetoBorrarModel = (ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`DELETE FROM objeto WHERE ID = ${ID};`);
            resolve(data);
        } catch (error) {
            reject("Error ObjetoBorrarModel: " + error);
        }
    });
};