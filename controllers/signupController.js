const jwt = require('jsonwebtoken');
const newClient = require("../model/newClient");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require('uuid');
const SignupManager = require('../model/signupModel');

const signupController = async (req, res) => {
    const client = await newClient();
    const userUuid = uuidv4();
    const { email,
        password,
        accountType,
        firstName,
        lastName,
        phone,
        birthDate,
        address,
        city,
        country,
        timeZone,
        securityQuestion,
        securityQuestionAnswer
    } = req.body;
    // encriptamos password
    const md5Password = CryptoJS.MD5(password).toString();
    // llamada al modelo
    const dbUsers = await SignupManager.insertUsers(email, accountType, userUuid, md5Password);
 
    //creation time
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const creationTime = today.toLocaleString('en-US', options);
    
    const dbCustomers = await SignupManager.insertCostumers(userUuid, req.body, creationTime);

    const dbName = await SignupManager.getInfo(userUuid);

    const dbEmail = await SignupManager.getPlusInfo(email);
    
    const userInfo = {
        email: dbEmail.rows[0].email,
        userUuid: dbEmail.rows[0].user_uuid,
        accountType: dbEmail.rows[0].account_type,
        firstName: dbName.rows[0].first_name,
        payMethodId: null,
        payMethodUuid: null,
        personalId: null,
        isPreferred: null,
        cardNumber: null,
        cardName: null,
        cardType: null,
        cardExpiryDate: null,
        cardSecurityCode: null
      }

    const token = jwt.sign({ userUuid }, process.env.SECRET, {
        algorithm: 'HS256',
        expiresIn: 3000
    })
    res.status(200).json({ token, userInfo });
}

module.exports = signupController;