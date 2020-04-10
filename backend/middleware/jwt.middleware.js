const jwt = require('jsonwebtoken');
const secret = require('../secret/secrets');

/* exports.checkToken = (req, res, next) => {
    if (req.path !== "/login" && req.path !== "/usuario/nuevo") {
        if (req.cookies["cookie_lostthing"] !== undefined) {
            jwt.verify(
                req.cookies["cookie_lostthing"],
                secret.jwt_clave,
                (error, confirmacion) => {
                    if (error) {
                        res.status(401).send({ "error": "🙅 Token no válido" });
                    } else if (confirmacion) {
                        next();
                    } else {
                        res.status(401).send({ "error": "🙅 Token no válido" });
                    };
                });
        } else {
            res.statue(401).send({ "menssage": "🙅 No estas autentificado", "loginURL": "/login" });
        };
    } else {
        next();
    };
};  */