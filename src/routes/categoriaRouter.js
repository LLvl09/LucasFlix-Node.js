const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriaController');
const checkToken = require('../services/checkToken');

router.get('/', controller.get);
router.get('/:id', controller.getById)

router.post('/',checkToken.check, controller.post);
router.put('/:id',checkToken.check, controller.put);
router.delete('/:id',checkToken.check, controller.delete);

module.exports = router;