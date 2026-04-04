import {} from 'express';
import DbUser, {} from "./../lib/db/user.js";
class HttpUserController {
    static async reqFetchHandler(req, res) {
        const result = await DbUser.fetchAll(req.body);
        res.json(result);
    }
    static async reqFetchValidation(req, res, next) {
        const reqInput = req.body;
        var handleNext = true;
        if (reqInput) {
            handleNext =
                (reqInput.filterColumns != null && reqInput.filterValues != null && reqInput.filterLogics != null) ||
                    (reqInput.filterColumns == null || reqInput.filterLogics == null || reqInput.filterValues == null);
        }
        if (handleNext) {
            next();
        }
        else {
            res.status(422).end();
        }
    }
    ;
    static async reqSaveHandler(req, res) {
        // res.json(await DbUser.fetchAll(fcols, flogics, fvals));    
    }
    static async reqSaveValidation(req, res, next) {
        if (req.body == null) {
            res.status(422).end();
            return;
        }
        var handleNext = true;
        const iUser = req.body;
        const updateAct = iUser ? iUser.id != null : false;
        if (updateAct) {
            handleNext = iUser.id != null && typeof iUser.id === "number";
        }
        else {
            handleNext =
                iUser.usrName &&
                    iUser.usrPwd &&
                    iUser.usrRole &&
                    iUser.personIdNumber &&
                    iUser.personName &&
                    iUser.personPhone;
        }
        next();
    }
    ;
}
export default HttpUserController;
//# sourceMappingURL=user.js.map