const express = require('express');
const router= express.Router();
const controller = require('../controllers/adminController');

router.post('/register', controller.post);
router.post('/login', controller.login);

module.exports = router;
