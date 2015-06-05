express   = require('express');
app       = express();
server    = require('http').createServer(app)
io        = require('socket.io').listen(server);
path      = require('path');

server.listen(3000, function() {
  console.log("Started a server on port 3000");
});

twitter = require('ntwitter')

console.log(path.join(__dirname, '.'))
app.use(express.static(path.join(__dirname, '.')));
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/socket.io.html');
});

var twit = new twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});


io.sockets.on('connection', function(socket) {
   wcloud=[]
   count=0;
   dat=[]
twit.stream('statuses/filter', {'locations':'-78.06,38.80,-77.05,38.83'}, function(stream) {
  stream.on('data', function (data) {
    wc=data['text']


  var counts = data['text'].split(/\s+/).reduce(function(map, word){
    map[word] = (map[word]||0)+1;
    return map;
}, Object.create(null));
    
     for(var key in counts){
      wcloud.push({"text":key,"size":counts[key]+ Math.random() * 90})
    }
    dat.push({'x':count,'y':Math.random()*100})
    if(dat.length>50  || count==0){
       dat.shift()
      }

    count++;
     setInterval(function(){
      socket.emit('twitter',{'wc':wcloud,'ts':[{'name':"Baltimore",'color':"red",'data':dat}]})
      wcloud=[]

      //wcloud=[]
   },3000)

  });
});
}); 



// io.sockets.on('connection', function(socket) {
//   var twit = twitterModule.twit;
//   twit.stream('statuses/filter', {'locations':'-80.10,26.10,-80.05,26.15'},
//     function(stream) {
//       stream.on('data',function(data){
//         socket.emit('twitter',data);
//       });
//     });
// });
