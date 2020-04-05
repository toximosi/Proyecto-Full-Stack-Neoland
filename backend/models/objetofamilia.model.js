const connection = require('../models/db.model');
// Crrud : CREATE --> crear un nuevo objetoFamilia
exports.ObjetoFamiliaNuevoModel = (familia, color) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = connection.query(`INSERT INTO objetofamilia(familia, color) VALUE("${familia}", "${color}");`);
            resolve(data);
        } catch (error) {
            reject("Error ObjetoFamiliaNuevoModel: " + error);
        };
    });
};

// cRrud : READ --> Leer o ver todos los objetoFamilia
exports.ObjetoFamiliaVerModel = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = connection.query(`SELECT * FROM objetofamilia`);
            resolve(data);
        } catch (error) {
            reject("Error ObjetoFamiliaVerModel: " + error)
        };
    });
};

// crRud : READ --> Leer o ver un objetoFamilia por su id
exports.ObjetoFamiliaVerIdModel = (ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = connection.query(`SELECT * FROM objetofamilia WHERE ID = ${ID};`);
            resolve(data);
        } catch (error) {
            reject("Error ObjetoFamiliaVerIdModel" + error);
        }
    });
}

// crrUd : UPLOAD --> actualizar objetoFamilia por su id
exports.ObjetoFamiliaCambiarModel = (ID, familia, color) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`UPDATE objetofamilia SET familia="${familia}", color= "${color}" WHERE ID = "${ID}"`);
            resolve(data);
        } catch (error) {
            reject("Error ObjetoFamiliaCambiarModel: " + error);
        };
    });
};

// crruD : DELETED ID --> borrar  un objetoFamilia por su id
exports.ObjetoFamiliaBorrarModel = (ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`DELETE FROM objetofamilia WHERE ID=${ID};`);
            resolve(data);
        } catch (error) {
            reject("Error ObjetoFamiliaBorrarModel: " + error);
        };
    });
};