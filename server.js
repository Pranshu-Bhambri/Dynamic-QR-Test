const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let myCode;

app.get('/', function(req, res){
   
    res.render("index");
    
});

app.post("/", function(req, res){

    myCode= req.body.randomcode;
    console.log(myCode);
});

app.get("/establish-connection/:code", function(req, res){
    console.log(myCode);
    if(req.params.code=== myCode){
        res.send("COOL !");
    }
    else{
        res.send("NOT COOL !");
    }
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});