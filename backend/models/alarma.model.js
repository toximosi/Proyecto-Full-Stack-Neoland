const connection = require('./db.model');

// Crrud : CREATE --> crear un nuevo objetos
exports.AlarmaNuevoModel = (imagen, titulo, texto) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = connection.query(`INSERT INTO alarma (imagen, titulo, texto) VALUES ("${imagen}", "${titulo}", "${texto}");`);
            resolve(data);
        } catch (error) {
            reject(error);
        };
    });
};

// cRrud : READ --> Leer o ver todos los objetos
exports.AlarmaVerModel = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const resultado = await connection.query('SELECT * FROM alarma');
            resolve(resultado);
        } catch (error) {
            reject(error);
        };
    });
};

// crRud : READ --> Leer o ver un objetos por su id
exports.AlarmaVerIdModel = (ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM alarma WHERE ID = ${ID};`);
            resolve(data);
        } catch (error) {
            reject("Error AlarmaVerIdModel: " + error);
        };
    });
}

// crrUd : UPLOAD --> actualizar objetos por su id
exports.AlarmaCambiarModel = (ID, imagen, titulo, texto) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`UPDATE alarma SET
            imagen = "${imagen}",
            titulo = "${titulo}",
            texto = "${texto}"
            WHERE ID = ${ID};`);
            resolve(data);
        } catch (error) {
            reject("Error AlarmaCambiarModel: " + error);
        };
    });
};

// crruD : DELETED ID --> borrar  un objetos por su id
exports.AlarmaBorrarModel = (ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`DELETE FROM alarma WHERE ID=${ID};`);
            resolve(data);
        } catch (error) {
            reject("Error AlarmaBorrarModel: " + error);
        };
    });
};