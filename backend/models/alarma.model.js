const connection = require('./db.model');

exports.AlarmaVerModel = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const resultado = await connection.query('SELECT * FROM alarma');
            resolve(resultado);
        } catch (error) {
            reject(error);
        }
    })
}

exports.AlarmaNuevoModel = (imagen, titulo, texto) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resultado = connection.query(`INSERT INTO alarma (imagen, titulo, texto) VALUES ("${imagen}", "${titulo}", "${texto}");`);
            resolve(resultado);
        } catch (error) {
            reject(error);
        };
    });
};

