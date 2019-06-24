if("serviceWorker" in navigator)
{
    navigator.serviceWorker.register("/pages/account/account_serviceworker.js")
    .then((registration) =>
    {
        console.log("Account serviceworker registered with scope: ", registration.scope);
    }).catch((err) =>
    {
        console.log("Service worker registration failed: ", err);
    });
}
    