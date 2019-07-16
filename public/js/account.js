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
    
(($) => {          
    $(document).ready(() =>
    {
        populateMyProfile();
/*

        var profileTemplate = $('#profile-template').html();
        var profileBody = $(profileTemplate).clone();
        $(profileBody).find('button').append('Sign out');
        $(profileBody).find('#prof-name').html("Name: " + prof["name"]);
        var topics = 2; //Change this to a server call.
        $(profileBody).find('#prof-topic-count').html("Followed Topics: " + prof["feeds"].length);
        var saved = 1; //Change this to a server call.
        $(profileBody).find('#prof-saved-count').html("Saved articles: " + saved);
        var showNotifications = false; //Change this to a server call.
        $(profileBody).find('#prof-notif-toggle').html("Notifications: " + (showNotifications === false ? "No" : "Yes"));
        $('#profile-body').append(profileBody);
*/
        
    });
})(jQuery);

var populateMyProfile = function()
{
    this.getMyProfile("devAdmin").then(renderProfile);
};

var renderProfile = function(profile)
{
    console.log("Name: " + profile["name"] + "\n"
        + "Feeds: " + profile["feeds"]);
    /* Profile Card */
    var profileTemplate = $('#profile-template').html();
    var profileBody = $(profileTemplate).clone();
    $(profileBody).find('button').append('Sign out');

    $(profileBody).find('#prof-name').html("Name: " + profile["name"]);
    $(profileBody).find('#prof-topic-count').html("Followed Topics: " + profile["feeds"].length);
    $(profileBody).find('#prof-saved-count').html("Saved articles: " + profile["savedArticles"].length);
    $(profileBody).find('#prof-notif-toggle').html("Notifications: " + (profile["notifications"] === false ? "No" : "Yes"));
    $('#profile-body').append(profileBody);

    /* Feed Card */
    var feedTemplate = $('#feed-template').html();
    var feedBody = $(feedTemplate).clone();
    $(feedBody).find('button').append('Add news feeds!');

    var feeds = profile["feeds"];
    var feedList = $(feedBody).find('#feed-list');
    for (var i = 0; i < feeds.length; i++)
    {
        $(feedList).append("<li>" + feeds[i] + "</li>");
    }
    $('#feed-body').append(feedBody);

    /* Saved Card */
    var savedTemplate = $('#saved-template').html();
    var savedBody = $(savedTemplate).clone();
    $(savedBody).find('button').append('Go to homepage');

    var savedArt = profile["savedArticles"];
    var news = fetch("/articles.json").then((resp) => // This is bad don't do this.
    {
        return resp.json();
    }).then((articles) =>
    {
        console.log(articles);
        var savedList = $(savedBody).find('#saved-list');
        for(var j = 0; j < savedArt.length; j++)
        {
            var headline;
            for(let k = 0; k < articles.length; k++)
            {
                if(articles[k].id == savedArt[j])
                {
                    headline = articles[k].headline;
                    $(savedList).append("<li><a href=#>" + headline + "</a></li>");
                    break;
                }
            }
        }
    });
    
    $('#saved-body').append(savedBody);
};