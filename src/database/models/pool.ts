import { Sequelize } from 'sequelize';
import Config, {type as ConfigType, EnvEnum} from './../../config.ts'
import mysql2 from 'mysql2';

export default new Sequelize(
  Config.DB_SCHEMA!,
  Config.DB_USR!,
  Config.DB_PWD!,
  {
    logging: ConfigType == EnvEnum.test || ConfigType == EnvEnum.prod? false : true,
    // logging: ConfigType == EnvEnum.prod? false : true,
    dialect: 'mysql',
    dialectModule: mysql2,
    host: Config.DB_HOST!,
    port: Number.parseInt(Config.DB_PORT!),
    pool: {max: Number.parseInt(Config.DB_POOL!), idle: 3000}
  }
);