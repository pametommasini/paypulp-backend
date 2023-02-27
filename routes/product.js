var express = require('express');
var router = express.Router();

router.get('/', require("../controllers/Products/getAllProducts"));

router.get('/:productId', require("../controllers/Products/getProduct"));

router.post('/', require("../controllers/Products/createNewProduct"));

module.exports = router;