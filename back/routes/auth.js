const router = require('express').Router();

const authController = require('../controllers/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', authController.getUser);



module.exports = router;