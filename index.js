const app = require('/server');

const {connect, onConnect} = require("/mongo");

app.listen(808, () => {
    console.log("server running on port 8080");
})