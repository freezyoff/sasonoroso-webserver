import * as dotenv from 'dotenv';
import * as path from 'path';
export const type = process.env.NODE_ENV || 'development';
export const filePath = path.resolve(process.cwd(), `.env.${type}`);
dotenv.config({ path: filePath });
export default process.env;
//# sourceMappingURL=config.js.map