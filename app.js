var express = require('express')
var stripe = require('stripe')("sk_test_PnnVBxD7W4AqvhKocKemkdp0");
var hbs = require('hbs');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post('/charge',function(req,res){
    console.log(myPay.getAmount());
    var token = req.body.stripeToken;
    var chargeAmount = req.body.chargeAmount;
    var charge = stripe.charges.create({
        amount : chargeAmount,
        currency : "usd",
        source : token
    },function(err,charge){
        if(err & err.type === "StripeCardError"){
            console.log("Your card was declined");
        }
    });
    console.log("Payment was successful");
    res.end("Payment Successful");


})

app.listen(3000,function(){
    console.log("Stripe is running")
});