class PantallaInicio {
    constructor(juegoIniciarCallback) {
      this.visible = true;
      this.boton = createButton("PLAY");
      this.boton.position(800 / 2, 350+100);
      this.boton.size(100, 30);
      this.boton.style('font-size', '20px');
      this.boton.style('font-weight', 'bold');
      this.boton.style('background-color', '#FAE25A');
      this.boton.style('border', 'none');          
      this.boton.style('border-radius', '20px');
      this.boton.hide();

      this.boton.mousePressed(() => {
        this.ocultar();
        juegoIniciarCallback();
      });
    }
  
     mostrar() {
      this.visible = true;
      image(fondoInicio, 0, 0, width, height);
      this.boton.show();
    }
      
    ocultar() {
      this.visible = false;
      this.boton.hide();
    }
  
    
}
  