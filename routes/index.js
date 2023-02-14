const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', require("../controllers/index"));

/* routing */
<<<<<<< HEAD

// router.use('/user', require("./user")); 
=======
router.use('/user', require("./user")); 
>>>>>>> 4234e78daf1e2aabef7dbeb35fce172785d2580e


router.use('/transaction', require("./transaction"));


router.use('/product', require("./product"));



router.get('/', require('../controllers/secureRequestController'));




module.exports = router;
