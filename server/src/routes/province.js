import express from 'express';
import * as provinceController from '../controller/province'

const router = express.Router()

router.get('/all', provinceController.getProvinces)

export default router