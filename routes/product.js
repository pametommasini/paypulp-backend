var express = require('express');
var router = express.Router();

router.get('/', require("../controllers/getAllProducts"));

router.get('/:productUuid', require("../controllers/getProduct"));

router.patch('/:productUuid', require("../controllers/updateProduct"));

router.post('/', require("../controllers/createNewProduct"));



module.exports = router;