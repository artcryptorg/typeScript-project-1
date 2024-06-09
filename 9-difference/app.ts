function difference<T extends object, K extends object>(obj1: T, obj2: K): Pick<T, Exclude<keyof T, keyof K>> {
    let result = {} as Pick<T, Exclude<keyof T, keyof K>>;

    for (const key in obj1) {
        if (!(key in obj2)) {
            (result as any)[key] = obj1[key];
        }
    }
    return result;
}