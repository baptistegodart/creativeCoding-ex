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

    document.addEventListener('mousemove', this.mouseMoved.bind(this));
    document.addEventListener('click', this.mouseClicked.bind(this));

    this.img_file = "./assets/rei.jpeg";
    // this.firstloop = true

    this.setup();
  }

  setup() {
    this.points = [];
    this.totalLines = 100;
    this.subdivisions = 100;
    this.space = 10;

    this.grid_width = this.space * this.subdivisions;
    this.top_left = {
      x: (window.innerWidth / 2) * this.pixelRatio - this.grid_width / 2,
      y: (window.innerHeight / 2) * this.pixelRatio - this.grid_width / 2,
    };

    for (let j = 0; j < this.totalLines; j++) {
      for (let i = 0; i < this.subdivisions; i++) {
        this.points.push(new Pixel(this.top_left.x + j * this.space, this.top_left.y + i * this.space, this.ctx));
      }
    }

    // load image
    this.img = new Image();
    this.img.onload = () => {this.detectPixels()};
    this.img.src = this.img_file;

    // load sound
    this.audio = new AudioTool();

  }

  detectPixels() {

    this.ctx.drawImage(this.img, 0, 0);
    this.imgData = this.ctx.getImageData(0, 0, this.img.width, this.img.height);
    this.pixels = this.imgData.data;

    this.rgb = [];
    this.step = Math.floor(this.img.width / this.subdivisions);

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

    this.points.forEach((coord, index) => {
      const color = this.rgb[index];
      coord.color = `rgb(${color.r}, ${color.g}, ${color.b})`;
      coord.setPosY();
      });

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // if(this.firstloop){
    //   this.firstloop = false;
    // }

    this.ctx.strokeStyle = `hsla(220, 100%, ${100 - Math.max(10, this.furtherCoordAxes/10)}%, 80%)`;
    
    for (let i = 0; i < this.totalLines; i++) {
      for (let j = 0; j < this.subdivisions-1; j++) {
        
        const index = i * this.subdivisions + j;

        const rdnX = this.audio.isPlaying == true ? Math.random() * this.mouseX/25 : 0;
        const rdnY = this.audio.isPlaying == true ? Math.random() * this.mouseY/25 : 0;
        const xOffset = rdnX + this.mouseX/2
        const yOffset = rdnY + this.mouseY/2
        
        this.ctx.beginPath()
        this.ctx.moveTo(this.points[index+1].x + xOffset, this.points[index+1].y + yOffset)
        this.ctx.lineTo(this.points[index].x + xOffset, this.points[index].y + yOffset)
        
        // this.ctx.strokeStyle = this.points[index].color;
        this.ctx.lineWidth = 1 + this.points[index].luminosity_percentage * 5;
        this.ctx.stroke()

        this.ctx.closePath()
      }
    }
    requestAnimationFrame(this.draw.bind(this));
  }

  mouseMoved(e) {
    // Position souris avec origine au centre de l'écran
    this.mouseX = (e.clientX - window.innerWidth/2)
    this.mouseY = (e.clientY - window.innerHeight/2)

    this.absX = Math.abs(this.mouseX)
    this.absY = Math.abs(this.mouseY)

    this.furtherCoordAxes = this.absX > this.absY ? this.absX : this.absY

    this.audio.updatePlayBackRate(this.furtherCoordAxes, this.absX)
  }

  mouseClicked(e) {
    this.audio.play()
  }
};

window.onload = function () {
  new App();
};
