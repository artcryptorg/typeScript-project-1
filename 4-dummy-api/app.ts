const link: string = 'https://dummyjson.com/users';

enum Gender {
    Male = 'male',
    Female = 'female',
    Agender = 'agender',
    Transgender = 'transgender',
    Bigender = 'bigender',
    Genderqueer = 'genderqueer',
    Genderfluid = 'genderfluid',
    TwoSpirit = 'two-spirit',
    Pangender = 'pangender',
    Demigende = 'demigender',
    ThirdGender = 'third-gender'
}

interface User {
    id: number,
    firstName: string,
    lastName: string,
    maidenName: string,
    age: number,
    gender: Gender,
    email: string,
    phone: string,
    username: string,
    password: string,
    birthDate: Date,
    image: UserUrl,
    height: number,
    weight: number,
    eyeColor: string,
    hair: UserHair,
    domain: UserDomain,
    ip: string,
    address: Adress,
    macAddress: string,
    university: string,
    bank: UserBank,
    company: UserCompany,
    ein: string,
    ssn: string,
    userAgent: string,
    crypto: UserCrypto
}

interface UserUrl {
    host: string;
    hostname: string;
    href: string;
    pathname: string;
    port?: string;
    protocol: string;
    search?: string;
}

interface UserDomain {
    hostname: string
}

interface UserHair {
    color: string,
    type: string
}

interface Adress {
    address: string,
    city: string,
    coordinates:
    {
        lat: number,
        lng: number
    },
    postalCode: string,
    state: string
}

interface UserBank {
    cardExpire: string,
    cardNumber: number,
    cardType: string,
    currency: string,
    iban: string
}

interface UserCompany {
    address: Adress,
    department: string,
    name: string,
    title: string
}

interface UserCrypto {
    coin: string,
    wallet: string,
    network: string
}


interface UsersResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

async function getUsers(URL: string): Promise<UsersResponse> {
    try {
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error('Ошибка при получении данных');
        }
        const data: UsersResponse = await res.json();
        console.log(data);
        return data
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return {
            users: [],
            total: 0,
            skip: 0,
            limit: 0
        };
    }
}

getUsers(link).then((data) => {
    if (data.users.length === 0) {
        console.log('Users не были получены с сервера');
    } else {
        console.log(data.users);
    }
});