var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', require("../controllers/getAllUsers"));

router.get('/:userUuid', require("../controllers/getUser"));

/* POST new user */
router.post('/', require("../controllers/getNewUser"));

router.delete('/:userUuid', require("../controllers/deleteUser"));

module.exports = router;
