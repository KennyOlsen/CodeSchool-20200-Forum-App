const inputs = {
    user: "kennyOlsen",
    password: "kenny)LSEN123"
}


const app = require('./server/server');

const {connect, onConnect} = require("./mongo");

onConnect(() => {
    app.listen(8080, () => {
        console.log("server running on port 8080");
    });
});

try {
    connect(inputs.user, inputs.password);
} catch(err) {
    console.log("error connecting to mongo---" + err);
}