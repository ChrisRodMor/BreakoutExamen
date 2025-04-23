let pantallaInicio;
let fondoInicio;
let paddle;
let ball;

function preload() {
  fondoInicio = loadImage('breakoutAtariLOGO.jpg');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  pantallaInicio = new PantallaInicio(iniciarJuego);
  paddle = new Paddle();
  ball = new Ball();
}

function draw() {
  background(0);

  if (pantallaInicio.visible) {
    pantallaInicio.mostrar();
    return; // no dibujar nada más si está en la pantalla de inicio
  }
  else{
    paddle.update();
    paddle.draw();

    ball.update();
    ball.draw();
  }

  // Lógica y dibujo del juego aquí
}

function keyPressed() {
    paddle.handleKey(keyCode, true);
}
  
function keyReleased() {
    paddle.handleKey(keyCode, false);
}

function iniciarJuego() {
  console.log("Juego iniciado");
  // Aquí puedes poner lógica para comenzar el nivel 1, inicializar pelota, etc.
}
