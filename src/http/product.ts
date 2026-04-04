import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';
import { paramExistsAndNotNull } from './helpers.ts';
import crypto from 'crypto';
import { log } from 'console';
import { IProduct } from '../database/models/product.ts';

interface ProductSaveReqParams{
  id?: number
  category?: string,
  name?: string,
  desc?: string,
  cogs?: number,
  suggestedRetailPrice?: number
}

interface ProductRemoveReqParams{
  id: number
}

interface ProductFetchReqParams{
  offset?: number
  limit?: number
  order?: []
}

export const fetchValidation:RequestHandler = (req:Request, res:Response, next:NextFunction)=>{
  next();
}

export const fetchHandler:RequestHandler = async (req:Request, res:Response)=>{
  const body:ProductFetchReqParams = req.body;

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

  const records = await IProduct.findAll(opt);
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
  const body:ProductRemoveReqParams = req.body;
  
  // find & destroy
  const record = await IProduct.findByPk(body.id);
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
      paramExistsAndNotNull('category', req.body) && 
      paramExistsAndNotNull('name', req.body) && 
      paramExistsAndNotNull('desc', req.body) && 
      paramExistsAndNotNull('cogs', req.body) && 
      paramExistsAndNotNull('suggestedRetailPrice', req.body)
    );

  if (handleNext){
    next();
    return;
  }

  res.status(422).end();
}

export const saveHandler = async (req:Request, res:Response)=> {
  const body:ProductSaveReqParams = req.body;
  const hasId:boolean = paramExistsAndNotNull('id', body);
  var record:IProduct|null = hasId? await IProduct.findByPk(body.id) : null;

  // update
  if (hasId){
    if (paramExistsAndNotNull('category', body)){
      record!.category = body.category!
    }	
    if (paramExistsAndNotNull('name', body)){
      record!.name = body.name!;
    }	
    if (paramExistsAndNotNull('desc', body)){
      record!.desc = body.desc!;
    }
    if (paramExistsAndNotNull('cogs', body)){
      record!.cogs = body.cogs!;
    }
    if (paramExistsAndNotNull('suggestedRetailPrice', body)){
      record!.suggestedRetailPrice = body.suggestedRetailPrice!;
    }
    await record!.save();
    
    res.status(200).json(record!.toJSON()).end();
    return;
  }

  // insert
  const data = {
    category: body.category!,
    name: body.name!,
    desc: body.desc!,
    cogs: body.cogs!,
    suggestedRetailPrice: body.suggestedRetailPrice!
  };
  record = await IProduct.create(data);
  await record!.save();

  res.status(201).json(record.toJSON()).end();
  return;
}