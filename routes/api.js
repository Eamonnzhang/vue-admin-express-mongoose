var express = require('express');
var router = express.Router();
var user = require('../mongodb/controllers/user');

router.param('id', user.load);

router.get('/user',user.list);

router.post('/user',user.create);

router.post('/user/:id',user.update);

router.delete('/user/:id',user.delete);

module.exports = router;
