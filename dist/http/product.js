import { paramExistsAndNotNull } from "./helpers.js";
import { IProduct } from "../database/models/product.js";
export const fetchValidation = (req, res, next) => {
    next();
};
export const fetchHandler = async (req, res) => {
    const body = req.body;
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
    const records = await IProduct.findAll(opt);
    let json = [];
    for (var ii of records) {
        json.push(ii.toJSON());
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
    const record = await IProduct.findByPk(body.id);
    if (record) {
        record.destroy();
        res.status(200).end();
        return;
    }
    res.status(422).end();
};
export const saveValidation = (req, res, next) => {
    // update or insert
    let handleNext = 
    // update
    paramExistsAndNotNull('id', req.body) ||
        // insert
        (paramExistsAndNotNull('category', req.body) &&
            paramExistsAndNotNull('name', req.body) &&
            paramExistsAndNotNull('desc', req.body) &&
            paramExistsAndNotNull('cogs', req.body) &&
            paramExistsAndNotNull('suggestedRetailPrice', req.body));
    if (handleNext) {
        next();
        return;
    }
    res.status(422).end();
};
export const saveHandler = async (req, res) => {
    const body = req.body;
    const hasId = paramExistsAndNotNull('id', body);
    var record = hasId ? await IProduct.findByPk(body.id) : null;
    // update
    if (hasId) {
        if (paramExistsAndNotNull('category', body)) {
            record.category = body.category;
        }
        if (paramExistsAndNotNull('name', body)) {
            record.name = body.name;
        }
        if (paramExistsAndNotNull('desc', body)) {
            record.desc = body.desc;
        }
        if (paramExistsAndNotNull('cogs', body)) {
            record.cogs = body.cogs;
        }
        if (paramExistsAndNotNull('suggestedRetailPrice', body)) {
            record.suggestedRetailPrice = body.suggestedRetailPrice;
        }
        await record.save();
        res.status(200).json(record.toJSON()).end();
        return;
    }
    // insert
    const data = {
        category: body.category,
        name: body.name,
        desc: body.desc,
        cogs: body.cogs,
        suggestedRetailPrice: body.suggestedRetailPrice
    };
    record = await IProduct.create(data);
    await record.save();
    res.status(201).json(record.toJSON()).end();
    return;
};
