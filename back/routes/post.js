const router = require('express').Router();

const postController = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/', auth, postController.getAllPost);
router.post('/', auth, multer ,postController.createPost);


module.exports = router;