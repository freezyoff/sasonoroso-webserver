import { type Request, type Response, type NextFunction } from 'express';
declare class HttpUserController {
    static reqFetchHandler(req: Request, res: Response): Promise<void>;
    static reqFetchValidation(req: Request, res: Response, next: NextFunction): Promise<void>;
    static reqSaveHandler(req: Request, res: Response): Promise<void>;
    static reqSaveValidation(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default HttpUserController;
//# sourceMappingURL=user.d.ts.map