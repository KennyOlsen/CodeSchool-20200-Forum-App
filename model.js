const mongoose = require("mongoose");
const { mainModule } = require("process");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {type: String, required: true},
    password: {type:String, required: true}
});

const User = mongoose.model("User", userSchema);

module.exports = {
    User
};