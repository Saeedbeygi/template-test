const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-qoute');
const loader = document.getElementById('loader');


let apiQuotes = [];

// Show laoder

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hidden loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


//Show New Quotes
loading();
function newQuote(){
    // Pick a random quotes from apiQuotes array
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
// Check if Author field is blank and replace it with '
if (!quote.author) {
    authorText.textContent = 'Unknwn';
} else {
authorText.textContent = quote.author;
}
//check Quote lenghth to determine styling.
if (quote.text.lenght > 50) {
    quoteText.classList.add('long-quote');

} else {
    quoteText.classList.remove('long-quote');
}
// Set Quote, Hidden Loader
quoteText.textContent = quote.text;
complete();
}
//Get Quotes From API 

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
try {
const response = await fetch(apiUrl);
apiQuotes = await response.json();
newQuote();
} catch (error){
    // Catch Error Here

}

}
// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
 window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// on Load
getQuotes();

//newQuote();