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

const postSchema = mongoose.Schema(
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      body: { type: String, required: true, default: "I am Groot" },
      thread_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
        required: true,
      },
    },
    { timestamps: true }
  );

const Post = mongoose.model("Post", postSchema);

const threadSchema = mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {type: String, required: true, default: "I am Groot"},
        description: {type: String, required: true, default: "I am Groot"},
        posts: {type: [postSchema], required: false, default: []},
        category: {type: String, required: true, default: ""}
    },
    {
        timestamps: true,
        //toJSON: {virtuals: true}
    }
);

const Thread = mongoose.model("Thread", threadSchema);


/*threadSchema.pre("save", () => {
    this.name = "I am Groot";
    this.description = "I am Groot";
    this.category = "I am Groot";
    next();
})*/

module.exports = {
    User,
    Thread,
    Post
};