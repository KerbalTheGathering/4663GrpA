$(document).ready( () =>
{
    populateMyNews();

});

var populateMyNews = () => 
{
    //getMyNews().then(renderMyNews);
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

};
