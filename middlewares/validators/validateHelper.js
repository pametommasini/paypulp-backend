const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    try{
        validationResult(req).throw()
        console.log("HOOOLAAA")
        return next()
    } catch (err) {
        console.log("hOLAAAAAAAA")
        res.status(403)
        res.send({ errors: err.array() })
    }
}

module.exports = { validateResult }