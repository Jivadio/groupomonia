const router = require('express').Router();

const postController = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/', auth, postController.getAllPost);
router.post('/', auth, multer ,postController.createPost);
router.post('/comment', auth ,postController.getComments);
router.post('/sendcomment', auth ,postController.createComment);
router.post('/sendlike', auth ,postController.createLike);
router.post('/like', auth ,postController.getLike);
router.post('/delete', auth ,postController.deletePost);
router.post('/edit', auth ,postController.editPost);


module.exports = router;