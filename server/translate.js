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

    return description
};

module.exports = translateWords;