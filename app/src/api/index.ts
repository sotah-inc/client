const hostname = window.location.hostname;
export let apiEndpoint = `//${window.location.hostname}:8080`;
if (hostname !== "localhost") {
    apiEndpoint = `//api.${hostname}`;
}

export interface IGatherOptions<T> {
    headers?: Headers;
    body?: T;
    method?: string;
    url: string;
}

export interface IGatherResult<T> {
    response: Response;
    body: T;
    status: number;
}

export const gather = async <T, A>(opts: IGatherOptions<T>): Promise<IGatherResult<A>> => {
    const body = typeof opts.body === "undefined" ? null : JSON.stringify(opts.body);
    const method = typeof opts.method === "undefined" ? "GET" : opts.method;
    const headers: Headers = (() => {
        if (typeof opts.headers === "undefined") {
            return new Headers({ "content-type": "application/json" });
        }

        return opts.headers;
    })();

    const response = await fetch(opts.url, {
        body,
        headers,
        method,
    });

    return {
        body: (await response.json()) as A,
        response,
        status: response.status,
    };
};
