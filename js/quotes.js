const quotes = [
    {
        quote: "string1",
        author: "name1"
    },
    {
        quote: "string2",
        author: "name2"
    },
    {
        quote: "string3",
        author: "name3"
    },
    {
        quote: "string4",
        author: "name4"
    },
    {
        quote: "string5",
        author: "name5"
    },
    {
        quote: "string6",
        author: "name6"
    },
    {
        quote: "string7",
        author: "name7"
    },
    {
        quote: "string8",
        author: "name8"
    },
    {
        quote: "string9",
        author: "name9"
    },
    {
        quote: "string10",
        author: "name10"
    }
];

const quote = document.querySelector("#quote span:first-child")
const author = document.querySelector("#quote span:last-child")

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
