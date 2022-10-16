const ctx = canvas.getContext("2d");
ctx.canvas.width  = 600;
ctx.canvas.height = 400;

let numX = 20;
let numY = 10;
let tailleX = canvas.width / numX;
let tailleY = canvas.height / numY;

let increment = 0.25;


function mainLoop(){
    ctx.beginPath();

    for(let j=0; j<numY; j++){
        for(let i=0; i<numX; i++){
            const x = i * tailleX;
            const y = j * tailleY;
            
            ctx.fillStyle = `rgb(
                ${Math.floor(255 - numY * i)*1.5},
                ${Math.floor(255 - numX * j)},
                ${Math.floor(255 - numX * i)})`; //r, g, b
                ctx.fillRect(x, y, tailleX, tailleY);
        }
    }
    
    testSize();
    numX += increment;
    tailleX = canvas.width / numX;
    requestAnimationFrame(mainLoop);
    console.log(numX);
}

function testSize(){
    if(numX === 25){
        increment = -increment;
    }else if(numX === 15){
        increment = Math.abs(increment);
    }
}


requestAnimationFrame(mainLoop);

            