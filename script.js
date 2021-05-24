// API URL: https://type.fit/api/quotes

let apiQuotes = [];
const quoteEl = document.querySelector("#quote");
const authorEl = document.querySelector("#author");
const loader = document.querySelector(".loader");
const quoteContainer = document.querySelector("#quote-container");

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  let i = Math.floor(Math.random() * apiQuotes.length);
  return (quote = apiQuotes[i]);
}

// Render quote and author
function renderQuote(quote) {
  if (!quote.author) {
    authorEl.innerText = "Unknown";
  } else {
    authorEl.innerText = quote.author;
  }

  if (quote.text.length > 50) {
    quoteEl.classList.add("long-quote");
  } else {
    quoteEl.classList.remove("long-quote");
  }

  //   Set Quote, Hide Loader
  quoteEl.innerText = quote.text;
  complete();
}
// Get quotes from API
async function getQuotes() {
  loading();
  const API_URL = "https://type.fit/api/quotes";

  try {
    const res = await fetch(API_URL);
    apiQuotes = await res.json();
    newQuote();
    renderQuote(quote);
  } catch (error) {
    console.error(error);
  }
}
// On Load
getQuotes();

// New Quote Generator
const newQuoteBtn = document.querySelector("#new-quote");
newQuoteBtn.addEventListener("click", getQuotes);

// Tweet Quote
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteEl.textContent} - ${authorEl.textContent}`;
  window.open(twitterURL, "_blank");
}

const tweetBtn = document.querySelector("#twitter");
tweetBtn.addEventListener("click", tweetQuote);
