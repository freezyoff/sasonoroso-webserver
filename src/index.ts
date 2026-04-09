import express from 'express'; //{ Request, Response }
import * as dotenv from 'dotenv';
import * as path from 'path';
import Config, {EnvEnum} from "./config.ts"
import ConfigImpl from './config.ts';

/**
 * load configuration files
 */
if (Config.env == EnvEnum.dev || Config.env == EnvEnum.test){
  console.log(ConfigImpl);
}

/**
 * Load Express
 */
export const app = express();

import ApiRouter from './routes/api.ts';
app.use('/api', ApiRouter);

app.get('/', (req, res) => {
  res.send('Hello World from SASONOROSO!');
});

export const server = app.listen(Config.server.port, () => {
  console.log(`Sasonoroso listening on port ${Config.server.port}`);
});

export default app