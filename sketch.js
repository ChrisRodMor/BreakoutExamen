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
let nivel = 1;


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

  if ((key === 'w' || key === 'W') && keyIsPressed && estado === "jugando") {
    estado = "ganar";
    key = '';
  }

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
          puntos += 1;
        }
      }

      if (bloques.every(b => !b.visible || b.tipo === "solido")) {
        estado = "nivelCompletado";
      
        setTimeout(() => {
          if (nivel < 3) {
            nivel++;
            cargarNivel(nivel);
            estado = "jugando";
          } else {
            estado = "ganar";
          }
        }, 2000);
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

      fill(255);
      textSize(24);
      textAlign(CENTER, CENTER);
      text("Puntaje final: " + puntos, width / 2, height / 2 + 50);

    
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
      
      fill(255);
      textSize(24);
      textAlign(CENTER, CENTER);
      text("Puntaje final: " + puntos, width / 2, height / 2 + 50);

      if (!transicionEnCurso) {
        transicionEnCurso = true;
    
        setTimeout(() => {
          reiniciarJuego();
          transicionEnCurso = false; 
        }, 2000);
      }
      break;
  }
}



function iniciarJuego() {
  estado = "jugando";
  nivel = 1;
  cargarNivel(nivel);
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
  nivel = 1;
  ball.reset();
  paddle.x = width / 2 - paddle.w / 2;
  pantallaInicio.mostrar();
}

function cargarNivel(n) {
  bloques = [];

  let filas = 4;
  let bloquesResistentes = 0;
  let bloquesSolidos = 0;
  let velocidad = 4;

  if (n === 1) {
    filas = 4;
    velocidad = 4;
  } else if (n === 2) {
    filas = 5;
    velocidad = 5;
    bloquesResistentes = 1;
  } else if (n === 3) {
    filas = 6;
    velocidad = 6;
    bloquesResistentes = 2;
    bloquesSolidos = 1;
  }

  // imprimir los bloques con coordenadas de col y fila
  for (let fila = 0; fila < filas; fila++) {
    for (let col = 0; col < 8; col++) {
      let x = 60 + col * 95;
      let y = 50 + fila * 30;

      let tipo = "normal";

      // Agregar resistentes
      if (bloquesResistentes > 0 && random() < 0.15) {
        tipo = "resistente";
        bloquesResistentes--;
      }

      // Agregar sólidos
      if (bloquesSolidos > 0 && random() < 0.1) {
        tipo = "solido";
        bloquesSolidos--;
      }

      bloques.push(new Block(x, y, 80, 20, tipo));
    }
  }

  ball = new Ball();
  ball.setSpeed(velocidad);
  paddle = new Paddle();
}
