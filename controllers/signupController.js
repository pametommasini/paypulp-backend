const jwt = require('jsonwebtoken');
const newClient = require("../model/newClient");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require('uuid');

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
    const md5Password = CryptoJS.MD5(password).toString();
    let userInfo;
     try {
        const dbUsers = await client.query('INSERT INTO users (user_uuid, email, account_type, password) VALUES (($1), ($2), ($3), ($4)) RETURNING *',
            [userUuid, email, accountType, md5Password]);
            userInfo = dbUsers.rows[0];
    } catch (error) {
        console.log(error, "1");
        return res.status(401).json("Incomplete user information!").end;
    } 
    //creation time
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const creation_time = today.toLocaleString('en-US', options);
    let customerInfo;
    try {
        const dbCustomers = await client.query(
            'INSERT INTO paypulp_costumers (user_uuid, first_name, last_name, phone, birth_date, address, city, country, time_zone, security_question, security_question_answer, creation_time) VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10), ($11), ($12)) RETURNING *',
            [userUuid, firstName, lastName, phone, birthDate, address, city, country, timeZone, securityQuestion, securityQuestionAnswer, creation_time]);
            customerInfo = dbCustomers.rows[0];
    } catch (error) {
        console.log(error, "2");
        return res.status(401).json("Incomplete customer information!").end;
    }
    delete userInfo.password;
    const token = jwt.sign({ email }, process.env.SECRET, {
        algorithm: 'HS256',
        expiresIn: 3000
    })
    res.status(200).json({ token, userInfo, customerInfo });
}

module.exports = signupController;