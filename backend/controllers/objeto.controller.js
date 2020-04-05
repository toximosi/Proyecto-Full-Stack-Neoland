const ObjetoModel = require('../models/objeto.model');
// Crrud : CREATE --> crear un nuevo objetos
exports.ObjetoNuevo = async (req, res) => {

    const nombre = req.body.nombre;
    const foto = req.body.foto;
    const descripcion = req.body.descripcion;
    const perdido = req.body.perdido;
    const encontrado = req.body.encontrado;
    const fecha_perdida = req.body.fecha_perdida;
    const latitud_perdida = req.body.latitud_perdida;
    const longitud_perdida = req.body.longitud_perdida;
    const fecha_encontrado = req.body.fecha_encontrado;
    const latitud_encontrado = req.body.latitud_encontrado;
    const longitud_encontrado = req.body.longitud_encontrado;

    try {
        const data = await ObjetoModel.ObjetoNuevoModel(nombre, foto, descripcion, perdido, encontrado, fecha_perdida, latitud_perdida, longitud_perdida, fecha_encontrado, latitud_encontrado, longitud_encontrado);
        res.send({ "message": " 😎 Objeto creado !!!", "ID": data.insertId });
    } catch (error) {
        res.send("Error ObjetoNuevoModel; " + error);
    };
};
// cRrud : READ --> Leer o ver todos los objetos
exports.ObjetoVer = async (req, res) => {
    try {
        const data = await ObjetoModel.ObjetoVerModel();
        res.send(data);
    } catch (error) {
        res.send("Error ObjetoVerModel: " + error);
    };
};

// crRud : READ --> Leer o ver un objetos por su id
exports.ObjetoVerId = async (req, res) => {
    const ID = req.params.ID;

    try {
        const data = await ObjetoModel.ObjetoVerIdModel(ID);
        res.send(data);
    } catch (error) {
        res.send("Error ObjetoVerIdController:" + error);
    };
};

// crrUd : UPLOAD --> actualizar objetos por su id
exports.ObjetoCambiar = async (req, res) => {
    const ID = req.body.ID;
    const nombre = req.body.nombre;
    const foto = req.body.foto;
    const descripcion = req.body.descripcion;
    const perdido = req.body.perdido;
    const encontrado = req.body.encontrado;
    const fecha_perdida = req.body.fecha_perdida;
    const latitud_perdida = req.body.latitud_perdida;
    const longitud_perdida = req.body.longitud_perdida;
    const fecha_encontrado = req.body.fecha_encontrado;
    const latitud_encontrado = req.body.latitud_encontrado;
    const longitud_encontrado = req.body.longitud_encontrado;

    try {
        await ObjetoModel.ObjetoCambiarModel(ID, nombre, foto, descripcion, perdido, encontrado, fecha_perdida, latitud_perdida, longitud_perdida, fecha_encontrado, latitud_encontrado, longitud_encontrado);
        res.send({ "message": `😎 Objeto ${nombre} con id = ${ID} modificado con éxito!!!!!, Oh YEa 😎 !!` });
    } catch (error) {
        res.send("Error ObjetoCambiarController: " + error);
    };
};

// crruD : DELETED ID --> borrar  un objetos por su id
//!!FALLA : Error ObjetBorrarController: ReferenceError: result is not defined
exports.ObjetoBorrar = async (req, res) => {
    const ID = req.params.ID;

    try {
        const data = await ObjetoModel.ObjetoBorrarModel(ID);
        if (result.affectedRows > 0) {
            res.send({ "message": `👨‍🎤 Objeto con id ${ID} borrado ☠️!!` });
        } else {
            res.status(404).send({ "error": `Ese Objeto con id = ${ID} no exinste 😱` });
        };
        res.send(data);
    } catch (error) {
        res.send("Error ObjetBorrarController: " + error);
    };
};