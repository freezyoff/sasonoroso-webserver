import {} from 'express';
export function paramExists(paramKey, obj) {
    return (paramKey in obj) && (obj[paramKey] !== undefined);
}
export function paramNotNull(paramKey, obj) {
    return (paramKey in obj) && (obj[paramKey] !== null);
}
export function paramExistsAndNotNull(paramKey, obj) {
    return paramExists(paramKey, obj) && paramNotNull(paramKey, obj);
}
//# sourceMappingURL=helpers.js.map