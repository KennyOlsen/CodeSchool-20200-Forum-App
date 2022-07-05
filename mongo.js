const mongoose = require('mongoose');
const db = mongoose.connection;

async function connect(user, password) {
    //const connectionString = `mongodb+srv://${user}:${password}@${host}:${port}/${db_name}`;
    const connectionString = `mongodb+srv://${user}:${password}@cluster0.ywnlx6p.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true})
    } catch (err) {
        console.log("mongo connect function, error connecting to mongoose---" + err);
    };
};


function onConnect(callback) {
    db.once("open", () => {
        console.log("mongo connection open");
        callback();
    });
};


module.exports = {
    connect: connect,
    onConnect: onConnect
};