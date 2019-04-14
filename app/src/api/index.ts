import queryString from "query-string";

const hostname = window.location.hostname;
export let apiEndpoint = "https://api.sotah.info";
if (hostname === "localhost") {
    apiEndpoint = "http://localhost:9999";
}

export interface IGatherOptions<T> {
    headers?: Headers;
    body?: T;
    method?: string;
    url: string;
}

export interface IGatherQueryOptions<Q> {
    headers?: Headers;
    query?: Q;
    method?: string;
    url: string;
}

export interface IGatherResult<T> {
    response: Response;
    body: T | null;
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

    return handleResponse(response);
};

export const gatherWithQuery = async <Q, A>(opts: IGatherQueryOptions<Q>): Promise<IGatherResult<A>> => {
    const query = typeof opts.query === "undefined" ? null : queryString.stringify(opts.query);
    const method = typeof opts.method === "undefined" ? "GET" : opts.method;
    const headers: Headers = (() => {
        if (typeof opts.headers === "undefined") {
            return new Headers({ "content-type": "application/json" });
        }

        return opts.headers;
    })();

    const url = (() => {
        if (query === null) {
            return opts.url;
        }

        return `${opts.url}?${query}`;
    })();

    const response = await fetch(url, {
        headers,
        method,
    });

    return handleResponse(response);
};

const handleResponse = async <A>(response: Response): Promise<IGatherResult<A>> => {
    const responseBody: A | null = await (async () => {
        const responseText = await response.text();
        if (responseText.length === 0) {
            return null;
        }

        const contentType = response.headers.get("content-type");
        if (contentType === null) {
            return null;
        }

        if (!/^application\/json/.test(contentType)) {
            return null;
        }

        return JSON.parse(responseText);
    })();

    return {
        body: responseBody,
        response,
        status: response.status,
    };
};
