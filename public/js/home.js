if("serviceWorker" in navigator)
{
    navigator.serviceWorker.register("/pages/homepage/home_serviceworker.js")
    .then((registration) =>
    {
        console.log("Homepage serviceworker registered with scope: ", registration.scope);
    }).catch((err) =>
    {
        console.log("Service worker registration failed: ", err);
    });
}
    
(($) =>
{
    $(document).ready(() =>
    {
        var carouselTemplate = $('#hidden-template').html();

        for (var i = 0; i < 3; i++)
        {
            var item = $(carouselTemplate).clone();
            $(item).find('#carousel-headline').html("Article headline #" + i);
            $(item).find('#carousel-hook').html("This is some catchy description that pulls you into the story.");
            $(item).find('#carousel-button-text').html("Read");
            
            $("#carousel_" + i).append(item);
            console.log("appended carousel_" + i);
        }
    });
})(jQuery);