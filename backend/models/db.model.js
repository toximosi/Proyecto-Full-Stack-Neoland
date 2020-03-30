
//! Sirve para gesionar la conexión con la base de datos.
//libreria para manejar bd de mysql.
const mysql = require('mysql');

//wrapper para pasar de callback a promesa, el npm mysql trabaja con callbacks
class Database {
    constructor(config) {
        //Usamos CreatePool, para hacer varias conexiones
        this.connection = mysql.createPool(config);
    };
    //usamos un query para abrir conexiones
    query(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (error, result) => {
                if (error) {
                    //console.log(error);
                    return reject(error);
                } else {
                    resolve(result);
                };
            });
        });
    };
    //para cerrar conexiones
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((error) => {
                if (error) {
                    return reject(error);
                } else {
                    resolve();
                };
            });
        });
    };
}
const connection = new Database({
    //se pasa la confuración de la bd
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'lostthing',
    'port': 8889,
    'connectTimeout': 10000
});

// ! EXPORTAR LA CONEXION A LA BASE DE DATOS
module.exports = connection;