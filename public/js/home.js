if("serviceWorker" in navigator)
{
    navigator.serviceWorker.register("../pages/home_serviceworker.js")
    .then((registration) =>
    {
        console.log("Homepage serviceworker registered with scope: ", registration.scope);
    }).catch((err) =>
    {
        console.log("Service worker registration failed: ", err);
    });
}
    