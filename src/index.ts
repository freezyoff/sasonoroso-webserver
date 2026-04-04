import express from 'express'; //{ Request, Response }
import * as dotenv from 'dotenv';
import * as path from 'path';
import Config, {EnvEnum, filePath as ConfigPath, type as ConfigType}from "./tests/config.ts"

/**
 * load configuration files
 */
if (ConfigType == EnvEnum.dev || ConfigType == EnvEnum.test){
  console.log(`Loading .env file: ${ConfigType}`);
  console.log(`Host URL: ${Config.SERVER_HOST}`);
  console.log(`Database URL: ${Config.DB_HOST}`);
}

/**
 * Load Express
 */
const app = express();

import ApiRouter from './routes/api.ts';
app.use('/api', ApiRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = app.listen(Config.SERVER_PORT, () => {
  console.log(`Example app listening on port ${Config.SERVER_PORT}`);
});

export {app, server}