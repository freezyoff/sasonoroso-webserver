import { IUser, UserRole } from "../database/models/user.js";
import { paramExistsAndNotNull } from "./helpers.js";
import crypto from 'crypto';
export const fetchValidation = (req, res, next) => {
    // if (paramExistsAndNotNull('body', req)){
    // 	const body:UserFetchReqParams = req.body;
    // 	if (paramExistsAndNotNull('type', body)){
    // 		if (body.type === 'all' || body.type === 'filters'){
    // 			next();
    // 			return;
    // 		}
    // 	}
    // }
    // res.status(422).end();
    next();
};
export const fetchHandler = async (req, res) => {
    const body = req.body;
    // console.log(body);
    let opt = {};
    if (paramExistsAndNotNull('order', body)) {
        Object.assign(opt, { order: body.order });
    }
    if (paramExistsAndNotNull('limit', body)) {
        Object.assign(opt, { limit: body.limit });
    }
    if (paramExistsAndNotNull('offset', body)) {
        Object.assign(opt, { offset: body.offset });
    }
    const records = await IUser.findAll(opt);
    let json = [];
    for (var ii of records) {
        Reflect.deleteProperty(ii, 'usrPwd');
        json.push(ii);
    }
    res.status(200).json(json).end();
};
export const removeValidation = (req, res, next) => {
    if (paramExistsAndNotNull('body', req)) {
        // should have property id
        if (paramExistsAndNotNull('id', req.body)) {
            next();
            return;
        }
    }
    res.status(422).end();
};
export const removeHandler = async (req, res) => {
    const body = req.body;
    // find & destroy
    const record = await IUser.findByPk(body.id);
    if (record) {
        record.destroy();
        res.status(200).end();
        return;
    }
    res.status(422).end();
};
export const saveValidation = (req, res, next) => {
    if (!paramExistsAndNotNull('body', req)) {
        res.status(422).end();
        return;
    }
    // update or insert
    let handleNext = 
    // update
    paramExistsAndNotNull('id', req.body) ||
        // insert
        (paramExistsAndNotNull('usrName', req.body) &&
            paramExistsAndNotNull('usrPwd', req.body) &&
            paramExistsAndNotNull('usrRole', req.body) &&
            paramExistsAndNotNull('personIdNumber', req.body) &&
            paramExistsAndNotNull('personName', req.body) &&
            paramExistsAndNotNull('personPhone', req.body));
    // check UserRole type
    handleNext = handleNext &&
        req.body.usrRole == UserRole.none ||
        req.body.usrRole == UserRole.sales ||
        req.body.usrRole == UserRole.salesSpv ||
        req.body.usrRole == UserRole.super;
    if (handleNext) {
        next();
        return;
    }
    res.status(422).end();
};
export const saveHandler = async (req, res) => {
    const body = req.body;
    const hasId = paramExistsAndNotNull('id', body);
    var record = hasId ? await IUser.findByPk(body.id) : null;
    if (hasId) {
        if (paramExistsAndNotNull('usrName', body)) {
            record.usrName = body.usrName;
        }
        if (paramExistsAndNotNull('usrPwd', body)) {
            record.usrPwd = crypto.createHash('sha512').update(body.usrPwd).digest('hex');
        }
        if (paramExistsAndNotNull('usrRole', body)) {
            switch (body.usrRole) {
                case UserRole.super:
                    record.usrRole = UserRole.super;
                    break;
                case UserRole.salesSpv:
                    record.usrRole = UserRole.salesSpv;
                    break;
                case UserRole.sales:
                    record.usrRole = UserRole.sales;
                    break;
                default:
                    record.usrRole = UserRole.none;
            }
        }
        if (paramExistsAndNotNull('personIdNumber', body)) {
            record.personIdNumber = body.personIdNumber;
        }
        if (paramExistsAndNotNull('personName', body)) {
            record.personName = body.personName;
        }
        if (paramExistsAndNotNull('personPhone', body)) {
            record.personPhone = body.personPhone;
        }
        await record.save();
        // remove password record
        let json = record.toJSON();
        Reflect.deleteProperty(json, 'usrPwd');
        res.status(200).json(json).end();
        return;
    }
    else {
        const data = {
            usrName: body.usrName,
            usrPwd: crypto.createHash('sha512').update(body.usrPwd).digest('hex'),
            usrToken: crypto.createHash('sha512').update(`${body.usrName} ${body.usrRole}`).digest('hex'),
            usrRole: body.usrRole,
            personIdNumber: body.personIdNumber,
            personName: body.personName,
            personPhone: body.personPhone,
        };
        record = await IUser.create(data);
        await record.save();
        // remove password record
        let json = record.toJSON();
        Reflect.deleteProperty(json, 'usrPwd');
        res.status(201).json(json).end();
        return;
    }
    res.status(404).end();
};
