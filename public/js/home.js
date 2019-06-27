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
        var carouselTemplate = $('#carousel-template').html();

        for (var i = 0; i < 3; i++)
        {
            let count = i + 1;
            //Replace the hard coded text here with calls to the service worker to retrieve from cache or server db.
            var item = $(carouselTemplate).clone();
            $(item).find('#carousel-headline').html("Article headline #" + count);
            $(item).find('#carousel-hook').html("This is some catchy description that pulls you into the story.");
            $(item).find('#carousel-button-text').html("Read");
            
            $("#carousel_" + i).append(item);
        }

        var articleCount = 3; //Change this to count the user profile's saved articles.
        var articleTemplate = $('#article-template').html();

        for (var j = 0; j < articleCount; j++)
        {
            let count = j + 1;
            //Change the hard coded text to pull articles from the db or cache from the service worker.
            var article = $(articleTemplate).clone();
            $(article).find('#article-heading').html("Article headline #" + count + "<br/><span class=\"text-muted\"> Here's a catchy hook to lure you in</span>");
            $(article).find('#article-lead').html("This is the lead in for the article");
            $(article).find('#article-img').addClass('article-image' + count);

            $('#article-container').append(article);
        }
    });
})(jQuery);