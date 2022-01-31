const express = require('express');

const postController = require('../controllers/postController');

const router = express.Router();

//localhost:3000/
router
    .route('/')
    .get(postController.getAllPosts)
    .post(postController.createPost);

router
    .route('/:id')
    .patch(postController.updatePost)
    .get(postController.getOnePost)
    .delete(postController.deletePost);



module.exports = router;