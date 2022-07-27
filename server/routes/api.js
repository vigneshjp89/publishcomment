var express = require('express');
var router = express.Router();
var publishController= require('../controller/publishController');
var publisherController= require('../controller/publisherController');
var appController= require('../controller/appController');
var zfaController= require('../controller/zfaController');
/* GET users listing. */
router.get('/publish', publishController.listAll).get('/publish/nextId',publishController.nextAutoIncrement)
.post('/publish',publishController.addNew).put('/publish',publishController.updatePublish);
router.get('/publisher',publisherController.listAll);
router.get('/app',appController.listAll).post('/app',appController.addNew).put('/app',appController.updateApp);
router.get('/zfa',zfaController.getZFA).post('/zfa',zfaController.addZFA).get('/zfa/decrypt',zfaController.decryptKey);

module.exports = router;