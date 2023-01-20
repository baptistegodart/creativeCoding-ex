class App {
  constructor() {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth * this.pixelRatio;
    this.canvas.height = window.innerHeight * this.pixelRatio;
    this.canvas.style.width = window.innerWidth;
    this.canvas.style.height = window.innerHeight;

    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });

    document.addEventListener('mousemove', this.mouseMoved.bind(this));
    document.addEventListener('click', this.mouseClicked.bind(this));
    document.addEventListener('keyup', this.spacebarClicked.bind(this));

    // this.firstloop = true

    this.artists = [
      this.aphex = {
        song : new Song("assets/sounds/aphex.mp3"), // aphex2.webm aphex.mp3
        imgSrc : "./assets/aphex.jpeg"
      },
      this.grimes = {
        song : new Song("assets/sounds/grimes.mp3"),
        imgSrc : "./assets/grimes.jpeg"
      },
      this.yabujin = {
        song : new Song("assets/sounds/yabujin.mp3"),
        imgSrc : "./assets/yabujin.jpg"
      },
      this.victou = {
        song : new Song("assets/sounds/victou.mpeg"),
        imgSrc : "./assets/victou.jpeg"
      },
      this.borg = {
        song : new Song("assets/sounds/exp4.m4a"),
        imgSrc : "./assets/borg.jpeg"
      }
    ]

    this.currArtist = 0

    this.setup();
  }

  setup() {
    // Setup grille de pixels
    this.points = [];
    this.cols = 50;
    this.rows = 250;
    this.spaceX = (this.canvas.width/this.cols)/1.2;
    this.spaceY = this.canvas.height/this.rows*1.1;

    this.grid_width = this.spaceX * this.cols;
    this.grid_height = this.spaceY * this.rows;

    this.top_left = {
      x: (window.innerWidth / 2) * this.pixelRatio - this.grid_width / 2,
      y: (window.innerHeight / 2) * this.pixelRatio - this.grid_height / 2,
    };

    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.cols; i++) {
        this.points.push(new Pixel(this.top_left.x + i * this.spaceX, this.top_left.y + j * this.spaceY, this.ctx));
      }
    }

    // Init img & src
    this.img = new Image();
    this.img.onload = () => {this.detectPixels()};
    this.img.src = this.artists[this.currArtist].imgSrc; 

    // Init curr song
    this.currSong = this.artists[this.currArtist].song;

    // Init analyser
    this.audioTools = new AudioTool()
    
    // Init HTML els
    this.initHTML()
  }

  detectPixels() {

    this.ctx.drawImage(this.img, 0, 0);
    this.imgData = this.ctx.getImageData(0, 0, this.img.width, this.img.height);
    this.pixels = this.imgData.data;

    this.rgb = [];
    this.stepX = Math.floor(this.img.width / this.cols);
    this.stepY = Math.floor(this.img.height / this.rows);

    for (let i = 0; i < this.img.height; i += this.stepY) {
      for (let j = 0; j < this.img.width; j += this.stepX) {
        let index = (i * this.img.width + j) * 4;
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

    if (this.currSong.isPlaying) {
      this.audioTools.updateFrequency();
      this.songValue = this.audioTools.calcMediane();
      /*this.audioTools.updatedFloatFrequency();
      this.audioTools.updateWaveForm();

      this.incr = 0
      this.incr++*/
      // console.log(this.songValue);

      // console.log(this.audioTools.dataFrequency);
      // console.log(this.audio.dataFloatFrequency);
      // console.log(this.audio.dataWaveForm);
      //console.log(this.audioTools.audioContext.sampleRate/2)
    }

    //this.ctx.strokeStyle = `hsla(220, 100%, ${100 - Math.max(10, this.furtherCoordAxes/10)}%, 80%)`;

    
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols-1; j++) {
        
        const index = i * this.cols + j;
        if(this.currSong.isPlaying == true){
          const colorIndex = Math.max(20, this.audioTools.dataFrequency[this.rows-i]/1.5)
          this.ctx.strokeStyle = `hsla(222, ${colorIndex}%, ${colorIndex}%, ${colorIndex}%)`;
        }else{
          this.ctx.strokeStyle = `hsla(222, 100%, 80%, 40%)`;
        }
        

        const rdnX = this.currSong.isPlaying == true ? (this.audioTools.dataFrequency[i]/20): 0;
        const rdnY = this.currSong.isPlaying == true ? (this.audioTools.dataFrequency[j]/5): 0;
        // const rdnY = 0
        //const rdnX = 0
        const xOffset = rdnX
        const yOffset = rdnY
        // const xOffset = rdnX + this.mouseX/2
        // const yOffset = rdnY + this.mouseY/2
        
        this.ctx.beginPath()
        this.ctx.moveTo(this.points[index+1].x + xOffset, this.points[index+1].y - yOffset)
        this.ctx.lineTo(this.points[index].x + xOffset, this.points[index].y - yOffset)
        
        // this.ctx.strokeStyle = this.points[index].color;
        if(this.currSong.isPlaying == true){
          this.ctx.lineWidth = 1 + (this.points[index].luminosity_percentage * this.audioTools.dataFrequency[this.rows-i]/100);
        }else{
          this.ctx.lineWidth = 1 + this.points[index].luminosity_percentage * 2;
        }
        this.ctx.stroke()

        this.ctx.closePath()
      }
    }
    //console.log(this.currSong)
    requestAnimationFrame(this.draw.bind(this));
  }

  initHTML() {
    // Récupérer tous les els htmls

    // Initialiser les datas dans les els htmls
    
  }

  mouseMoved(e) {
    // Position souris avec origine au centre de l'écran
    this.mouseX = (e.clientX - window.innerWidth/2)
    this.mouseY = (e.clientY - window.innerHeight/2)

    this.absX = Math.abs(this.mouseX)
    this.absY = Math.abs(this.mouseY)

    this.furtherCoordAxes = this.absX > this.absY ? this.absX : this.absY

    this.currSong.updatePlayBackRate(this.furtherCoordAxes, this.absX, e)
  }

  mouseClicked(e) {
    // console.log(this.currArtist);
    if(this.currArtist < this.artists.length-1){
      this.currArtist++
      // console.log(this.currArtist);
    }else{
      this.currArtist = 0;
    }
    // this.currArtist = this.currArtist == 0 ? 1 : 0;
    this.changeArtist();
    this.changeHtml();
  }
  
  spacebarClicked(e) {
    // console.log(e);
    if (!this.audioTools.audioContext) {
      this.audioTools.initAudioContext(this.artists);
    }

    if(e.keyCode == 32){
      this.currSong.play()
    }
  }

  changeArtist() {
    this.currSong.pause();
    this.currSong = this.artists[this.currArtist].song
    if(this.currSong.isPlaying){
      this.currSong.play()
    }

    this.img.src = this.artists[this.currArtist].imgSrc;
    this.img.onload = () => {this.detectPixels()};
  }

  changeHtml() {
    if(this.currSong.isPlaying){

    }
  }

};

window.onload = function () {
  new App();
};
