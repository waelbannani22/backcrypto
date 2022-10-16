const { error } = require('console')
const express =require('express')
const mongoose =require('mongoose')
require("dotenv").config();
var Router = require("./routes/routes")


var app = express()

app.use(express.json()) 
//app.use("/api/users", users);
//app.use("/api/password-reset", passwordReset);




const url = 'mongodb+srv://goCrypto:goCrypto@gocrypto.jqayc8t.mongodb.net/?retryWrites=true&w=majority'
const connectionParms={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url,connectionParms);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(Router);
//app.use(RouterRecruiter);
app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running on 3000")
});