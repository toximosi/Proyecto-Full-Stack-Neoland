//! COMUNICACION con la tabla de usuario de la bd.
const connection = require('./db.model');

exports.getAllUsuarios = async () => {
    return new Promise((resolve, reject) => {
        try {
            const data = connection.query("SELECT * FROM usuario");
            resolve(data);
        } catch (error) {
            resolve(error);
        }
    })
}