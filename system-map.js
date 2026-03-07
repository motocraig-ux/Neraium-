const mapCanvas = document.getElementById("systemMap");

if (mapCanvas) {

const ctx = mapCanvas.getContext("2d");

let nodes = [];
const CLUSTERS = 4;
const NODES_PER_CLUSTER = 8;

function resize(){
mapCanvas.width = mapCanvas.offsetWidth;
mapCanvas.height = mapCanvas.offsetHeight;
}

window.addEventListener("resize", resize);
resize();

for(let c = 0; c < CLUSTERS; c++){

let centerX = Math.random() * mapCanvas.width;
let centerY = Math.random() * mapCanvas.height;

for(let i = 0; i < NODES_PER_CLUSTER; i++){

nodes.push({
x: centerX + (Math.random() - 0.5) * 120,
y: centerY + (Math.random() - 0.5) * 120,
vx: (Math.random() - 0.5) * 0.25,
vy: (Math.random() - 0.5) * 0.25,
alert: Math.random() < 0.08
});

}

}

function draw(){

ctx.clearRect(0,0,mapCanvas.width,mapCanvas.height);

for(let i = 0; i < nodes.length; i++){

let n = nodes[i];

n.x += n.vx;
n.y += n.vy;

if(n.x < 0 || n.x > mapCanvas.width) n.vx *= -1;
if(n.y < 0 || n.y > mapCanvas.height) n.vy *= -1;

for(let j = i + 1; j < nodes.length; j++){

let m = nodes[j];

let dx = n.x - m.x;
let dy = n.y - m.y;
let dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 140){

ctx.beginPath();
ctx.moveTo(n.x,n.y);
ctx.lineTo(m.x,m.y);

if(n.alert || m.alert){
ctx.strokeStyle = "rgba(255,155,61," + (1 - dist/140) * .6 + ")";
}else{
ctx.strokeStyle = "rgba(69,215,255," + (1 - dist/140) * .3 + ")";
}

ctx.lineWidth = 1;
ctx.stroke();

}

}

ctx.beginPath();
ctx.arc(n.x, n.y, 2.5, 0, Math.PI*2);

if(n.alert){
ctx.fillStyle = "#ff9b3d";
}else{
ctx.fillStyle = "#7da2ff";
}

ctx.fill();

}

requestAnimationFrame(draw);

}

draw();

}