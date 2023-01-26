//TODO: find a way to remove the \n characters from the article content. Might make displaying it look more like a proper madlib


//const axios = require('axios');
const apiKey = "f52ad48a-9631-4f70-bcba-5913be0363a5"
const url = `https://api.goperigon.com/v1/all?category=Business&sourceGroup=top100&showReprints=false&apiKey=${apiKey}`

fetch (url)
.then(function(response) {
    if (!response.ok) {
        throw response.json();
    }
    return response.json();
})
.then(function(results) {
    console.log(results);
    printContent(results);
});

function printContent(data) {
    
}