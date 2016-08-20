var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/encryptdata',function(req,res){  
 var JsonData=JSON.parse(req.body.jsondata);
   var enc=null;  
    /* var count = Object.keys(JsonData).length;
console.log("------------count="+count);*/
   for(var exKey in JsonData) {
   var encryptData=encrypt(JsonData[exKey]);
   if(enc!= null)
   enc= enc+","+ '"'+ exKey+'"'+":"+encryptData;
   else
   enc="{"+'"'+exKey+'"' +":"+encryptData;
  var dec=decrypt(encryptData);
  var dc=dc + exKey + ":" + dec;  
 // console.log(dc);
 }
 enc=enc+"}";
 console.log(dc);
  res.send(enc);
 // console.log("encryptData:"+encryptData);  
  //console.log(dc);
});

router.post('/decryptdata',function(req,res){
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

//console.log(dc);


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

module.exports = router;
