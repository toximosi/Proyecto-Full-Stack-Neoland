// datos de la base de datos
require('dotenv').config();

module.exports = {
    'host': process.env.DB_HOST,
    'user': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_DATABASE,
    'port': process.env.DB_PORT,
    'connectTimeout': 50000,
    'acquireTimeout': 50000,
    'jwt_clave': process.env.SECRET_KEY,
    'email_contacto': process.env.EMAIL
};

/* PORT = 3000
DB_HOST="localhost"
DB_USER = "root"
DB_PASSWORD = "root"
DB_DATABASE = "lostthing"
DB_PORT = "8889"
SECRET_KEY = "CLAVE_MEGASECRETA"
EMAIL = "kosaskosillas@gmail.com" */

/* PORT = 3306
DB_HOST = "mysql-5703.dinaserver.com"
DB_USER = "toxim_admin"
DB_PASSWORD = "saludotoxico77"
DB_DATABASE = "lostthing"
DB_PORT = "3306"
SECRET_KEY = "CLAVE_MEGASECRETA"
EMAIL = "kosaskosillas@gmail.com" */