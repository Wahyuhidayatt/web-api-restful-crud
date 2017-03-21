const express = require('express');
const router = express.Router();
const Controller = require('../controllers/memoController');

router.post('/', Controller.create);
router.get('/', Controller.getAll);
router.get('/:slug', Controller.getOne);
router.put('/:slug', Controller.update);
router.delete('/:slug', Controller.delete);

module.exports = router
