// API URL: https://type.fit/api/quotes
const API_URL = "https://type.fit/api/quotes";
const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector("#text");
const quoteAuthor = document.querySelector("#author");
const newQuoteBtn = document.querySelector("#new");
const tweetBtn = document.querySelector("#twitter");
const loader = document.querySelector(".loader");
// Loader loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Get Quote from API
async function getQuote() {
  loading();
  const res = await fetch(API_URL);
  const data = await res.json();
  renderQuote(data);
}

// Render Quote to DOM
function renderQuote(quotes) {
  loading();
  const random = Math.floor(Math.random() * quotes.length);
  const quote = quotes[random];

  //   Check if quote author is null, replace with unknown
  if (!quote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }

  //   Check if quote length > 20, add 'long-quote' class
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}

function tweetQuote() {
  const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(tweetURL, "_blank");
}

// Get new quote
newQuoteBtn.addEventListener("click", getQuote);
getQuote();

// Tweet
tweetBtn.addEventListener("click", tweetQuote);
