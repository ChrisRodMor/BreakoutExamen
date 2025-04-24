class Paddle {
  constructor() {
    this.w = 120;
    this.h = 20;
    this.x = width / 2 - this.w / 2;
    this.y = height - 40;
    this.speedBase = 5;
    this.speed = this.speedBase;
  }

  update() {
    
    if (keyIsDown(16)) {
      this.speed = this.speedBase * 2;
    } else {
      this.speed = this.speedBase;
    }

    // Dirección del paddle
    if (keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
      this.x -= this.speed;
    } else if (keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
      this.x += this.speed;
    }

    // constrain limita a dentro del canva
    this.x = constrain(this.x, 0, width - this.w);

    // Soltar pelota si está pegada y se está moviendo
    if (ball && ball.attached && (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW))) {
      ball.release();
    }
  }

  draw() {
    fill(255);
    rect(this.x, this.y, this.w, this.h, 5);
  }
}
