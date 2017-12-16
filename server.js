var express = require('express');
var bodyParser = require('body-parser');
var request = require ('request');

var app = express()

var port = process.env.PORT || 3000;
var ip = process.env.IP || "127.0.0.1";

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/',function(req,res){
    if (req.body.result.action == "tanyaSyaratUmur"){

        var umur = req.body.result.parameters.age;
        console.log(umur);

        var response ="";

        if(umur.amount>=20){
            response ="Ya, anda sudah bisa mengajukan cicilan. Silahkan hubungi Sales kami di kantor cabang terdekat"
        } else{
            response ="Maaf Anda tidak bisa melanjutkan aplikasi"
        }

        res.json({
            "speech" : response,
            "displayText" : response
        })

    }

     else if(req.body.result.action == "tanyaCuaca"){
        
        var kota = req.body.result.parameters.city;
        var url = "http://api.openweathermap.org/data/2.5/weather?q="+kota+"&appid=3cb990d88b65039fee8580149c25fa26";
            request(url, function(error, request, body){
            var temp = Math.round(JSON.parse(body).main.temp - 273.15);
            //console.log(temp)
            var bodyObject = JSON.parse(body);
            var cuaca = bodyObject.weather[0].description;
            var ico = bodyObject.weather[0].icon;
            var responseText = "Cuaca dan Suhu di kota " +kota+ " adalah " +cuaca+" dengan suhu " +temp+ " derajat Celcius"
            
            res.json({"speech": responseText,"displayText":responseText})
            console.log(responseText)
            //console.log(cuaca)
        })
        
        
    }
})

app.listen(port,ip);
