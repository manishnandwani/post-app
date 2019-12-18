var express=require('express');

var server = express()

server.use(express.static('../public/view'));

server.get("/home",function(req,res){
        res.json({user:"Hello world"})
})


server.listen(8081,function(){
    console.log("server started")
})
