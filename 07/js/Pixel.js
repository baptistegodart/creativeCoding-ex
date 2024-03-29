class Pixel {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.ctx = ctx;
  }

  setPosY() {
    this.luminosity_percentage = this.detectLuminance();
    this.x = this.originX + this.luminosity_percentage * 0
    //this.y = this.originY + this.luminosity_percentage * 10
  }

  detectLuminance() {
    const rgb = this.color.replace(/[^\d,]/g, "").split(",");
    const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return luminance / 255;
  }

}
