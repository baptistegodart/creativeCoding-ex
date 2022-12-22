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
    this.img_file = "./assets/tete.jpeg";
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "white";
    this.setup();
  }

  setup() {

    this.totalLines = 200;
    this.subdivisions = 200;
    this.space = 8;

    this.points = [];

    const grid_width = this.space * this.subdivisions;
    const top_left = {
      x: (window.innerWidth / 2) * this.pixelRatio - grid_width / 2,
      y: (window.innerHeight / 2) * this.pixelRatio - grid_width / 2,
    };

    for (let j = 0; j < this.totalLines; j++) {
      for (let i = 0; i < this.subdivisions; i++) {

        const circle = new Circle(top_left.x + j * this.space, top_left.y + i * this.space, this.ctx)
        this.points.push(circle);

      }
    }

    // load image
    this.img = new Image();
    this.img.onload = () => {
      this.detectPixels();
    };

    this.img.src = this.img_file;

  }

  detectPixels() {
    this.ctx.drawImage(this.img, 0, 0);

    // get image data from canvas
    this.imgData = this.ctx.getImageData(0, 0, this.img.width, this.img.height);

    // get pixel data
    this.pixels = this.imgData.data;

    // get steps for 100 x 100
    this.step = Math.floor(this.img.width / this.subdivisions);

    // get rgb data for each step pixel in 100 x 100
    this.rgb = [];
    for (let i = 0; i < this.img.height; i += this.step) {
      for (let j = 0; j < this.img.width; j += this.step) {
        let index = (j * this.img.width + i) * 4;
        this.rgb.push({
          r: this.pixels[index],
          g: this.pixels[index + 1],
          b: this.pixels[index + 2],
          a: this.pixels[index + 3],
        });
      }
    }

    this.points.forEach((circle, index) => {
      const color = this.rgb[index];
      circle.color = `rgb(${color.r}, ${color.g}, ${color.b})`;
      circle.setPosY();
      });

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.totalLines; i++) {
      
      for (let j = 0; j < this.subdivisions-1; j++) {
        
        const index = i * this.subdivisions + j;
        
        if (j == 0) {
          // this.ctx.moveTo(this.points[index].x, this.points[index].y);
        }

        this.ctx.beginPath();
        this.ctx.moveTo(this.points[index+1].x, this.points[index+1].y);
        
        // replace that line with a quadratic curve
        this.ctx.lineTo(this.points[index].x, this.points[index].y);
        // const cx = (this.points[index].x + this.points[index + 1].x) / 2;
        // const cy = (this.points[index].y + this.points[index + 1].y) / 2;
        
        // this.ctx.quadraticCurveTo(this.points[index].x, this.points[index].y, cx, cy);
        // this.ctx.quadraticCurveTo(this.points[index+1].x, this.points[index+1].y, cx, cy);
        
        
        this.ctx.lineWidth = 2 + this.points[index].luminosity_percentage * 3;
        this.ctx.stroke();
        this.ctx.closePath();
        
      }
      
    }

    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  new App();
};
