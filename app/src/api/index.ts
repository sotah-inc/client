const hostname = window.location.hostname;
export let apiHost = `//${window.location.hostname}:8080`;
if (hostname !== "localhost") {
    apiHost = `//api.${hostname}`;
}
