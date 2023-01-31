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
    // SPLIT THE ARTICLE INTO SENTENCES VIA REGEX
    // This regex is flawed because it will not split the sentence if it ends with a capitalized word.
    // But for out purposes, that's much better than the sentence splitting after abbreviations.
    const reg = /(\S.*? [a-z]+[.?!])(?=\s+|$)/g; // credit to StackOverflow user Avinash Raj: https://stackoverflow.com/users/3297613/avinash-raj https://stackoverflow.com/questions/27878054/how-can-i-get-my-regular-express-to-capture-complete-sentences-and-not-abbreviat
    var sentences = articleContent.match(reg);
    
    sentences = sentences.slice(0, 6);
    console.log(sentences);

    blankTheWords(sentences);

    // rejoin by period to get string again
    var firstSixSentences = sentences.join(" ");
    firstSixSentences = firstSixSentences.replaceAll("\n", "") + ".";
    console.log("joined and replaced: " + firstSixSentences);
}


function blankTheWords(sentences) {
    
    var indexesToBlank = [];
    
    // Commented out 1/30 due to time constraint
    //var partsOfSpeech = [];

    for (var i = 0; i < sentences.length; i++) {
        var words = sentences[i].match(/[A-Za-z0-9_-]+/g);
        var middleIndex = Math.trunc(words.length / 2);
        var middleWord = words[middleIndex];
        // This was an attempt at a system to prevent selecting boring words like "a" and "the"
        // Commented out 1/30/2023 because it is flawed and we don't have time to come up with a better one.
        // if (blackListedWords.includes(middleWord)) {
        //     console.log("boring word found: " + middleWord);
        //     middleIndex++;
        //     middleWord = words[middleIndex];
        //     console.log("changed boring word to " + middleWord);
        // }
        console.log("middleIndex: " + middleIndex);
        console.log("middleWord: " + middleWord);
        indexesToBlank[i] = middleIndex;

        // Get the part of speech of the blanked word. Commented out 1/30 due to time constraint
        //partsOfSpeech[i] = getPartOfSpeech(middleWord);    
    }

    var wordEntryForm = document.getElementById("word-entry");
    for (var i = 0; i < indexesToBlank.length; i++) {
        var wordInput = document.createElement("input");
        wordInput.setAttribute("id", ("user-word-" + i));
        wordInput.setAttribute("form", "word-entry");
        wordInput.required = true;
        wordEntryForm.appendChild(wordInput);
    }
    

    wordEntryForm.addEventListener("submit", function( event ) {
        event.preventDefault();

        var userWords = new Array(indexesToBlank.length);
        for (var i = 0; i < userWords.length; i++) {
            var userWord = document.getElementById(("user-word-" + i)).value;
            userWords[i] = userWord;

            //var words = sentences[i].match(/[A-Za-z0-9_-]+/g);
            var words = sentences[i].split(" ");
            words[indexesToBlank[i]] = userWord;
            var newSentence = words.join(" ");
            sentences[i] = newSentence;
        }

        wordEntryForm.remove();

        var finishedArticle = document.createElement("p");
        finishedArticle.textContent = sentences.join(" ");

        var finishedArticleDiv = document.getElementById("finished-article-container");
        finishedArticleDiv.appendChild(finishedArticle);

    });

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