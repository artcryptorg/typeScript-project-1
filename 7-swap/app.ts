function swapkeysAndValues(obj: Record<string, number>): Record<number, string> {
    const newObj: Record<number, string> = {};
    for (const key in obj) {
        const value = obj[key];
        newObj[value] = key;
    }
    return newObj;
}