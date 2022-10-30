class Tile {
  constructor(x, y, size, color, ctx) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotation = false;
    this.angle = Math.round(Math.random()) * (Math.PI / 2);
    this.ctx = ctx;
    this.bgColor = color;
    if(this.bgColor === "black"){
      this.lineColor = "blue"
    }else{
      this.lineColor = "orange"
    }
  }

  updateAngle() {
    this.angle += Math.PI / 2;
  }

  updateColor() {
    if(this.bgColor === "black" && this.lineColor === "red"){
      this.lineColor = "blue"
    }else if(this.bgColor === "black" && this.lineColor === "blue"){
      this.lineColor = "red"
    }else if(this.bgColor === "white" && this.lineColor === "green"){
      this.lineColor = "orange"
    }else if(this.bgColor === "white" && this.lineColor === "orange"){
      this.lineColor = "green"
    }
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle);
    // if (this.rotation) {
    //   this.angle += 1;
    // }
    // this.ctx.strokeStyle = "lightgrey";
    this.ctx.fillStyle = this.bgColor;
    this.ctx.beginPath();
    this.ctx.rect(0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
    this.ctx.fill();
    // this.ctx.stroke();
    this.ctx.closePath();
    //
    // this.ctx.fillStyle = this.circleColor;
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.lineWidth = 20;
    this.ctx.beginPath();
    //this.ctx.moveTo(0, this.size / 2);
    // this.ctx.rect(0-this.size/2, 0 - this.size/2, this.size, this.size);
    this.ctx.arc(0 - this.size / 2, 0 - this.size / 2, this.size / 2, 0, Math.PI / 2, false);
    // this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    //
    this.ctx.beginPath();
    // this.ctx.moveTo(this.size / 2, 0);
    // this.ctx.lineTo(this.size, this.size / 2);
    this.ctx.arc(this.size / 2, this.size / 2, this.size / 2, Math.PI, -Math.PI / 2, false);
    // this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }
}
