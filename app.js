//jshint esversion:6
const express= require("express");
const bodyParser = require('body-parser');
const http=require("http");
const request = require('request');
var bagName;
var query;
let json;

const app= express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.render("index",{proDetails:bagName, barCode:query});
  query="";bagName="";

});

app.post("/",function(req,res){
 query=req.body.WarrantyNo;
const url="http://210.210.25.108/VipServices/api/AccessApi/CheckDetail?Barcode="+query;

http.get(url,function(response){

response.on("data",function(data){
//
const responseData=JSON.parse(data);
bagName=responseData.Message[0].Msg;
console.log(responseData);
//res.write("Product description:");
res.redirect("/");
});
});

});

app.listen(process.env.PORT||4000, function(){
  console.log("Server is ruuning");
});
