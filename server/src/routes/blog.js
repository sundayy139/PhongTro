import express from 'express';
import * as blogController from '../controller/blog'


const router = express.Router()

router.get('/get-blogs', blogController.getBlogs)
router.get('/get-blog-by-id', blogController.getBlogById)
export default router