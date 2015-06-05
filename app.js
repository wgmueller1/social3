express   = require('express');
app       = express();
server 		= require('http').createServer(app)
io 				= require('socket.io').listen(server);
path  		= require('path');
//kafka = require('kafka-node');


server.listen(3000, function() {
	console.log("Started a server on port 3000");
});


app.use(express.static(path.join(__dirname, '.')));
console.log(path.join(__dirname, '.'))
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/socket.io.html');
});


//var twit = new twitter({
//  consumer_key='HFsb54NtnARBo4v4NFP8PUOhw',
//  consumer_secret='I9F4yBsJGbgb701uhuHyLZvVe7ujPrrNzmnFAihWerxs39GEqN',
//  access_token_key='14101936-Sdu7uzhMpfv0IgGWpNzU8cwiq5hNxuz2FzcrerVzp',
//  access_token_secret='nMRjzUR4A7YiIcOcSYmQIXYTQZasTYqL4zMYCZf1YX76w'         
//});





//var data2=[{"color":"red","name":"Baltimore","data":[{"x":0,"y":Math.random()*100}]}]
dat=[]
io.sockets.on('connection', function (socket) {
	incr = 0;
	var sendData = function() {
		data = [
			{
				"color": "blue",
				"name": "New York",
				"data": [ { "x": 0, "y": incr }, { "x": 1, "y": 49 }, { "x": 2, "y": 38 }, { "x": 3, "y": 30 }, { "x": 4, "y": 32 } ]
			}, {
			  "color": "red",
				"name": "London",
				"data": [ { "x": 0, "y": 19 }, { "x": 1, "y": incr }, { "x": 2, "y": 29 }, { "x": 3, "y": 20 }, { "x": 4, "y": 14 } ]
			}, {
			  "color": "black",
				"name": "Tokyo",
				"data": [ { "x": 0, "y": 8 }, { "x": 1, "y": 12 }, { "x": 2, "y": incr }, { "x": 3, "y": 11 }, { "x": 4, "y": 10 } ]
			}
	  ]      
               
                dat.push({'x':incr,'y':Math.random()*100})
                if(dat.length>50  || incr==0){
                dat.shift()
                }  
		socket.emit('twitter', [{"color":"red","name":"Baltimore","data":dat}]);
		incr++;
	}
	var run = setInterval(sendData, 1000);
  socket.on('disconnect', function() {
    clearInterval(run);
	});
});
