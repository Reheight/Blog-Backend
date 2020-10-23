const axios = require("axios").default;

/**
 * @param {string} response The response code provided by the user
 * @returns {true|false}
 */
const verifyCaptcha = async (response) => {
    try {
        let request = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${response}`);

        return request.data.success === true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    verifyCaptcha
}