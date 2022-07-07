const URL = "https://api.funtranslations.com/translate/shakespeare.json"

const express = require("express");
const app = express();

//const fetch = require("node-fetch");

const translate = require("./translate.json");

//changes matching words to other words
const translateWords = function(input) {
    let special = Object.keys(translate);
    let words = input.split(" ");
    let description = "";
    for (word in words) {
        if (special.includes(words[word])) {
            for (key in special) {
                if (words[word] === special[key]) {
                    description += translate[special[key]] + " ";
                }
            }
        } else {
            description += words[word] + " ";
        }
    }

    /*let parsed = "?text=" + encodeURIComponent(input);
    console.log(parsed);

    let response = await fetch(URL + parsed)
    let answer = await response.json()
    console.log("answer: " + answer);

    let description = answer["contents"]["translated"];*/

    return description
};

module.exports = translateWords;