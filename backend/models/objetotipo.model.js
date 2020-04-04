const connection = require('./db.model');

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