class Ball {
  constructor() {
    this.r = 12;
    this.attached = true; // nueva bandera
    this.puedeLiberarse = true;
    this.vx = 0;
    this.vy = 0;
    this.reset();
  }

  reset() {
    this.attached = true;
    this.puedeLiberarse = false; // una variable para controlar si se puede soltar la pelota 

    // esperar medio segundo antes de soltarla 
    setTimeout(() => {
      this.puedeLiberarse = true;
    }, 500);
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
      vidas--;

      if (vidas > 0) {
        this.reset(); // todavía hay vidas, entonces puede reintentar
      } else {
        estado = "gameOver"; // sin vidas, es game over
      }
    }
  }

  release() {
    if (this.attached && this.puedeLiberarse) {
      this.attached = false;

      if (this.vx === 0 && this.vy === 0) {
        this.vx = random([-3, 3]);
        this.vy = -4;
      }
    }
  }

  draw() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }

  setSpeed(vel) {
    if (this.vx > 0) {
      this.vx = vel;
    } else {
      this.vx = -vel;
    }
  
    if (this.vy > 0) {
      this.vy = vel;
    } else {
      this.vy = -vel;
    }
  }
  
  

}
