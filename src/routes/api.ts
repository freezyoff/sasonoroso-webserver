import express, {Router} from 'express';
import * as UserCtrl from './../http/user.ts'
import * as ProductCtrl from './../http/product.ts'
import * as PartnerCtrl from './../http/partner.ts'

const router:Router = Router();
router.use(express.json());

/**
 * API: /api/user/*
 */
router.post('/user/fetch', UserCtrl.fetchValidation, UserCtrl.fetchHandler);
router.post('/user/save', UserCtrl.saveValidation, UserCtrl.saveHandler);
router.post('/user/remove', UserCtrl.removeValidation, UserCtrl.removeHandler);

/**
 * API: /api/product/*
 */
router.post('/product/fetch', ProductCtrl.fetchValidation, ProductCtrl.fetchHandler);
router.post('/product/save', ProductCtrl.saveValidation, ProductCtrl.saveHandler);
router.post('/product/remove', ProductCtrl.removeValidation, ProductCtrl.removeHandler);

/**
 * API: /api/partner/*
 */
router.post('/partner/fetch', PartnerCtrl.fetchValidation, PartnerCtrl.fetchHandler);
router.post('/partner/save', PartnerCtrl.saveValidation, PartnerCtrl.saveHandler);
router.post('/partner/remove', PartnerCtrl.removeValidation, PartnerCtrl.removeHandler);

export default router;