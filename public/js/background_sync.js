navigator.serviceWorker.register('js/serviceworker.js');

navigator.serviceWorker.ready.then(function(ServiceWorkerRegistration){

    return ServiceWorkerRegistration.sync.register('myFirstSync');

});

self.addEventListener('sync', function(event){
    if (event.tag == 'myFirstSync'){
        event.waitUntil(doSomeStuff());
    }
});

function doSomeStuff(){
    console.log('Success');
}