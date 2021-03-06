const bcrypt = require("bcryptjs");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAccountUser = async (req, res) => {
    const pgClient = await db.getClient();
    await pgClient.query('BEGIN')

    try {

        const accountUserResponse = await pgClient.query(`SELECT firstname, lastname, email, license FROM client WHERE id = $1 `);


        if (!accountUserResponse.rowCount) {
            errorMessage.message = "Could not fetch User";
            res.status(status.notfound).send(errorMessage);
        }

        if (accountUserResponse.rowCount) {
            await pgClient.query('COMMIT')
            res.status(status.success).send(accountUserResponse.rows[0]);
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

const updateAccountUser = async (req, res) => {
    const pgClient = await db.getClient();
    await pgClient.query('BEGIN')

    const { firstname, lastname, email, license, password, id } = req.body;
    //user.password = bcrypt.hashSync(user.password, 8);
    try {
        const updateResponse = await pgClient.query(`UPDATE client SET firstname = '${firstname}', lastname = '${lastname}' , license = '${license}',
         email = '${email}', password = '${bcrypt.hashSync(password, 8)}' WHERE id = '${id}'`);

        if (!updateResponse.rowCount) {
            errorMessage.message = "Could not udpate User";
            res.status(status.error).send(errorMessage);
        }

        if (updateResponse.rowCount) {
            const successMessage = "Successfully Updated"
            await pgClient.query('COMMIT')
            res.status(status.success).send(successMessage);
        }

        await pgClient.query('COMMIT')
        res.status(status.success).send(successMessage);

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

const deleteAccountUser = async (req, res) => {
    const pgClient = await db.getClient();
    await pgClient.query('BEGIN')

    try {
        await pgClient.query(`DELETE FROM client_class WHERE client_id = $1`);
        await pgClient.query(`DELETE FROM client WHERE id = $1 `);

        const successMessage = "User Deleted Successfully";

        await pgClient.query('COMMIT')
        res.status(status.success).send(successMessage);

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

const AccountFunction = {
    getAccountUser,
    updateAccountUser,
    deleteAccountUser
};

module.exports = AccountFunction;