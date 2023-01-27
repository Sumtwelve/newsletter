//TODO: find a way to remove the \n characters from the article content. Might make displaying it look more like a proper madlib

// FIXME: Loop through every word and determine if it's significant

// This is for WordsAPI, which apparently does in fact need an autorization key
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '70f84c207emsh212e85c968ec98cp163f85jsndc09b21c65ca',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

// these words are too boring to blank
const blackListedWords = [
    "a", "the", "or", "and", "be", "to", "it", "he", "she", "they",
    "with", "me", "you", "for", "because", "don't", "do", "on", "off", "an",
    "as"
];


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
        trimArticle(results.articles[1].content);
    });
}

function trimArticle(articleContent) {
    // split the article by sentence via the `.` character
    var split = articleContent.split(".");
    split.pop();
    split = split.slice(0, 6);

    blankTheWords(split);

    // rejoin by period to get string again
    var firstSixSentences = split.join(".");
    firstSixSentences = firstSixSentences.replaceAll("\n", "") + ".";
    console.log("joined and replaced: " + firstSixSentences);
}


function blankTheWords(sentenceArr) {
    
    var indexesToBlank = [];
    var partsOfSpeech = [];

    for (var i = 0; i < sentenceArr.length; i++) {
        var words = sentenceArr[i].split(" ");
        var middleIndex = Math.trunc(words.length / 2);
        var middleWord = words[middleIndex];
        if (blackListedWords.includes(middleWord)) {
            console.log("boring word found: " + middleWord);
            middleIndex++;
            middleWord = words[middleIndex];
            console.log("changed boring word to " + middleWord);
        }
        console.log("middleIndex: " + middleIndex);
        console.log("middleWord: " + middleWord);
        indexesToBlank[i] = middleIndex;

        partsOfSpeech[i] = getPartOfSpeech(middleWord);    
    }

    

    // debug stuff
    //console.log(indexesToBlank);

}

function getPartOfSpeech(word) {
    var wordsApiUrl = "https://wordsapiv1.p.rapidapi.com/words/" + word + "/definitions";

    fetch(wordsApiUrl, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}


getArticle();