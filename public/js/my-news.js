$(document).ready( () =>
{
    populateMyNews();

});

var populateMyNews = function()
{
    //$.getJSON("/articles.json", renderMyNews);
    this.getMyNews().then(renderMyNews);
};

var renderMyNews = (stories) =>
{
    $("div#news-loading").hide();
    stories.forEach((story) => 
    {
        renderStory(story);
    });
};

var renderStory = (story) =>
{
    console.log("Render Story: " + story.headline);
};
