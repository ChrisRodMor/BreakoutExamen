let pantallaInicio;
let fondoInicio;
let paddle;
let ball;
let canvas;
let estado = "menu";


function preload() {
  fondoInicio = loadImage('breakoutAtariLOGO.jpg');
}

function setup() {
  background("black");
  canvas = createCanvas(900, 650);
  canvas.parent('canvas-container');
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  pantallaInicio = new PantallaInicio(iniciarJuego);
  pantallaInicio.boton.position((windowWidth - width) / 2 + width / 2 - 50, (windowHeight - height) / 2 + height / 2 + 200);
}

function draw() {
  background("black");

  if (pantallaInicio.visible) {
    pantallaInicio.mostrar();
    return;
  }

  switch (estado) {
    case "menu":
      pantallaInicio.mostrar();
      break;

    case "jugando":
      paddle.update();
      paddle.draw();

      ball.update();
      ball.draw();
      break;

    case "nivelCompletado":
      mostrarTransicion("Nivel Completado");
      break;

    case "gameOver":
      mostrarTransicion("Game Over");
      break;

    case "ganar":
      mostrarTransicion("¡Has ganado!");
      break;
  }
}

function keyPressed() {
  paddle.handleKey(keyCode, true);
}

function keyReleased() {
  paddle.handleKey(keyCode, false);
}

function iniciarJuego() {
  estado = "jugando";
  paddle = new Paddle();
  ball = new Ball();
}