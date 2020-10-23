//#region Defining the resources needed
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
//#endregion

//#region Defining the Member Account MongoDB Schema
const { Member } = require('../Models');
//#endregion

//#region Custom libraries
const { validateCredentials, getAge, verifyCaptcha, generateToken, verifyToken } = require("../Utils");
//#endregion

//#region Getting specific user
router.post('/login', fetchMember, async (req, res) => {
    const captchaResponse = req.body.securityToken;

    const validCaptcha = await verifyCaptcha(captchaResponse);

    if (!validCaptcha) {
        return res.status(403).json({
            error: true,
            context: "You are not permitted to access this service."
        });
    }

    const validatedPassword = await validatePassword(req.body.password, res.member.password);

    if (validatedPassword === null) {
        return res.status(500).json({
            error: true,
            context: "We ran into an issue while validating your password."
        });
    }

    if (!validatedPassword) {
        return res.status(401).json({
            error: true,
            context: "You provided a set of invalid credentials while trying to authenticate your account."
        });
    }

    const JWTToken = await generateToken(res.member.toJSON());
    res.member["_doc"]["token"] = JWTToken;

    console.log(res.member);

    return res.send(res.member);
});
//#endregion

//#region Creating a user
router.post('/', async (req, res) => {
    const captchaResponse = req.body.securityToken;

    const validCaptcha = verifyCaptcha(captchaResponse);

    if (!validCaptcha) {
        return res.status(403).json({
            error: true,
            context: "You are not permitted to access this service."
        });
    }

    const segmentedBirthdate = req.body.birthdate.split("/");

    const username = req.body.username.toLowerCase(),
          firstName = req.body.firstName,
          lastName = req.body.lastName,
          email = req.body.email,
          password = bcrypt.hashSync(req.body.password, 16),
          birthdate = new Date(segmentedBirthdate[0], segmentedBirthdate[1] - 1, segmentedBirthdate[2]);

    const age = getAge(birthdate);

    if (age < 13) {
        return res.status(406).json({
            error: true,
            context: "You must be 13 years or older to use this service due to COPPA."
        });
    }
    
    if (!validateCredentials(username, req.body.password, firstName, lastName, email)) {
        return res.status(406).json({
            error: true,
            context: "The credentials provided did not meet the criteria required for the account fields."
        });
    }

    const member = new Member({
        username,
        firstName,
        lastName,
        birthdate,
        email,
        password
    });

    try {
        const newMember = await member.save();
        const JWTToken = generateToken(newMember);
        newMember["_doc"]["token"] = JWTToken;

        return res.status(201).json(newMember);
    } catch (error) {
        return res.status(500).json({
            error: true,
            context: error.message
        })
    }
});
//#endregion

//#region we will verify users current session
router.post('/verify', async (req, res) => {
    const token = req.body.authenticationToken;

    if (!token) {
        return res.json({
            error: false,
            loggedIn: false
        });
    }

    const tokenValid = await verifyToken(token);

    if (!tokenValid || tokenValid === null || tokenValid === undefined) {
        return res.json({
            error: false,
            loggedIn: false
        });
    }

    return res.json(tokenValid);
});
//#endregion

//#region We will create a helper function to retreive the account from a login.
async function fetchMember(req, res, next) {
    var member;
    try {
        member = await Member.findOne({
            "email": req.body.email
        });

        if (member === null || member === undefined) {
            return res.status(404).json({
                error: true,
                context: "We could not find an existing account using the provided Email Address!"
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: true,
            context: error.message
        });
    }

    res.member = member;
    next();
}
//#endregion

//#region Password validation event
async function validatePassword(password, hash) {
    try {
        let result = await bcrypt.compare(password, hash).catch(() => {
            return null;
        });

        return result;
    } catch (error) {
        return null;
    }
}
//#endregion

module.exports = router;