import { Sequelize } from 'sequelize';
import Config, { EnvEnum } from "./../../config.js";
import mysql2 from 'mysql2';
export default new Sequelize(Config.database.schema, Config.database.user, Config.database.password, {
    logging: Config.env == EnvEnum.test || Config.env == EnvEnum.prod ? false : true,
    // logging: ConfigType == EnvEnum.prod? false : true,
    dialect: 'mysql',
    dialectModule: mysql2,
    host: Config.database.host,
    port: Config.database.port,
    pool: { max: Config.database.max_pool, idle: 3000 }
});
