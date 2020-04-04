const connection = require('./db.model');

exports.UsuarioVerModel = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM usuario;`);
            resolve(data);
        } catch (error) {
            reject("Error UsuarioVerModel: " + error);
        }
    })
}

exports.UsuarioNuevoModel = (alias, nombre, apellidos, edad, email, password, avatar) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`INSERT INTO usuario (alias, nombre, apellidos, edad, email, password, avatar)
            VALUE ("${alias}", "${nombre}", "${apellidos}", ${edad}, "${email}", "${password}", "${avatar}");`);
            resolve(data);
        } catch (error) {
            reject("Error UsuarioNuevoModel: " + error);
        }
    });
};