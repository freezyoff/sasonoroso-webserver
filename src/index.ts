import express from 'express'; //{ Request, Response }
import * as dotenv from 'dotenv';
import * as path from 'path';
import Config, {EnvEnum} from "./config.ts"

/**
 * load configuration files
 */
if (Config.env == EnvEnum.dev || Config.env == EnvEnum.test){
  console.log(Config);
}

/**
 * Load Express
 */
export const app = express();

import ApiRouter from './routes/api.ts';
app.use('/api', ApiRouter);

app.get('/', (req, res) => {
  var str = `<h1>Hello World from SASONOROSO!</h1>`;
  str += `<h3>${Config.database.host}</h3>`;
  str += `<h3>${Config.database.user}</h3>`;
  str += `<h3>${Config.database.port}</h3>`;
  str += `<h3>${Config.database.max_pool}</h3>`;
  str += `<h3>${Config.database.dialect}</h3>`;
  str += `<h3>${Config.database.schema}</h3>`;
  res.send(str);
});

export const server = app.listen(Config.server.port, () => {
  console.log(`Sasonoroso listening on port ${Config.server.port}`);
});

export default app