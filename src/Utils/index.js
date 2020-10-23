const { validateCredentials, getAge } = require("./CredentialVerification");
const { verifyCaptcha } = require("./reCaptcha");
const { generateToken, verifyToken } = require("./JWT");

module.exports = {
    validateCredentials,
    getAge,
    verifyCaptcha,
    generateToken,
    verifyToken
}