//(($) => {          
    $(document).ready(() =>
    {
        var carouselTemplate = $('#carousel-template').html();

        for (var i = 0; i < 3; i++)
        {
            //Replace the hard coded text here with calls to the service worker to retrieve from cache or server db.
            var item = $(carouselTemplate).clone();
            $(item).find('#carousel-headline').html("Article headline #" + i);
            $(item).find('#carousel-hook').html("This is some catchy description that pulls you into the story.");
            $(item).find('#carousel-button-text').html("Read");
            
            $("#carousel_" + i).append(item);
            console.log("appended carousel_" + i);
        }

        var articleCount = 3; //Change this to count the user profile's saved articles.
        var articleTemplate = $('#article-template').html();

        for (var j = 0; j < articleCount; j++)
        {
            //Change the hard coded text to pull articles from the db or cache from the service worker.
            var article = $(articleTemplate).clone();
            $(article).find('#article-heading').html("Article headline #" + j + "<br/><span class=\"text-muted\"> Here's a catchy hook to lure you in</span>");
            $(article).find('#article-lead').html("This is the lead in for the article");
            //We may need to find a better way to set the img then through the css.
            var img = j + 1;
            $(article).find('#article-img').addClass('article-image' + img);

            $('.breaking').append(article);
            console.log("appended article " + j);
        }
    });
//})(jQuery);

var addTopicSubscription = function(userId, topic)
{
    var topicSubDetails = {
        id:     userId,
        topic:  topic
    };
    addToObjectStore("")
};

var showNewNewsNotification = function() 
{
    navigator.serviceWorker.ready.then(function(newsReg)
    {
        newsReg.showNotification("Subscribed to new topic!",
        {
            body:
                "You are now subscribed to receive notifications\n" +
                "from a new topic.",
            icon: "",
            badge: "",
            tag: "new-subscription"
        });
    });
};

var offerNotification = function() 
{
    if("Notification" in window
        && "serviceWorker" in navigator) 
        {
            Notification.requestPermission().then(function(permission)
            {
                if(permission === "granted")
                {
                    //Show News notification
                }
            });
        }
};
