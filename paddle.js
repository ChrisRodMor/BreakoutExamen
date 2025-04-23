class Paddle {
    constructor() {
      this.w = 120;
      this.h = 20;
      this.x = width / 2 - this.w / 2;
      this.y = height - 40;
      this.speed = 8;
      this.dir = 0; // -1 izquierda, +1 derecha
    }
  
    update() {
      this.x += this.dir * this.speed;
      this.x = constrain(this.x, 0, width - this.w);
    }
  
    draw() {
      fill(255);
      rect(this.x, this.y, this.w, this.h, 5);
    }
  
    handleKey(code, pressed) {
        if (code === LEFT_ARROW) this.dir = pressed ? -1 : 0;
        if (code === RIGHT_ARROW) this.dir = pressed ? 1 : 0;
        
        if (pressed && ball && ball.attached) {
            ball.release(); // ← liberar pelota al primer movimiento
        }
    }
      
  }
  