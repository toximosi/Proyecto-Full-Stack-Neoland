const connection = require('../models/db.model');

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