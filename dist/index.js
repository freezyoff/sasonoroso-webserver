import express from 'express'; //{ Request, Response }
import * as dotenv from 'dotenv';
import * as path from 'path';
import Config, { filePath as ConfigPath, type as ConfigType } from "./lib/config.js";
/**
 * load configuration files
 */
console.log(`Loading .env file: ${ConfigType}`);
console.log(`Host URL: ${Config.SERVER_HOST}`);
console.log(`Database URL: ${Config.DB_HOST}`);
/**
 * Load Express
 */
const app = express();
import ApiRouter from "./routes/api.js";
app.use('/api', ApiRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(Config.SERVER_PORT, () => {
    console.log(`Example app listening on port ${Config.SERVER_PORT}`);
});
//# sourceMappingURL=index.js.map