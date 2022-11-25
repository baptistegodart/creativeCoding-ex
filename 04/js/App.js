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

    document.addEventListener("mousemove", this.moved.bind(this));
    document.addEventListener("mousedown", this.pressed.bind(this));
    document.addEventListener("mouseup", this.released.bind(this));
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.legs.forEach((leg) => {
      leg.draw(this.circle.position.x, this.circle.position.y);
    });

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
}

window.onload = function () {
  new App();
};
