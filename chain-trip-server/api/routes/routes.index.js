import express from 'express';
import uploadRoute from './upload.route.js';
import generateRoute from './generate.route.js';

const router = express.Router();

router.use('/upload', uploadRoute);
router.use('/generate', generateRoute);

export default router;