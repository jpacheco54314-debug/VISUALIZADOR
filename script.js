document.getElementById("fileInput").addEventListener("change", function(event){

const file = event.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

const data = JSON.parse(e.target.result);

drawSnowflake(data.size, data.depth);

};

reader.readAsText(file);

});


function drawSnowflake(size, depth){

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.save();
ctx.translate(300,300);

function fractal(length, level){

if(level === 0){

ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(length,0);
ctx.stroke();

ctx.translate(length,0);
return;

}

length = length/3;

fractal(length, level-1);

ctx.rotate(Math.PI/3);
fractal(length, level-1);

ctx.rotate(-2*Math.PI/3);
fractal(length, level-1);

ctx.rotate(Math.PI/3);
fractal(length, level-1);

}

for(let i=0;i<3;i++){

fractal(size, depth);
ctx.rotate(2*Math.PI/3);

}

ctx.restore();

}