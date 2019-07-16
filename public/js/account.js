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
        var profileTemplate = $('#profile-template').html();
        var profileBody = $(profileTemplate).clone();
        $(profileBody).find('button').append('Sign out');

        $(profileBody).find('#prof-name').html("Name: Bob Kerman");
        var topics = 2; //Change this to a server call.
        $(profileBody).find('#prof-topic-count').html("Followed Topics: " + topics);
        var saved = 1; //Change this to a server call.
        $(profileBody).find('#prof-saved-count').html("Saved articles: " + saved);
        var showNotifications = false; //Change this to a server call.
        $(profileBody).find('#prof-notif-toggle').html("Notifications: " + (showNotifications === false ? "No" : "Yes"));
        $('#profile-body').append(profileBody);

        /* Feed Card */
        var feedTemplate = $('#feed-template').html();
        var feedBody = $(feedTemplate).clone();
        $(feedBody).find('button').append('Add news feeds!');

        var feedCount = 2; //Change this to a server call
        var feedList = $(feedBody).find('#feed-list');
        for(var i  = 0; i < feedCount; i++)
        {
            $(feedList).append('<li>topic</li>'); //Change this to be each saved topic
        }
        $('#feed-body').append(feedBody);

        /* Saved Card */
        var savedTemplate = $('#saved-template').html();
        var savedBody = $(savedTemplate).clone();
        $(savedBody).find('button').append('Go to homepage');

        var savedCount = 2; //Change this to a server call
        var savedList = $(savedBody).find('#saved-list');
        for(var j = 0; j < savedCount; j++)
        {
            $(savedList).append("<li><a href=#>Story</a></li>"); //Change this later to pull from each article
        }
        $('#saved-body').append(savedBody);
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
    /*
    var profileTemplate = $('#profile-template').html();
    var profileBody = $(profileTemplate).clone();
    $(profileBody).find('button').append('Sign out');

    $(profileBody).find('#prof-name').html("Name: Bob Kerman");
    var topics = 2; //Change this to a server call.
    $(profileBody).find('#prof-topic-count').html("Followed Topics: " + topics);
    var saved = 1; //Change this to a server call.
    $(profileBody).find('#prof-saved-count').html("Saved articles: " + saved);
    var showNotifications = false; //Change this to a server call.
    $(profileBody).find('#prof-notif-toggle').html("Notifications: " + (showNotifications === false ? "No" : "Yes"));
    $('#profile-body').append(profileBody);
    */
};