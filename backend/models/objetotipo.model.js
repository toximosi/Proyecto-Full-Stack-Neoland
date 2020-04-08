const connection = require('./db.model');

// CRRUD --> CREATE, READ, READ ID, UPLOAD, DELETE
// Crrud : CREATE --> crear un nuevo objetotipo
exports.ObjetoTipoNuevoModel = (tipo, icono) => {

    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`INSERT INTO objetotipo (tipo, icono) VALUE("${tipo}", "${icono}");`);
            resolve(data);
        } catch (error) {
            reject("Error ObjetoTipoNuevoModel: " + error);
        }
    })
};

// cRrud : READ --> Leer o ver todos los objetotipo
exports.ObjetoTipoVerModel = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM objetotipo;`);
            resolve(data);
        } catch (error) {
            reject("Error ObjetoTipoVerModel: " + error)
        }
    });
};

// crRud : READ --> Leer o ver un objetotipo por su id
exports.ObjetoTipoVerIdModel = (ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM objetotipo WHERE ID =${ID};`);
            resolve(data);
        } catch (error) {
            reject("Error ObjetoTipoVerIdModel: " + error);
        };
    });
};

// crrUd : UPLOAD --> actualizar objetotipo por su id
exports.ObjetoTipoCambiarModel = (ID, tipo, icono) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`UPDATE objetotipo SET tipo = "${tipo}", icono = "${icono}" WHERE ID=${ID};`);
            resolve(data);
        } catch (error) { reject("Error ObjetoTipoCambiarModel: " + error) };
    });
}

// crruD : DELETED ID --> borrar  un objetotipo por su id
exports.ObjetoTipoBorrarModel = (ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`DELETE FROM objetotipo WHERE ID= ${ID};`);
            resolve(data);
        } catch (error) {
            reject("Error ObjetoTipoBorrarModel: " + error);
        };
    });
};