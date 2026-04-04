import express, { Router } from 'express';
import HttpUserController from "./../http/user.js";
const router = Router();
router.use(express.json());
/***
 * API Routes
 * /api/user/*
 */
router.post('/user/fetch', HttpUserController.reqFetchValidation, HttpUserController.reqFetchHandler);
router.post('/user/save', HttpUserController.reqSaveValidation, HttpUserController.reqSaveHandler);
export default router;
//# sourceMappingURL=api.js.map