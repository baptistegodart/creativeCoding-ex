class Circle {
  constructor(x, y, radius, ctx) {
    this.position = {x: x, y: y};
    this.target = {x: x, y: y};
    this.origin = {x: this.target.x, y: this.target.y};

    this.radius = radius;
    this.eyeSize = this.radius/7;
    this.eyeSizeMove = this.radius/2;
    this.eyeSizeOrigin = this.radius/7;

    this.ctx = ctx;
  
    this.speed = 0.005;
    this.t = 0;
  }

  draw() {
    //check si on est arrivé à destination
    if (this.distance(this.position, this.target) > 0.001) this.move();

    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.lineWidth = 10;

    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.arc(-this.radius/1.5, 0, this.radius/1.5, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.arc(this.radius/1.5, 0, this.radius/1.5, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.arc(-this.radius/1.5, 0, this.eyeSize, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    
    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.arc(this.radius/1.5, 0, this.eyeSize, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.strokeStyle = "white";
    this.ctx.arc(0, this.radius/2, this.radius/6, 0, Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.restore();
    
  }

  drawOnMousePressed(x, y) {
    this.position.x = x;
    this.position.y = y;

    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.lineWidth = 10;

    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.arc(-this.radius/1.5, 0, this.radius/1.5, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.arc(this.radius/1.5, 0, this.radius/1.5, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.arc(-this.radius/1.5, 0, this.eyeSizeMove, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    
    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.arc(this.radius/1.5, 0, this.eyeSizeMove, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();

    this.ctx.restore();
  }

  /**
   *  compteur t à zero
   *  nouvelle position de départ
   */
   returnOrigin(x, y) {
    this.t = 0;
    this.origin = {
      x: x,
      y: y
    };
  }

  changeTarget(x, y) {
    this.t = 0;
    this.target = {
      x: x,
      y: y
    }
  };

  /**
   * function de calcul de l'animation
   */
  move() {
    //on incrémente t par la vitesse
    this.t += this.speed;
    //on calcule le facteur d'interpolation suivant le type de easing
    const ease = Easing.elasticOut(this.t);

    //nouvelle position
    // on part de la position d'origine
    // on calcul la distance totale à parcourir (v2-v1)
    // on multiplie cette distance par le facteur d'interpolation
    this.position.x = this.origin.x + (this.target.x - this.origin.x) * ease;
    this.position.y = this.origin.y + (this.target.y - this.origin.y) * ease;
    this.eyeSize = this.eyeSizeMove + (this.eyeSizeOrigin - this.eyeSizeMove) * ease;
  }

  /**
   * calcul de la distance entre deux points
   */
  distance(target, goal) {
    return Math.sqrt(
      Math.pow(target.x - goal.x, 2) + Math.pow(target.y - goal.y, 2)
    );
  }
}
