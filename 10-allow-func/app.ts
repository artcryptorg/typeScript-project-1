class User {
    @allowFunc((a: number) => a > 0)
    age: number = 30;
}

function allowFunc(validator: (value: number) => boolean) {
    return (
        target: Object,
        propertyKey: string | symbol,
    ) => {
        let value: number;
        const setter = function (newValue: number) {
            if (validator(newValue)) {
                value = newValue
            } else {
                console.log(`нельзя установить значение  ${newValue}`)
            }
        }

        const getter = function () {
            return value;
        }

        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter
        })
    }
}


