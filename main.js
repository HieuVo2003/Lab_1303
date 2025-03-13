
let mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/2fcooots");
mongoose.connection.on("connected", () => {
    console.log('connected');
});



