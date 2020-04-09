const UsuarioModel = require('../models/usuario.model');
const { check, validationResult } = require('express-validator');// valida el body

// CRRUD --> CREATE, READ, READ ID, UPLOAD, DELETE
// Crrud : CREATE --> crear un nuevo usuario
exports.UsuarioNuevo = async (req, res) => {
    //request, response --> solicitud, respuesta
    const alias = req.body.alias;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const edad = req.body.edad;
    const email = req.body.email;
    const password = req.body.password;
    const avatar = req.body.avatar;
    //! la fecha la incluye directamente mysql

    const errors = validationResult(req);//Ejecuta las validaciones 
    console.log(req.body);

    try {
        if (!errors.isEmpty()) {
            return res.status(422).json({ "error": "El body esta mal formado", "Explicacion": errors });
        } else {
            const data = await UsuarioModel.UsuarioNuevoModel(alias, nombre, apellidos, edad, email, password, avatar);

            res.send({ "message": " 👨‍🎤 usuario creado !!!", "ID": data.insertId });
        }
    } catch (error) {
        res.send("Error UsuarioNuevoController:" + error);
    };
};
// cRrud : READ --> Leer o ver todos los usuarios
exports.UsuarioVer = async (req, res) => {
    try {
        const data = await UsuarioModel.UsuarioVerModel();
        res.send(data);
    } catch (error) {
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

    const ID = req.body.ID;
    const alias = req.body.alias;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const edad = req.body.edad;
    const email = req.body.email;
    const password = req.body.password;
    const avatar = req.body.avatar;

    const errors = validationResult(req)//Ejecuta las validaciones

    try {
        if (!errors.isEmpty()) {
            return res.status(422).json({ "error": "El body esta mal formado", "Explicacion": errors });
        } else {
            const data = await UsuarioModel.UsuarioCambiarModel(ID, alias, nombre, apellidos, edad, email, password, avatar);

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

//Conversacion con sus mensajes
/* exports.UsuarioConversacionMensaje = async (req, res) => {
    try {
        const data = await UsuarioModel.UsuarioVerModel();

        for (let conversacion of data) {
            const conversaciones = await UsuarioModel.UsuarioConversacionModel(conversacion.ID);
            conversacion.conversacionesRecibida = conversaciones;
            for (let mensaje of conversaciones) {
                const mensajes = await UsuarioModel.UsuarioConversacionMensajeModel(mensaje.ID);
                mensaje.mensajes = mensajes;
            };
        };
        res.send(data);
    } catch (error) {
        res.send("Error UsuarioConversacionMensaje:" + error);
    };
}; */

// diferenciar los mensajes entre emisor y receptor:

/* exports.UsuarioConversacion = async (req, res) => {
    try {
        const data = await UsuarioModel.UsuarioVerModel();
        for (let conversacion of data) {
            const conversaciones = await UsuarioModel.UsuarioConversacionModel(conversacion.ID);
            conversacion.conversacionesRecibida = conversaciones;
            const conversacionesEnv = await UsuarioModel.UsuarioConversacionEnvidaModel(conversacion.ID);
            conversacion.conversacionesEnviada = conversacionesEnv;
        };
        res.send(data);
    } catch (error) {
        res.send("Error UsuarioConversacion:" + error);
    };
}; */


exports.UsuarioConversacionMensaje = async (req, res) => {
    try {
        const data = await UsuarioModel.UsuarioVerModel();

        for (let objeto of data) {
            const objetos = await UsuarioModel.UsuarioObjetoModel(objeto.ID);
            objeto.objetos = objetos;
            /*if (objetos.perdido == 1) {
                objeto.objetosPerdido = objetos;
            }
                        if (objetos[encontrado] == 1) {
                            objetos.objetosEncontado = objeto;
                        } */
            for (let f of objetos) {
                const familia = await UsuarioModel.UsuarioObjetoFamiliaModel(f.ID);
                f.familia = familia;
                for (let t of familia) {
                    const tipo = await UsuarioModel.UsuarioObjetoFamiliaTipoModel(t.ID);
                    t.tipo = tipo;
                };
            };
        };

        for (let conversacion of data) {
            const conversaciones = await UsuarioModel.UsuarioConversacionModel(conversacion.ID);
            conversacion.conversacionesRecibida = conversaciones;
            for (let mensaje of conversaciones) {
                const mensajes = await UsuarioModel.UsuarioConversacionMensajeModel(mensaje.ID);
                mensaje.mensajes = mensajes;
            };

            const conversacionesEnv = await UsuarioModel.UsuarioConversacionEnvidaModel(conversacion.ID);
            conversacion.conversacionesEnviada = conversacionesEnv;
            for (let mensaje of conversacionesEnv) {
                const mensajes = await UsuarioModel.UsuarioConversacionMensajeModel(mensaje.ID);
                mensaje.mensajes = mensajes;
            };


        };
        res.send(data);
    } catch (error) {
        res.send("Error UsuarioConversacionMensaje:" + error);
    };
};