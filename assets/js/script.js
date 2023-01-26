//TODO: find a way to remove the \n characters from the article content. Might make displaying it look more like a proper madlib


// API call to Perigon's newsfeed API. Gets entire news articles by category.
function getArticle() {
    const perigonKey = "f52ad48a-9631-4f70-bcba-5913be0363a5"
    // TODO: if you want to let the user pick the topic of the article, their choice should probably go in the `?category=` parameter below
    const perigonUrl = `https://api.goperigon.com/v1/all?category=Business&sourceGroup=top100&showReprints=false&apiKey=${perigonKey}`

    fetch (perigonUrl)
    .then(function(response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then(function(results) {
        console.log(results);
        // TODO: call function here that deals with the article content
    });
}


