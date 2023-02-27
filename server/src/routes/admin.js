import express from 'express';
import * as adminController from '../controller/admin'
import { verifyAdmin, verifyToken } from '../middleware/auth'

const router = express.Router()

router.use(verifyToken)
router.use(verifyAdmin)
router.get('/get-users', adminController.getUsers)
router.delete('/delete-user', adminController.deleteUser)
router.get('/get-posts', adminController.getPosts)
router.put('/approve-post', adminController.approvePost)
router.post('/create-blog', adminController.createBlog)
router.put('/update-blog', adminController.updateBlog)
router.delete('/delete-blog', adminController.deleteBlog)
export default router