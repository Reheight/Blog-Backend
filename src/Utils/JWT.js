const jwt = require("jsonwebtoken");

/**
 * @param {object} dataStored An object containing the information you want to store in the web token.
 * @returns {object}
 */
const generateToken = async (dataStored) => await jwt.sign(dataStored, process.env.JWT_SECRET);

/**
 * @param {string} token The authentication token provided by the client which we are verifying.
 * @returns {null|object}
 */
const verifyToken = async (token) => {
    try {
        return await jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
}