let pantallaInicio;
let fondoInicio;
let paddle;
let ball;
let canvas;
let estado = "menu";
let vidas = 3;
let transicionEnCurso = false;
let bloques = [];
let puntos = 0;



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

      for (let bloque of bloques) {
        bloque.draw();
        if (bloque.checkCollision(ball)) {
          puntos+=1;
        }
      }
    
      paddle.update();
      paddle.draw();

      ball.update();
      ball.draw();
      fill(255);
      textSize(16);
      
      textAlign(LEFT, TOP);
      text("Vidas: " + vidas, 10, 10);
      
      textAlign(RIGHT, TOP);
      text("Puntos: " + puntos, width - 10, 10);
      


      break;

    case "nivelCompletado":
      mostrarTransicion("Nivel Completado");
      break;

    case "gameOver":
      mostrarTransicion("Game Over");
    
      if (!transicionEnCurso) {
        transicionEnCurso = true;
    
        setTimeout(() => {
          reiniciarJuego();
          transicionEnCurso = false; 
        }, 2000);
      }
    
      break;
      

    case "ganar":
      mostrarTransicion("¡Has ganado!");
      break;
  }
}



function iniciarJuego() {
  estado = "jugando";
  paddle = new Paddle();
  ball = new Ball();
}

function mostrarTransicion(mensaje) {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(mensaje, width / 2, height / 2);
}
 function reiniciarJuego() {
   estado = "menu";
   vidas = 3;
   puntos = 0;
   //nivel = 1;
   ball.reset();
   paddle.x = width / 2 - paddle.w / 2;
   pantallaInicio.mostrar();
 }