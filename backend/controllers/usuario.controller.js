const UsuarioModel = require('../models/usuario.model');
const MensajeModel = require('../models/mensaje.model');
const ConversacionModel = require('../models/conversacion.model')
const secret = require('../secret/secrets');
const { validationResult } = require('express-validator');// valida el body
const bcrypt = require('bcryptjs');//hashear contraseñas
const jwt = require('jsonwebtoken');//token para que se mantenga la sesión abierta del usuario
const moment = require('moment');

// CRRUD --> CREATE, READ, READ ID, UPLOAD, DELETE
// Crrud : CREATE --> crear un nuevo usuario
exports.UsuarioNuevo = async (req, res) => {
    //request, response --> solicitud, respuesta
    //try {
    const hash = await bcrypt.hash(req.body.password, 14);//hashear la contraseña para que tenga más seguridad}
    /* } catch (error) {
        res.send("Error en el hasha de la contraseña: " + error);
        return//ponemos el return para que no siga más
    } */
    const alias = req.body.alias;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const edad = req.body.edad;
    const email = req.body.email;
    const password = hash;//passwoord hasheada
    const foto = req.body.foto;
    //! la fecha la incluye directamente mysql

    const errors = validationResult(req);//Ejecuta las validaciones 

    const UsuarioDuplicado = await UsuarioModel.UsuarioVerModel();

    try {
        if (!errors.isEmpty()) {
            return res.status(422).json({ "error": "El body esta mal formado", "Explicacion": errors });
        } else {
            if (email !== secret.email_contacto) {
                if (UsuarioDuplicado[0].email !== email) {
                    const data = await UsuarioModel.UsuarioNuevoModel(alias, nombre, apellidos, edad, email, password, foto);

                    res.send({ "message": " 👨‍🎤 usuario creado !!!", "ID": data.insertId });

                } else {
                    res.send({ "message": " 👨‍🎤 usuario duplicado con el mismo email !!!", "email": email });
                };
            } else {
                const data = await UsuarioModel.UsuarioNuevoModel(alias, nombre, apellidos, edad, email, password, foto);
                res.send({ "message": " 👨‍🎤 usuario creado !!!", "ID": data.insertId });
            };
        };
    } catch (error) {
        res.send("Error UsuarioNuevoController:" + error);
    };
};
// cRrud : READ --> Leer o ver todos los usuarios
exports.UsuarioVer = async (req, res) => {
    /* console.log("try") */
    try {
        const data = await UsuarioModel.UsuarioVerModel();
        res.send(data);
    } catch (error) {
        /* console.log("catch") */
        res.send("Error UsuarioVerController:" + error);
    };
};
// crRud : READ ID --> Leer o ver un usuarios por su id
exports.UsuarioVerId = async (req, res) => {
    const ID = req.params.ID;//sacamos del path param el id del usuario
    try {
        const data = await UsuarioModel.UsuarioVerIdModel(ID);
        if (data.lenght === 0) {
            res.status(400).send({ "message": `Ese Usuari@ con id = ${ID} no existe 😱` });
        } else {
            res.send(data);
        };
    } catch (error) {
        res.send("Error UsuarioVerIdController:" + error);
    };

};
//crrUd : UPLOAD --> actualizar usuario
exports.UsuarioCambiar = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 14);//hashear la contraseña para que tenga más seguridad

    const ID = req.body.ID;
    const alias = req.body.alias;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const edad = req.body.edad;
    const email = req.body.email;
    const password = hash;//passwoord hasheada
    const foto = req.body.foto;

    const errors = validationResult(req)//Ejecuta las validaciones

    try {
        if (!errors.isEmpty()) {
            return res.status(422).json({ "error": "El body esta mal formado", "Explicacion": errors });
        } else {
            const data = await UsuarioModel.UsuarioCambiarModel(ID, alias, nombre, apellidos, edad, email, password, foto);

            if (data.affectedRows > 0) {
                res.send({ "message": `👨‍🎤 Usuari@ ${alias} con id = ${ID} modificado con éxito!!!!!, Oh YEa 😎 !!` });
            } else {
                res.status(404).send({ "error": `Ese 👨‍🎤 Usuari@ con id = ${ID} no existe 😱` })
            };
        };
    } catch (error) {
        res.send("Error UsuarioCambiarControler: " + error);
    };
};
//cambiar todo-----------
exports.UsuarioCambiar = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 14);//hashear la contraseña para que tenga más seguridad

    const ID = req.body.ID;
    const alias = req.body.alias;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const edad = req.body.edad;
    const email = req.body.email;
    const password = hash;//passwoord hasheada
    const foto = req.body.foto;

    const errors = validationResult(req)//Ejecuta las validaciones

    try {
        if (!errors.isEmpty()) {
            return res.status(422).json({ "error": "El body esta mal formado", "Explicacion": errors });
        } else {
            const data = await UsuarioModel.UsuarioCambiarModel(ID, alias, nombre, apellidos, edad, email, password, foto);

            if (data.affectedRows > 0) {
                res.send({ "message": `👨‍🎤 Usuari@ ${alias} con id = ${ID} modificado con éxito!!!!!, Oh YEa 😎 !!` });
            } else {
                res.status(404).send({ "error": `Ese 👨‍🎤 Usuari@ con id = ${ID} no existe 😱` })
            };
        };
    } catch (error) {
        res.send("Error UsuarioCambiarControler: " + error);
    };
};

// crruD : DELETED ID --> borrar  un usuarios por su id
exports.UsuarioBorrar = async (req, res) => {
    const ID = req.params.ID;//sacamos del path param el id del usuario
    try {
        const data = await UsuarioModel.UsuarioBorrarModel(ID);
        if (data.affectedRows > 0) {
            res.send({ "message": `👨‍🎤 Usuari@ con id ${ID} borrado ☠️!!` })
        } else {
            res.status(404).send({ "error": `Ese Usuari@ con id = ${ID} no existe 😱` })
        }
        //res.send(data)
    } catch (error) {
        res.send("Error UsuarioBorrarId:" + error);
    };
};

//Extras  -------------------------------------------------------------------------------
//Obtener converaciones del usuario
exports.UsuarioConversacion = async (req, res) => {
    try {
        const data = await UsuarioModel.UsuarioVerModel();

        for (let conversacion of data) {
            const conversaciones = await UsuarioModel.UsuarioConversacionModel(conversacion.ID);
            conversacion.conversacionesRecibida = conversaciones;
        };
        res.send(data);
    } catch (error) {
        res.send("Error UsuarioConversacion:" + error);
    };
};

exports.UsuarioCompleto = async (req, res) => {
    try {
        const data = await UsuarioModel.UsuarioVerModel();
        for (let d of data) {
            const objeto = await UsuarioModel.UsuarioObjetoModel(d.ID);
            for (let o of objeto) {
                if (o.perdido == 1) {
                    d.objetoPerdido = o;
                } else if (!d.objetoPerdido) {
                    d.objetoPerdido = [];
                }
                if (o.encontrado == 1) {
                    d.objetoEncontrado = o;
                } else if (!d.objetoEncontrado) {
                    d.objetoEncontrado = [];
                }
                const tipo = await UsuarioModel.UsuarioObjetoFamiliaTipoModel(o.fk_objetotipo);

                o.tipo = tipo;
                for (let t of tipo) {
                    const familia = await UsuarioModel.UsuarioObjetoFamiliaModel(t.fk_objetofamilia);
                    t.familia = familia
                };
            };
        };

        //conversaciones----------------------------------
        for (let d of data) {
            //conversaciones Recibidas
            const conRecibida = await UsuarioModel.UsuarioConversacionRecibidoModel(d.ID);
            d.conversacionesRecibida = conRecibida;

            for (let conv of conRecibida) {
                /* console.log("entro2"); */
                const emisornombre = await UsuarioModel.UsuarioVerIdModel(conv.emisor);
                conv.emisorNombre = emisornombre;
                const receptornombre = await UsuarioModel.UsuarioVerIdModel(conv.receptor);
                conv.receptorNombre = receptornombre;
                const mensajes = await ConversacionModel.ConversacionMensajeModel(conv.ID);
                for (let m of mensajes) {
                    conv.mensajes = mensajes;
                    const emisorNombre = await UsuarioModel.UsuarioVerIdModel(m.emisor);
                    m.emisorNombre = emisorNombre;
                }
            };

            //conversaciones Enviadas
            const conEnviada = await UsuarioModel.UsuarioConversacionEnvidaModel(d.ID);
            d.conversacionesEnviada = conEnviada;

            for (let conv of conEnviada) {
                /* console.log("entro2"); */
                const emisornombre = await UsuarioModel.UsuarioVerIdModel(conv.emisor);
                conv.emisorNombre = emisornombre;
                const receptornombre = await UsuarioModel.UsuarioVerIdModel(conv.receptor);
                conv.receptorNombre = receptornombre;
                const mensajes = await ConversacionModel.ConversacionMensajeModel(conv.ID);
                for (let m of mensajes) {
                    conv.mensajes = mensajes;
                    const emisorNombre = await UsuarioModel.UsuarioVerIdModel(m.emisor);
                    m.emisorNombre = emisorNombre;
                }
            };
        };
        res.send(data);
    } catch (error) {
        res.send("Error UsuarioCompleto:" + error);
    };
};

exports.UsuarioCompletoID = async (req, res) => {
    const ID = req.params.ID;//sacamos del path param el id del usuario

    try {
        const data = await UsuarioModel.UsuarioVerIdModel(ID);
        for (let d of data) {
            d.objetoPerdido = [];
            d.objetoEncontrado = [];
            const objeto = await UsuarioModel.UsuarioObjetoModel(d.ID);

            for (let o of objeto) {
                if (o.perdido == 1) {
                    d.objetoPerdido.push(o);
                }
                if (o.encontrado == 1) {
                    d.objetoEncontrado.push(o);
                }
                const tipo = await UsuarioModel.UsuarioObjetoFamiliaTipoModel(o.fk_objetotipo);

                o.tipo = tipo;
                for (let t of tipo) {
                    const familia = await UsuarioModel.UsuarioObjetoFamiliaModel(t.fk_objetofamilia);
                    t.familia = familia
                };
            };
        };
        //conversaciones----------------------------------
        for (let d of data) {
            //conversaciones Recibidas
            const conRecibida = await UsuarioModel.UsuarioConversacionRecibidoModel(d.ID);
            d.conversacionesRecibida = conRecibida;

            for (let conv of conRecibida) {
                /* console.log("entro2"); */
                const emisornombre = await UsuarioModel.UsuarioVerIdModel(conv.emisor);
                conv.emisorNombre = emisornombre;
                const receptornombre = await UsuarioModel.UsuarioVerIdModel(conv.receptor);
                conv.receptorNombre = receptornombre;
                const mensajes = await ConversacionModel.ConversacionMensajeModel(conv.ID);
                for (let m of mensajes) {
                    conv.mensajes = mensajes;
                    const emisorNombre = await UsuarioModel.UsuarioVerIdModel(m.emisor);
                    m.emisorNombre = emisorNombre;
                }
            };

            //conversaciones Enviadas
            const conEnviada = await UsuarioModel.UsuarioConversacionEnvidaModel(d.ID);
            d.conversacionesEnviada = conEnviada;

            for (let conv of conEnviada) {
                /* console.log("entro2"); */
                const emisornombre = await UsuarioModel.UsuarioVerIdModel(conv.emisor);
                conv.emisorNombre = emisornombre;
                const receptornombre = await UsuarioModel.UsuarioVerIdModel(conv.receptor);
                conv.receptorNombre = receptornombre;
                const mensajes = await ConversacionModel.ConversacionMensajeModel(conv.ID);
                for (let m of mensajes) {
                    conv.mensajes = mensajes;
                    const emisorNombre = await UsuarioModel.UsuarioVerIdModel(m.emisor);
                    m.emisorNombre = emisorNombre;
                }
            };
        };
        res.send(data);
    } catch (error) {
        res.send("Error UsuarioCompletoID:" + error);
    };
};

exports.UsuarioLogin = async (req, res) => {
    //const ID = req.body.ID;
    //  const alias = req.body.alias;
    const nombre = req.body.nombre;
    const email = req.body.email;
    const password = req.body.password;
    /* console.log(password); */
    const errors = validationResult(req);//Ejecuta las validaciones 

    try {
        if (!errors.isEmpty()) {
            return res.status(422).json({ "error": "El body esta mal formado", "Explicacion": errors });
        } else {
            const usuario = await UsuarioModel.UsuarioLoginModel(nombre, email);
            if (usuario.length > 0) {
                const coincidencia = bcrypt.compareSync(password, usuario[0].password);
                if (coincidencia) {
                    jwt.sign(
                        {
                            // crear Token con las siguientes características:
                            "usuarioID": usuario.ID,
                            "createdAt": moment().unix(),
                            "expiredAt": moment().add(15, 'days').unix()
                        },
                        secret.jwt_clave,
                        (error, token) => {
                            if (error) {
                                res.send("Error Token: " + error);
                            } else {
                                //incluimos cookie
                                /* res.cookie("cookie_lostthing", token);
                                res.cookie("userId", usuario[0].ID); */
                                /* .then(() => {
      const httpOptions = {
        headers: new HttpHeaders({
          'user-token': localStorage.getItem('token')
          // 'userId': localStorage.getItem('userId')
        })
      }
    })
    .catch(error => console.log(error)); */
                                /* res.cookie("user-token", token); */
                                //! incluir en el header???????????
                                // respuesta--> se hace en el front, pero no me funciona en el back
                                res.send({ "message": "👍 Ok, tu contraseña coincide - Estás autorizado", "user-token": token, "userId": usuario[0].ID });
                            };
                        });
                    //res.send({ "message": " 👍 Ok, tu contraseña coincide" })
                } else {
                    res.status(400).send({ "error": " 🙅 Las contraseñas no coinciden" })
                };

            } else {
                return res.json({ "error": " 👨‍🎤 El usuario nombre y email no coincide" });
            }
        };
    } catch (error) {
        res.send("Error UsuarioCambiarControler: " + error);
    };
};
// crear Token con las siguientes características:
/* const createToken = (user) => {
    const obj = {
        id: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(15, 'days').unix()
    }
    return jwt.sign(obj, secret.jwt_clave);
}*/
exports.UsuarioRegistro = async (req, res) => {
    //request, response --> solicitud, respuesta
    //try {
    const hash = await bcrypt.hash(req.body.password, 14);//hashear la contraseña para que tenga más seguridad}
    /* } catch (error) {
        res.send("Error en el hasha de la contraseña: " + error);
        return//ponemos el return para que no siga más
    } */
    const alias = req.body.alias;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const edad = req.body.edad;
    const email = req.body.email;
    const password = hash;//passwoord hasheada
    const foto = req.body.foto;
    //! la fecha la incluye directamente mysql

    const errors = validationResult(req);//Ejecuta las validaciones 

    const UsuarioDuplicado = await UsuarioModel.UsuarioVerModel();

    try {
        if (!errors.isEmpty()) {
            return res.status(422).json({ "error": "El body esta mal formado", "Explicacion": errors });
        } else {

            if (email !== secret.email_contacto || UsuarioDuplicado[0].email !== email) {
                res.send({ "message": " 👨‍🎤 usuario duplicado con el mismo email !!!", "email": email });
            } else {
                const data = await UsuarioModel.UsuarioNuevoModel(alias, nombre, apellidos, edad, email, password, foto);
                jwt.sign(
                    {
                        // crear Token con las siguientes características:
                        "usuarioID": data.insertId,
                        "createdAt": moment().unix(),
                        "expiredAt": moment().add(15, 'days').unix()
                    },
                    secret.jwt_clave,
                    (error, token) => {
                        if (error) {
                            res.send("Error Token: " + error);
                        } else {
                            res.send({ "message": " 👨‍🎤 usuario creado !!!", "user-token": token, "userId": data.insertId });
                        };
                    }
                );
            };
        };
    } catch (error) {
        res.send("Error UsuarioNuevoController:" + error);
    };
};