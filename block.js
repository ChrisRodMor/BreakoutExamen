class Block {
  constructor(x, y, w, h, tipo = 'normal') {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tipo = tipo; // "normal", "resistente", "solido"
    this.visible = true;

    if (tipo === "normal") {
      this.color = 'skyblue';
      this.hits = 1;
    } else if (tipo === "resistente") {
      this.color = 'orange';
      this.hits = 3;
    } else if (tipo === "solido") {
      this.color = 'gray';
      this.hits = Infinity;
    }
  }

  draw() {
    if (this.visible) {
      fill(this.color);
      rect(this.x, this.y, this.w, this.h);
    }
  }

  checkCollision(ball) {
    if (!this.visible) return false;
  
    if (
      ball.x + ball.r > this.x &&
      ball.x - ball.r < this.x + this.w &&
      ball.y + ball.r > this.y &&
      ball.y - ball.r < this.y + this.h
    ) {
      this.hits--;
  
      ball.vy *= -1;
  
      // Si se destruye en este golpe, ocultar y devolver true para poner el punto
      if (this.hits <= 0 && this.tipo !== "solido") {
        this.visible = false;
        return true;
      }
  
      return false;
    }
  
    return false;
  }
  
}
