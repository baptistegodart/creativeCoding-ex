/**
 *  EASING REF:
 *  https://easings.net/#
 */

class App {
  constructor() {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth * this.pixelRatio;
    this.canvas.height = window.innerHeight * this.pixelRatio;
    this.canvas.style.width = window.innerWidth;
    this.canvas.style.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.setup();
  }


  setup() {
    const center = {
      x: (window.innerWidth / 2) * this.pixelRatio,
      y: (window.innerHeight / 2) * this.pixelRatio,
    };
    const sizes = {
      face: 200,
      eyes: 200/1.5 // -> sizes.face/1.5
    };

    // FACE
    this.circle = new Circle(center.x, center.y, sizes.face, this.ctx);

    //LEGS
    this.legs = new Array(
      new Leg(0, 0, this.circle.position.x, this.circle.position.y, this.ctx),
      new Leg(this.canvas.width, 0, this.circle.position.x, this.circle.position.y, this.ctx),
      new Leg(0, this.canvas.height, this.circle.position.x, this.circle.position.y, this.ctx),
      new Leg(this.canvas.width, this.canvas.height, this.circle.position.x, this.circle.position.y, this.ctx)
    );

    this.leg1X = 0
    this.leg1Y = 0
    this.leg2X = this.canvas.width
    this.leg2Y = 0
    this.leg3X = 0
    this.leg3Y = this.canvas.height
    this.leg4X = this.canvas.width
    this.leg4Y = this.canvas.height

    document.addEventListener("mousemove", this.moved.bind(this));
    document.addEventListener("mousedown", this.pressed.bind(this));
    document.addEventListener("mouseup", this.released.bind(this));
    document.addEventListener("keydown", this.keydown.bind(this));

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
    this.legs[0].draw(this.leg1X, this.leg1Y, this.circle.position.x, this.circle.position.y)
    this.legs[1].draw(this.leg2X, this.leg2Y, this.circle.position.x, this.circle.position.y)
    this.legs[2].draw(this.leg3X, this.leg3Y, this.circle.position.x, this.circle.position.y)
    this.legs[3].draw(this.leg4X, this.leg4Y, this.circle.position.x, this.circle.position.y)
    
    if(this.press && this.move){
      this.circle.drawOnMousePressed(this.positionMouseX, this.positionMouseY);
    }else{
      this.circle.draw();
    }

    requestAnimationFrame(this.draw.bind(this));
  }

  pressed(e) {
    this.press = true;
    console.log(this.positionMouseX, this.positionMouseY);
  }
  moved(e) {
    this.move = true;
    this.positionMouseX = e.clientX * this.pixelRatio;
    this.positionMouseY = e.clientY * this.pixelRatio;
    console.log(this.press, this.move)
  }
  released(e) {
    this.press = false;
    this.circle.returnOrigin(e.clientX * this.pixelRatio, e.clientY * this.pixelRatio);
    console.log(this.press, this.move);
  }

  keydown(e){
    switch (e.key) {
      case '1':
        console.log('clicked 1');
        this.leg1X = this.positionMouseX
        this.leg1Y = this.positionMouseY
        break;
      case '2':
        console.log('clicked 2');
        this.leg2X = this.positionMouseX
        this.leg2Y = this.positionMouseY
        break;
      case '3':
        console.log('clicked 3');
        this.leg3X = this.positionMouseX
        this.leg3Y = this.positionMouseY
        break;
      case '4':
        console.log('clicked 4');
        this.leg4X = this.positionMouseX
        this.leg4Y = this.positionMouseY
        break;
      case 'Enter':
        console.log('clicked Enter');
        // Calculer le centre du premier triangle
        this.x1 = (this.leg1X + this.leg2X + this.leg4X)/3
        this.y1 = (this.leg1Y + this.leg2Y + this.leg4Y)/3

        // Calculer le centre du deuxième triangle
        this.x2 = (this.leg1X + this.leg3X + this.leg4X)/3
        this.y2 = (this.leg1Y + this.leg3Y + this.leg4Y)/3

        // Calculer le centre entre les deux points centraux des triangles
        this.newCenterX = Math.floor((this.x1 + this.x2)/2)
        this.newCenterY = Math.floor((this.y1 + this.y2)/2)

        this.circle.changeTarget(this.newCenterX, this.newCenterY)

        console.log(this.newCenterX, this.newCenterY);
        break;
      default:
        
      }
  }
}

window.onload = function () {
  new App();
};
