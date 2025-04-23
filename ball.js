// ball.js
class Ball {
    constructor() {
      this.r = 12;
      this.attached = true; // ← nueva bandera
      this.reset();
    }
  
    reset() {
      this.attached = true;
      this.vx = random([-3, 3]);
      this.vy = -4;
    }
  
    update() {
      if (this.attached) {
        this.x = paddle.x + paddle.w / 2;
        this.y = paddle.y - this.r;
        return;
      }
  
      this.x += this.vx;
      this.y += this.vy;
  
      // Rebote con paredes
      if (this.x - this.r < 0 || this.x + this.r > width) this.vx *= -1;
      if (this.y - this.r < 0) this.vy *= -1;
  
      // Rebote con paddle
      if (this.y + this.r >= paddle.y &&
          this.x > paddle.x && this.x < paddle.x + paddle.w) {
        this.vy *= -1;
        this.y = paddle.y - this.r;
      }
  
      // Si se cae
      if (this.y - this.r > height) {
        this.reset(); // luego aquí se resta una vida
      }
    }
  
    release() {
      if (this.attached) {
        this.attached = false;
      }
    }
  
    draw() {
      fill(this.color || 255);
      ellipse(this.x, this.y, this.r * 2);
    }
  }
  