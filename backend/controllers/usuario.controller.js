const UsuarioModel = require('../models/usuario.model');
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

    try {
        const data = UsuarioModel.UsuarioNuevoModel(alias, nombre, apellidos, edad, email, password, avatar);
        res.send({ "message": " 👨‍🎤 usuario creado !!!", "ID": data.insertId });

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
            res.status(400).send({ "message": `Ese Usuari@ con id = ${ID} no exinste 😱` });
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

    try {
        //const data =
        await UsuarioModel.UsuarioCambiarModel(ID, alias, nombre, apellidos, edad, email, password, avatar);
        res.send({ "message": `👨‍🎤 Usuari@ ${alias} con id = ${ID} modificado con éxito!!!!!, Oh YEa 😎 !!` });

    } catch (error) {
        res.send("Error UsuarioCambiarControler: " + error);
    }
};

// crruD : DELETED ID --> borrar  un usuarios por su id
exports.UsuarioBorrar = async (req, res) => {
    const ID = req.params.ID;//sacamos del path param el id del usuario
    try {
        const data = await UsuarioModel.UsuarioBorrarModel(ID);
        if (result.affectedRows > 0) {
            res.send({ "message": `👨‍🎤 Usuari@ con id ${ID} borrado ☠️!!` })
        } else {
            res.status(404).send({ "error": `Ese Usuari@ con id = ${ID} no exinste 😱` })
        }
        res.send(data);
    } catch (error) {
        res.send("Error UsuarioBorrarId:" + error);
    };
};