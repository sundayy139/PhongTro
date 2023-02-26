import express from 'express';
import * as userController from '../controller/user'
import { verifyToken } from '../middleware/auth'

const router = express.Router()

router.use(verifyToken)
router.get('/get-current-user', userController.getCurrentUser)
router.put('/update-profile', userController.updateProfile)

export default router