export function paramExists(paramKey, obj) {
    if (obj) {
        return (paramKey in obj) && (obj[paramKey] !== undefined);
    }
    return false;
}
export function paramNotNull(paramKey, obj) {
    if (obj) {
        return (paramKey in obj) && (obj[paramKey] !== null);
    }
    return false;
}
export function paramExistsAndNotNull(paramKey, obj) {
    if (obj) {
        return paramExists(paramKey, obj) && paramNotNull(paramKey, obj);
    }
    return false;
}
