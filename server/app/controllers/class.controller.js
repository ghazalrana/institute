const bcrypt = require("bcryptjs");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getClass = async (req, res) => {
    const pgClient = await db.getClient();
    await pgClient.query('BEGIN')

    try {


        const classResponse = await pgClient.query(`SELECT c.title, c.url, c.type, c.length, c.module_id, c.highlight, cc.completion_dt FROM class c left join client_class cc on cc.class_id = c.id
        WHERE c.id = '${req.params.id}' and status = 'A'`);


        if (!classResponse.rowCount) {
            errorMessage.message = "Could not fetch User";
            res.status(status.error).send(errorMessage);
        }

        if (classResponse.rowCount) {
            await pgClient.query('COMMIT')
            res.status(status.success).send(classResponse.rows);
        }
    } catch (err) {
        // handle the error
        await pgClient.query('ROLLBACK')
        console.log('err:', err)
        errorMessage.message = err.message;
        res.status(status.error).send(errorMessage);
    } finally {
        pgClient.release()
    }
};

const updateClassCompletion = async (req, res) => {

    const { clientId, classId, classUpdate } = req.body;

    const pgClient = await db.getClient();
    await pgClient.query('BEGIN')

    try {

        let updateClassResponse = null;

        if (classUpdate) {
            updateClassResponse = await pgClient.query(`UPDATE client_class SET completion_dt=now() WHERE client_id = ${clientId} AND class_id = ${classId}`);
        } else {
            updateClassResponse = await pgClient.query(`UPDATE client_class SET completion_dt= ${null} WHERE client_id = ${clientId} AND class_id = ${classId}`);
        }


        if (!updateClassResponse.rowCount) {
            insertClassResponse = await pgClient.query(`INSERT INTO client_class VALUES (${clientId}, ${classId}, now())`);

        }


        await pgClient.query('COMMIT')
        res.status(status.success).send(updateClassResponse.rows);

    } catch (err) {
        // handle the error
        await pgClient.query('ROLLBACK')
        console.log('err:', err)
        errorMessage.message = err.message;
        res.status(status.error).send(errorMessage);
    } finally {
        pgClient.release()
    }

};


const ClassFunction = {
    getClass,
    updateClassCompletion,
};

module.exports = ClassFunction;
