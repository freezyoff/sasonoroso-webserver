import { type Request} from 'express';

export function paramExists(paramKey:string, obj:any){
  return (paramKey in obj) && (obj[paramKey] !== undefined)
}

export function paramNotNull(paramKey:string, obj:any){
  return (paramKey in obj) && (obj[paramKey] !== null)
}

export function paramExistsAndNotNull(paramKey:string, obj:any){
  return paramExists(paramKey, obj) && paramNotNull(paramKey, obj);
}