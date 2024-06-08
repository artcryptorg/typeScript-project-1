function pickObjectKeys<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    let newObj = {} as Pick<T, K>;
    keys.forEach((key) => {
        newObj[key] = obj[key];
    });
    return newObj;
}
