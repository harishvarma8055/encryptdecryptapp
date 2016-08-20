var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', routes);

app.use('/users', users);
app.post('/encryptdata',function(req,res){  

 var JsonData=JSON.parse(req.body.jsondata);

   var enc=null;  
  

   for(var exKey in JsonData) {
   var encryptData=encrypt(JsonData[exKey]); 
   /*var encryptData=JsonData[exKey];

   var data=JSON.stringify(JsonData[exKey]);

   if(data.charAt(0)=='{'){

   var innerjson=JSON.parse(data);

  console.log("Inner"+innerjson);
JsonData=innerjson;
 var count = Object.keys(JsonData).length;
  console.log("------------count="+count);
console.log(JsonData);
}


   console.log("String"+data);
   */

   if(enc!= null)
   enc= enc+","+ '"'+ exKey+'"'+":"+'"'+encryptData+'"';
   else
   enc="{"+'"'+exKey+'"' +":"+'"'+encryptData+'"';
  var dec=decrypt(encryptData);
  var dc=dc + exKey + ":" + dec;  
 // console.log(dc);*/
 }
//}
 enc=enc+"}";
 console.log(dc);
  res.send(enc);
 // console.log("encryptData:"+encryptData);  
  //console.log(dc);
});

app.post('/decryptdata',function(req,res){
var encData=JSON.parse(req.body.encryptedData);
var decd=null;
for(var exKey in encData) {
  var decryptData=decrypt(encData[exKey]);
  if(decd!= null)
   decd= decd+","+ '"'+ exKey+'"'+":"+'"'+decryptData+'"';
   else
   decd="{"+'"'+exKey+'"' +":"+'"'+decryptData+'"';
}
decd=decd+"}";
res.send(decd);
});

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
 
  var cipher = crypto.createCipher(algorithm,password);
  var crypted = cipher.update(text,'utf8','hex');
  crypted +=cipher.final('hex'); 
  console.log("crypted:"+crypted);
  return crypted;
} 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}

app.listen(3000);
module.exports = app;
