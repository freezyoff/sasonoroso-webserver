import { type Request} from 'express';

export function paramExists(paramKey:string, obj:any){
  if (obj){
    return (paramKey in obj) && (obj[paramKey] !== undefined)
  }
  return false;
}

export function paramNotNull(paramKey:string, obj:any){
  if (obj){
    return (paramKey in obj) && (obj[paramKey] !== null)
  }
  return false;
}

export function paramExistsAndNotNull(paramKey:string, obj:any){
  if (obj){
    return paramExists(paramKey, obj) && paramNotNull(paramKey, obj);
  }
  return false;
}