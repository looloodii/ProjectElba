var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	meetupsController = require('./server/controllers/products-controller');


mongoose.connect('mongodb://localhost:27017/elba')

app.use(bodyParser());

app.get('/', function(req,res){
	res.sendFile(__dirname + '/client/views/index.html');
});

app.use('/js', express.static(__dirname+ '/client/js'));


app.get('/api/products', meetupsController.list);
app.post('/api/products', meetupsController.create);

app.listen(300, function(){
	console.log("Im listening..");
});