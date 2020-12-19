var colors = ["DarkBlue", "MediumBlue", "Teal", "Green", "Yellow", "Orange", "PeachPuff", "Pink"]

if(Math.random()>.5){
  colors.reverse();
  console.log("Array reversed.")
}


var L1 = document.getElementById("canvasL1");
var ctx = L1.getContext("2d");
ctx.beginPath();
ctx.rect(100, 100, 100, 100);
var a = Math.floor(Math.random()*8);
ctx.fillStyle = colors[a];
a -= 4;
ctx.fill();

var L2 = document.getElementById("canvasL2");
var ctx = L2.getContext("2d");
ctx.beginPath();
ctx.rect(100, 100, 100, 100);
var b = Math.floor(Math.random()*8);
ctx.fillStyle = colors[b];
b -= 4;
ctx.fill();

var L3 = document.getElementById("canvasL3");
var ctx = L3.getContext("2d");
ctx.beginPath();
ctx.rect(100, 100, 100, 100);
var c = Math.floor(Math.random()*8);
ctx.fillStyle = colors[c];
c -= 4;
ctx.fill();

var L4 = document.getElementById("canvasL4");
var ctx = L4.getContext("2d");
ctx.beginPath();
ctx.rect(100, 100, 100, 100);
var d = Math.floor(Math.random()*8);
ctx.fillStyle = colors[d];
d -= 4;
ctx.fill();

var L5 = document.getElementById("canvasL5");
var ctx = L5.getContext("2d");
ctx.beginPath();
ctx.rect(100, 100, 100, 100);
var e = Math.floor(Math.random()*8);
ctx.fillStyle = colors[e];
e -= 4;
ctx.fill();

var L6 = document.getElementById("canvasL6");
var ctx = L6.getContext("2d");
ctx.beginPath();
ctx.rect(100, 100, 100, 100);
var f = Math.floor(Math.random()*8);
ctx.fillStyle = colors[f];
f -= 4;
ctx.fill();

var leftScore = a + b + c + d + e + f;



var R1 = document.getElementById("canvasR1");
var ctx = R1.getContext("2d");
ctx.beginPath();
ctx.rect(100, 100, 100, 100);
var g = Math.floor(Math.random()*8);
ctx.fillStyle = colors[g];
g -= 4;
ctx.fill();

var R2 = document.getElementById("canvasR2");
var ctx = R2.getContext("2d");
ctx.beginPath();
ctx.rect(100, 100, 100, 100);
var h = Math.floor(Math.random()*8);
ctx.fillStyle = colors[h];
h -= 4;
ctx.fill();

var R3 = document.getElementById("canvasR3");
var ctx = R3.getContext("2d");
ctx.beginPath();
ctx.rect(100, 100, 100, 100);
var i = Math.floor(Math.random()*8);
ctx.fillStyle = colors[i];
i -= 4;
ctx.fill();

var R4 = document.getElementById("canvasR4");
var ctx = R4.getContext("2d");
ctx.beginPath();
ctx.rect(100, 100, 100, 100);
var j = Math.floor(Math.random()*8);
ctx.fillStyle = colors[j];
j -= 4;
ctx.fill();

var R5 = document.getElementById("canvasR5");
var ctx = R5.getContext("2d");
ctx.beginPath();
ctx.rect(100, 100, 100, 100);
var k = Math.floor(Math.random()*8);
ctx.fillStyle = colors[k];
k -= 4;
ctx.fill();

var R6 = document.getElementById("canvasR6");
var ctx = R6.getContext("2d");
ctx.beginPath();
ctx.rect(100, 100, 100, 100);
var l = Math.floor(Math.random()*8);
ctx.fillStyle = colors[l];
l -= 4;
ctx.fill();

var rightScore = g + h + i + j + k + l;

console.log(leftScore)
console.log(rightScore)