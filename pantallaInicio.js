class PantallaInicio {
    constructor(juegoIniciarCallback) {
      this.visible = true;
      this.boton = createButton("PLAY");
      this.boton.position(windowWidth / 2 - 150, windowHeight - 150);
      this.boton.size(150, 80);
      this.boton.style('font-size', '18px');
      this.boton.mousePressed(() => {
        this.ocultar();
        juegoIniciarCallback();
      });
    }
  
    mostrar() {
        if (this.visible) {
            image(fondoInicio, 0, 0, width, height);
        }
    }
      
    ocultar() {
      this.visible = false;
      this.boton.hide();
    }
  
    mostrarBoton() {
      this.visible = true;
      this.boton.show();
    }
}
  