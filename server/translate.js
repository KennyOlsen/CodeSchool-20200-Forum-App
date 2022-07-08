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
    //Every word in the list
    for (word in words) {
        //If that word matches any of the keys in the json file
        if (special.includes(words[word])) {
            //Once the specific key is found
            for (key in special) {
                //add the keys value to what's returned
                if (words[word] === special[key]) {
                    description += translate[special[key]] + " ";
                }
            }
        } else {
            //if there's no match then the original word will be return
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