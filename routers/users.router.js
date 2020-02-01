const express = require('express')

const controller = require('../controllers/users.controller');
const validate = require('../validate/user.validate');

const router = express.Router()

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', validate.createPost, controller.postCreate);

module.exports = router;
