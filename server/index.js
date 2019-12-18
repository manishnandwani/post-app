var express=require('express');
var server = express()
var bodyParser = require('body-parser');

var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

server.use(express.static('../public/view'));
server.use(bodyParser.json())

var url = "mongodb://localhost:27017";
var db;

MongoClient.connect(url,function(err,client){
    db = client.db("demoDB");
    console.log("error :",err);
})

server.get("/list",function(req,res){
    console.log("test")
    db.collection("posts").find({}).toArray(function(err,results){
        console.log("test",results)
        res.json(results)
    })
})

server.post("/add",function(req,res){
    console.log("body",req.body)
    db.collection("posts").insertOne(req.body,function(err,results){
        console.log("lets0---",results,err)
        if(err == null){
            res.json(req.body)
        }
    })
})

server.put("/add",function(req,res){
    console.log("body",req.body)
    db.collection("posts").updateOne({name : req.params.name},{$set:{votes : req.params.votes}},function(err,results){
        console.log("lets0---",results,err)
        if(err == null){
            res.json(req.body)
        }
    })
})

server.listen(8000,function(){
    console.log("server started")
})
