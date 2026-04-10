import * as dotenv from 'dotenv';
import * as path from 'path';
import { paramExistsAndNotNull } from "./http/helpers.js";
export const EnvEnum = {
    prod: 'production',
    dev: 'development',
    test: 'test'
};
class ConfigImpl {
    static vercel;
    static env;
    static server = {};
    static database = {};
}
// check if run on vercel
const runOnVercel = paramExistsAndNotNull('VERCEL_ENV', process.env) ||
    paramExistsAndNotNull('__VERCEL_DEV_RUNNING', process.env);
ConfigImpl.vercel = runOnVercel;
if (ConfigImpl.vercel) {
    switch (process.env.VERCEL_ENV?.trim()) {
        case 'production':
            ConfigImpl.env = EnvEnum.prod;
            break;
        default:
            ConfigImpl.env = EnvEnum.dev;
    }
    ConfigImpl.server.host = process.env.HOST ?? 'localhost';
    ConfigImpl.server.port = parseInt(process.env.PORT ?? '3000');
    ConfigImpl.database.host = process.env.DB_HOST ?? 'localhost';
    ConfigImpl.database.user = process.env.DB_USR ?? '';
    ConfigImpl.database.password = process.env.DB_PWD ?? '';
    ConfigImpl.database.port = parseInt(process.env.DB_PORT ?? '3306');
    ConfigImpl.database.max_pool = parseInt(process.env.DB_POOL ?? '5');
    ConfigImpl.database.dialect = process.env.DB_DIALECT ?? 'mysql';
    ConfigImpl.database.schema = process.env.DB_SCHEMA ?? '';
}
else {
    switch (process.env.NODE_ENV?.trim()) {
        case EnvEnum.prod:
            ConfigImpl.env = EnvEnum.prod;
            break;
        case EnvEnum.test:
            ConfigImpl.env = EnvEnum.test;
            break;
        case EnvEnum.dev:
        default:
            ConfigImpl.env = EnvEnum.dev;
            break;
    }
    const filePath = path.resolve(process.cwd(), `.env.${ConfigImpl.env}`);
    const loaded = {};
    dotenv.config({ path: filePath, override: true, processEnv: loaded });
    ConfigImpl.server.host = loaded.SERVER_HOST ?? 'localhost';
    ConfigImpl.server.port = parseInt(loaded.SERVER_PORT ?? '3000');
    ConfigImpl.database.host = loaded.DB_HOST ?? 'localhost';
    ConfigImpl.database.user = loaded.DB_USR ?? '';
    ConfigImpl.database.password = loaded.DB_PWD ?? '';
    ConfigImpl.database.port = parseInt(loaded.DB_PORT ?? '3306');
    ConfigImpl.database.max_pool = parseInt(loaded.DB_POOL ?? '5');
    ConfigImpl.database.dialect = loaded.DB_DIALECT ?? 'mysql';
    ConfigImpl.database.schema = loaded.DB_SCHEMA ?? '';
}
export default ConfigImpl;
