const connection = require('./db.model');
// CRRUD --> CREATE, READ, READ ID, UPLOAD, DELETE

// Crrud : CREATE --> crear un nuevo usuario
exports.UsuarioNuevoModel = (alias, nombre, apellidos, edad, email, password, avatar) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`INSERT INTO usuario (alias, nombre, apellidos, edad, email, password, avatar)
            VALUE ("${alias}",
            "${nombre}",
            "${apellidos}",
            ${edad},
            "${email}",
            "${password}", 
            "${avatar}");`);
            resolve(data);
        } catch (error) {
            reject("Error UsuarioNuevoModel: " + error);
        }
    });
};
// cRrud : READ --> Leer o ver todos los usuarios
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

// crRud : READ --> Leer o ver un usuarios por su id
exports.UsuarioVerIdModel = (ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM usuario WHERE ID = ${ID};`);
            resolve(data);
        } catch (error) {
            reject("Error UsuarioVerIdModel: " + error);
        }
    })
}

// crrUd : UPLOAD --> actualizar usuario por su id
exports.UsuarioCambiarModel = (ID, alias, nombre, apellidos, edad, email, password, avatar) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`UPDATE usuario SET
            alias="${alias}",
            nombre= "${nombre}",
            apellidos="${apellidos}",
            edad= ${edad},
            email="${email}",
            password="${password}",
            avatar= "${avatar}"
            WHERE ID = ${ID};`);
            resolve(data);
        } catch (error) {
            reject("Error UsuarioCambiarModel: " + error);
        }
    });
}

// crruD : DELETED ID --> borrar  un usuarios por su id
exports.UsuarioBorrarModel = (ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`DELETE FROM usuario WHERE ID = ${ID}`);
            resolve(data);
        } catch (error) {
            reject("Error UsuarioBorrarModel: " + error);
        }
    });
}

