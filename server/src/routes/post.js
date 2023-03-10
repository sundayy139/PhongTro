import express from 'express';
import * as postController from '../controller/post'
import { verifyAdmin, verifyToken } from '../middleware/auth'

const router = express.Router()

router.get('/all', postController.getPosts)
router.get('/limit', postController.getPostsLimit)
router.get('/newpost', postController.getNewPosts)
router.get('/post-by-id', postController.getPostById)

router.use(verifyToken)
router.post('/create-new-post', postController.createNewPost)
router.get('/get-posts-user', postController.getPostsUser)
router.put('/update-post', postController.updatePost)
router.delete('/delete-post', postController.deletePost)
router.put('/update-status-post', postController.updateStatusPost)

router.use(verifyAdmin)
router.get('/get-posts', postController.getPostsAdmin)
router.put('/approve-post', postController.approvePost)
router.put('/refuse-post', postController.refusePost)
router.get('/get-count-post-by-month', postController.getCountPostByMonth)
router.get('/get-count-post-by-day', postController.getCountPostByDay)
export default router