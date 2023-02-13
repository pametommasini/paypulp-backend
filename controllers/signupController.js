const jwt = require('jsonwebtoken');
const newClient = require("../model/newClient");
const CryptoJS = require("crypto-js");
const MD5 = require("crypto-js/md5");
const { v4: uuidv4 } = require('uuid');

const signupController = async (req, res) => {
    const client = await newClient();
    const user_uuid = uuidv4();
    const { email,
        password,
        account_type,
        first_name,
        last_name,
        phone,
        birth_date,
        address,
        city,
        country,
        time_zone,
        security_question,
        security_question_answer
    } = req.body;
    const md5Password = CryptoJS.MD5(password).toString();
    let resUsers;
     try {
        const dbUsers = await client.query('INSERT INTO users (user_uuid, email, account_type, password) VALUES (($1), ($2), ($3), ($4)) RETURNING *',
            [user_uuid, email, account_type, md5Password]);
            resUsers = dbUsers.rows[0];
    } catch (error) {
        console.log(error);
        res.status(401).json("Incomplete user information!").end;
    } 
    //creation time
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const creation_time = today.toLocaleString('en-US', options);
    let resCustomers;
    try {
        const dbCustomers = await client.query(
            'INSERT INTO paypulp_costumers (user_uuid, first_name, last_name, phone, birth_date, address, city, country, time_zone, security_question, security_question_answer, creation_time) VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10), ($11), ($12)) RETURNING *',
            [user_uuid, first_name, last_name, phone, birth_date, address, city, country, time_zone, security_question, security_question_answer, creation_time]);
            resCustomers = dbCustomers.rows[0];
    } catch (error) {
        console.log(error);
        res.status(401).json("Incomplete customer information!").end;
    }
    delete resUsers.password;
    const token = jwt.sign({ email }, process.env.SECRET, {
        algorithm: 'HS256',
        expiresIn: 3000
    })
    res.status(200).json({ token, resCustomers, resUsers });
}

module.exports = signupController;