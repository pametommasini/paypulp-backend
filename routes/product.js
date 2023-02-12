var express = require('express');
var router = express.Router();

router.get('/', require("../controllers/getAllProducts"));

router.get('/:productId', require("../controllers/getProduct"));

router.post('/', require("../controllers/createNewProduct"));

module.exports = router;