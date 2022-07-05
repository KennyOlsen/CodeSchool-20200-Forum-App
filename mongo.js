const mongoose = requite('mongoose');
const db = mongoose.connection;

function connect(user, password, host, port, db) {
    const connectionString = `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`;

    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
};


function onConnect(callback) {
    db.once("open", () => {
        console.log("mongo connection open");
        callback();
    });
};


module.exports = {
    connect: connect,
    onConnect
};