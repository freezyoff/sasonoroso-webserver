import express from 'express'; //{ Request, Response }
import * as dotenv from 'dotenv';
import * as path from 'path';
import Config, {EnvEnum, filePath as ConfigPath, type as ConfigType}from "./config.ts"

/**
 * load configuration files
 */
if (ConfigType == EnvEnum.dev || ConfigType == EnvEnum.test){
  console.log(`Loading .env file: ${ConfigType}`);
  console.log(`Listen URL: ${Config.SERVER_HOST}`);
  console.log(`Listen Port: ${Config.SERVER_PORT}`);
  console.log(`Host URL: ${Config.SERVER_HOST}`);
  console.log(`Database URL: ${Config.DB_HOST}`);
}

/**
 * Load Express
 */
export const app = express();

// import ApiRouter from './routes/api.ts';
// app.use('/api', ApiRouter);

app.get('/', (req, res) => {
  res.send('Hello World from SASONOROSO!');
});

export const server = app.listen(Config.SERVER_PORT, () => {
  console.log(`Sasonoroso listening on port ${Config.port}`);
});

export default app