const connection = require('../models/db.model');

exports.ConversacionVerModel = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM conversacion`);
            resolve(data);
        } catch (error) {
            reject("Error ConversacionVerModel: " + error);
        };
    });
};

exports.ConversacionNuevoModel = (emisor, receptor, asunto) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`INSERT INTO conversacion (emisor, receptor, asunto) VALUE (${emisor}, ${receptor}, "${asunto}")`);
            resolve(data);
        } catch (error) {
            reject("ConversacionNuevoModel" + error);
        }
    });
};