export enum FetchMethod {
    Get = 'GET',
    Post = 'POST'
}

export class FetchBuilder {
    private url: string = '';
    private method: FetchMethod = FetchMethod.Get;
    private headers: Record<string, string> = { 'Content-Type': 'application/json' };
    private body: any = null;

    setUrl(url: string): FetchBuilder {
        this.url = url;
        return this;
    }

    setGet(): FetchBuilder {
        this.method = FetchMethod.Get;
        this.body = null;
        return this;
    }

    setPost(): FetchBuilder {
        this.method = FetchMethod.Post;
        return this;
    }

    setBody(body: any): FetchBuilder {
        if (this.method === FetchMethod.Get) {
            throw new Error('GET-запрос не может иметь тело');
        }
        this.body = body;
        return this;
    }

    addHeader(key: string, value: string): FetchBuilder {
        this.headers[key] = value;
        return this;
    }

    async exec(): Promise<any> {
        const options: RequestInit = {
            method: this.method,
            headers: this.headers,
        };

        if (this.method === FetchMethod.Post && this.body) {
            options.body = JSON.stringify(this.body);
        }

        try {
            const response = await fetch(this.url, options);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка запроса:', error);
            throw error;
        }
    }
}
