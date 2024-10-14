import { FetchBuilder } from './fetchBuilder';

class API {
    async sendRequest(id: number): Promise<any> {

        const data = await new FetchBuilder()
            .setUrl(`https://dummyjson.com/product/${id}`)
            .setGet()
            .exec();

        return data;
    }
}

class Proxy {
    private api: API;

    constructor(api: API) {
        this.api = api;
    }

    async requestProduct(id: number): Promise<any> {
        if (id >= 10) {
            return Promise.reject(new Error('Request blocked: ID must be less than 10.'));
        }
        return await this.api.sendRequest(id);
    }
}
const api = new API();
const proxy = new Proxy(api);

proxy.requestProduct(5)
    .then(product => console.log('Product found:', product))


