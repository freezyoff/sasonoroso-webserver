import * as dotenv from 'dotenv';
import * as path from 'path';

export const EnvEnum = {
  prod: 'production',
  dev: 'development',
  test: 'test'
}

export type EnvType = typeof EnvEnum[keyof typeof EnvEnum];

var tt:EnvType;
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

export const type:EnvType =  tt;
export const filePath = path.resolve(process.cwd(), `.env.${type}`);

dotenv.config({ path: filePath, override: true });

export default process.env;