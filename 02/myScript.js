// variable globale
let monCanvas;
let ctx;
let rayon = 60;
let angle = 0;

function start() {
    monCanvas = document.getElementById("canvas");
    ctx = monCanvas.getContext("2d");
    
    ctx.canvas.width  = 600;
    ctx.canvas.height = 600;

    animate();
}

function animate() {
  ctx.clearRect(0, 0, monCanvas.width, monCanvas.height);
  

  draw();

  requestAnimationFrame(animate);
}

function draw() {
  let numX = 10;
  let numY = 10;
  
    for(let i = 0; i < numY; i++){
        for(let j = 0; j < numX; j++){
                let posX = i * rayon + rayon/2;
                let posY = j * rayon + rayon/2;
                let ellipseSizeX = Math.abs(Math.cos(angle * (Math.PI / 180)) * rayon +i);
                let ellipseSizeY = Math.abs(Math.cos(angle * (Math.PI / 180)) * rayon +j);
                ctx.beginPath();
            
                ctx.strokeStyle = 'white';
                ctx.ellipse(posX, posY, ellipseSizeX, ellipseSizeY, 45 * Math.PI/180, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.closePath();
            
        }
    }

  angle += 0.5;
  if (angle > 360) {
    angle = 0;
  }
}

window.onload = () => {
  start();
};
