const connection = require('./db.model');

// CRRUD --> CREATE, READ, READ ID, UPLOAD, DELETE
// Crrud : CREATE --> crear un nuevo objetos
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

// cRrud : READ --> Leer o ver todos los objetos
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

// crRud : READ --> Leer o ver un objetos por su id
exports.MensajeVerIdModel = (ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM mensaje WHERE ID=${ID};`);
            resolve(data);
        } catch (error) {
            reject("Error MensajeVerIdModel: " + error);
        };
    });
}
// crrUd : UPLOAD --> actualizar objetos por su id
exports.MensajeCambiarModel = (ID, emisor, texto) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`UPDATE mensaje SET
            emisor = ${emisor},
            texto = "${texto}"
            WHERE ID = ${ID};`);
            resolve(data);
        } catch (error) {
            reject("Error MensajeCambiarModel: " + error);
        };
    });
}
// crruD : DELETED ID --> borrar  un objetos por su id
exports.MensajeBorrarModel = (ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`DELETE FROM mensaje WHERE ID = ${ID};`);
            resolve(data);
        } catch (error) {
            reject("Error MensajeBorrarModel: " + error);
        };
    });
}