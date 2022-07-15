const router = require('express').Router();
const userController = require('../controllers/user');
const auth = require('../middlewares/auth');

router.get('/getusers', auth, userController.getUsers);

module.exports = router;
