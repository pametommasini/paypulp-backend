var express = require('express');
var router = express.Router();
const { validateProduct } = require('../middlewares/validators/productValidator');

router.get('/', require("../controllers/Products/getAllProducts"));

router.get('/:productId', require("../controllers/Products/getProduct"));

router.post('/', validateProduct, require("../controllers/Products/createNewProduct"));

module.exports = router;