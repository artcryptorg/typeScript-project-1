declare module 'sort-by' {
    function sortBy<T>(
        ...args: Array<keyof T | ((key: keyof T, value: T[keyof T]) => any)>
    ): (a: T, b: T) => number;
    export = sortBy;
}