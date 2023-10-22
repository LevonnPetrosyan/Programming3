var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get("/", function (req, res) {
   res.redirect("index.html");
});

server.listen(3000, function () {

   console.log("App is running on port 3000");

});

socket.on('update season', count)

let Grass = require('./grass');
let GrassEater = require('./grassEater');
let Predator = require('./predator');
let BombDnox = require('./bombDnox');
let Bomb = require('./bomb');
let Sapper = require('./sapper');

let random = require("./random");

var n = 50
var m = 50

matrix = [];

grassArr = [];
grassEaterArr = [];
predatorArr = [];
bombDnoxArr = [];
bombArr = [];
sapperArr = [];


for (let i = 0; i < n; i++) {
   matrix.push([])
   for (let j = 0; j < m; j++) {
      matrix[i].push(0)
   }
}



function characters(index, count) {
   for (let i = 0; i < count; i++) {
      var v = Math.floor(random( n))
      var w = Math.floor(random( m))
      matrix[v][w] = index
   }
}

function setupGame() {
  


   characters(1, 75)
   characters(2, 5)
   characters(3, 3)
   characters(4, 1)
   characters(5, 0)
   characters(6, 1)
   for (var y = 0; y < matrix.length; ++y) {
      for (var x = 0; x < matrix[y].length; ++x) {
         if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
         }
         else if (matrix[y][x] == 2) {
            var grEa = new GrassEater(x, y, 2);
            grassEaterArr.push(grEa);
         }
         else if (matrix[y][x] == 3) {
            var pre = new Predator(x, y, 3);
            predatorArr.push(pre);
         }
         else if (matrix[y][x] == 4) {
            var bd = new BombDnox(x, y, 4);
            bombDnoxArr.push(bd);
         }
         else if (matrix[y][x] == 5) {
            var bmb = new Bomb(x, y, 5);
            bombArr.push(bmb);
         }
         else if (matrix[y][x] == 6) {
            var sap = new Sapper(x, y, 6);
            sapperArr.push(sap);
         }
      }
   }
}

function playGame() {

   for (var i in grassArr) {
      grassArr[i].mul();
   }
   for (var i in grassEaterArr) {
      grassEaterArr[i].eat();
   }
   for (var i in predatorArr) {
      predatorArr[i].eat();
   }
   for (var i in bombDnoxArr) {
      bombDnoxArr[i].eat();
   }
   for (var i in bombArr) {
      bombArr[i].eat();
   }
   for (var i in sapperArr) {
      sapperArr[i].eat();
   }
   io.emit('update matrix', matrix)
}

let intervalID ;
   if (count%2==0) {
      intervalID = 2000
   }
   else{
      intervalID=500
   }
   

function startPlaying() {
   clearInterval(intervalID)
   intervalID = setInterval(() => {
      playGame()
   }, 1000)
}

io.on('connection', function (socket) {
   socket.emit('update matrix', matrix)
   setupGame()
   startPlaying()
})

