import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';
import { paramExists, paramExistsAndNotNull } from './helpers.ts';
import { log } from 'console';
import type { IUser } from '../database/models/user.ts';
import { IPartner } from "../database/models/db.ts";

interface PartnerSaveReqParams{
  id?: number
  salesPersonId?: number|null
  storeName?: string
  storeAddr?: string
  storeMapHttp?: string|null
  storeMapLatitude?: string|null
  storeMapLongitude?: string|null
  ownerName?: string|null
  ownerPhone?: string|null
  picName?: string
  picPhone?: string
}

interface PartnerRemoveReqParams{
  id: number
}

interface PartnerFetchReqParams{
  offset?: number
  limit?: number
  order?: []
}

export const fetchValidation:RequestHandler = (req:Request, res:Response, next:NextFunction)=>{
  next();
}

export const fetchHandler:RequestHandler = async (req:Request, res:Response)=>{
  const body:PartnerFetchReqParams = req.body;

  let opt = {};
  if (paramExistsAndNotNull('order', body)){
    Object.assign(opt, {order: body.order});
  }
  if (paramExistsAndNotNull('limit', body)){
    Object.assign(opt, {limit: body.limit});
  }
  if (paramExistsAndNotNull('offset', body)){
    Object.assign(opt, {offset: body.offset});
  }

  const records = await IPartner.findAll(opt);
  let json:Array<any> = [];
  for (var ii of records){
    json.push(ii.toJSON());
  }
  res.status(200).json(json).end();
}

export const removeValidation:RequestHandler = (req:Request, res:Response, next:NextFunction)=>{
  if (paramExistsAndNotNull('body', req)){

    // should have property id
    if (paramExistsAndNotNull('id', req.body)){
      next();
      return;
    }

  }

  res.status(422).end();
}

export const removeHandler:RequestHandler = async (req:Request, res:Response)=>{
  const body:PartnerRemoveReqParams = req.body;
  
  // find & destroy
  const record = await IPartner.findByPk(body.id);
  if (record){
    record.destroy();
    res.status(200).end();
    return;
  }

  res.status(422).end();
}

export const saveValidation:RequestHandler = (req:Request, res:Response, next:NextFunction)=>{
  // update or insert
  let handleNext = 
    // update
    paramExistsAndNotNull('id', req.body) || 

    // insert
    (
      // paramExistsAndNotNull('salesPersonId', req.body) && 
      paramExistsAndNotNull('storeName', req.body) && 
      paramExistsAndNotNull('storeAddr', req.body) && 
      // paramExistsAndNotNull('storeMapHttp', req.body) && 
      // paramExistsAndNotNull('storeMapLatitude', req.body) &&
      // paramExistsAndNotNull('storeMapLongitude', req.body) && 
      // paramExistsAndNotNull('ownerName', req.body) &&
      // paramExistsAndNotNull('ownerPhone', req.body) &&
      paramExistsAndNotNull('picName', req.body) &&
      paramExistsAndNotNull('picPhone', req.body)
    );

  if (handleNext){
    next();
    return;
  }

  res.status(422).end();
}

export const saveHandler = async (req:Request, res:Response)=> {
  const body:PartnerSaveReqParams = req.body;
  const hasId:boolean = paramExistsAndNotNull('id', body);
  var record:IPartner|null = hasId? await IPartner.findByPk(body.id) : null;

  // update
  if (hasId){
    if (paramExistsAndNotNull('salesPersonId', body)){
      record!.salesPersonId = body.salesPersonId!;
    }	
    if (paramExistsAndNotNull('storeName', body)){
      record!.storeName = body.storeName!;
    }	 
    if (paramExistsAndNotNull('storeAddr', body)){
      record!.storeAddr = body.storeAddr!;
    }
    if (paramExistsAndNotNull('storeMapHttp', body)){
      record!.storeMapHttp = body.storeMapHttp!;
    }
    if (paramExistsAndNotNull('storeMapLatitude', body)){
      record!.storeMapLatitude = body.storeMapLatitude!;
    }
    if (paramExistsAndNotNull('storeMapLongitude', body)){
      record!.storeMapLongitude = body.storeMapLongitude!;
    }
    if (paramExistsAndNotNull('ownerName', body)){
      record!.ownerName = body.ownerName!;
    }
    if (paramExistsAndNotNull('ownerPhone', body)){
      record!.ownerPhone = body.ownerPhone!;
    }
    if (paramExistsAndNotNull('picName', body)){
      record!.picName = body.picName!;
    }
    if (paramExistsAndNotNull('picPhone', body)){
      record!.picPhone = body.picPhone!;
    }
    await record!.save();
    
    res.status(200).json(record!.toJSON()).end();
    return;
  }

  // insert
  const data = {
    salesPersonId: body.salesPersonId ?? null,
    storeName: body.storeName!,
    storeAddr: body.storeAddr!,
    storeMapHttp: body.storeMapHttp ?? null,
    storeMapLatitude: body.storeMapLatitude ?? null,
    storeMapLongitude: body.storeMapLongitude ?? null,
    ownerName: body.ownerName ?? null,
    ownerPhone: body.ownerPhone ?? null,
    picName: body.picName!,
    picPhone: body.picPhone!
  };
  record = await IPartner.create(data);
  await record!.save();

  res.status(201).json(record.toJSON()).end();
  return;
}