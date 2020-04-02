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

exports.UsuarioNuevoModel = (nombre, apellidos, email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`INSERT INTO usuario (nombre, apellidos, email) VALUE ("${nombre}", "${apellidos}", "${email}");`);
            resolve(data);
        } catch (error) {
            reject("Error UsuarioNuevoModel: " + error);
        }
    });
};

