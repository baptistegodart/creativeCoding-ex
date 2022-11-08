class Leg {
  constructor(x1, y1, x2, y2, ctx) {
    this.position = { x1: x1, y1: y1, x2: x2, y2: y2 };
    this.ctx = ctx;
  }

  draw(xCircle, yCircle) {
    this.position.x2 = xCircle;
    this.position.y2 = yCircle;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.lineWidth = 20;
    this.ctx.moveTo(this.position.x1, this.position.y1);
    this.ctx.lineTo(this.position.x2, this.position.y2);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc((this.position.x1 + this.position.x2)/2, (this.position.y1 + this.position.y2)/2, 15, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(this.position.x1, this.position.y1, 45, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.restore();
  }
}
