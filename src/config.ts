import * as dotenv from 'dotenv';
import * as path from 'path';
import { paramExistsAndNotNull } from './http/helpers.ts';

// check if run on vercel
var runOnVercel = false;
if (paramExistsAndNotNull('VERCEL_ENV', process.env)){
  runOnVercel = true;
}

export const EnvEnum = {
  prod: 'production',
  dev: 'development',
  test: 'test'
}

export type EnvType = typeof EnvEnum[keyof typeof EnvEnum];

var tt:EnvType;
if (runOnVercel){
  switch(process.env.VERCEL_ENV?.trim()){
    case 'production':
      tt = EnvEnum.prod;
      break;

    default:
      tt = EnvEnum.dev;
  }
}
else{
  if (EnvEnum.dev === process.env.NODE_ENV?.trim()){
    tt = EnvEnum.dev;
  }
  else if (EnvEnum.prod === process.env.NODE_ENV?.trim()){
    tt = EnvEnum.prod;
  }
  else if (EnvEnum.test === process.env.NODE_ENV?.trim()){
    tt = EnvEnum.test;
  }
  else{
    throw ("Unknown Environment");
  }
}

export const type:EnvType =  tt;
export const filePath = path.resolve(process.cwd(), `.env.${type}`);

if (runOnVercel){
  process.env.SERVER_PORT = process.env.PORT;
}
else{
  dotenv.config({ path: filePath, override: true });
}

export default process.env;