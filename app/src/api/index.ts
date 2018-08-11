const hostname = window.location.hostname;
export let apiEndpoint = `//${window.location.hostname}:8080`;
if (hostname !== "localhost") {
    apiEndpoint = `//api.${hostname}`;
}
