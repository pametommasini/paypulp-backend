var express = require('express');
var router = express.Router();
const { validateProduct } = require('../middlewares/productValidator');

router.get('/', require("../controllers/Products/getAllProducts"));

router.get('/:productUuid', require("../controllers/Products/getProduct"));


router.patch('/:productUuid', require("../controllers/Products/updateProduct"));

router.post('/', validateProduct, require("../controllers/Products/createNewProduct"));

module.exports = router;