var express = require('express');
var router = express.Router();
var user = require('../mongodb/controllers/user');

router.get('/user',user.list);

router.post('/user',user.create);

module.exports = router;
