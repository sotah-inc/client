const hostname = window.location.hostname;
export let apiEndpoint = `//${window.location.hostname}:9999`;
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

    const responseBody: A | null = await (async () => {
        const responseText = await response.text();
        if (responseText.length === 0) {
            return null;
        }

        const contentType = response.headers.get("content-type");
        if (contentType === null) {
            return null;
        }

        if (/^application\/json/.test(contentType) === false) {
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
