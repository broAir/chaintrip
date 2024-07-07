import express from 'express';
import controller from '../controllers/generate.controller.js';

const router = express.Router();

router.route('/createImage')
    .post(controller.createImage);

router.route('/prompt')
    .get(controller.viewPrompt);


export default router;