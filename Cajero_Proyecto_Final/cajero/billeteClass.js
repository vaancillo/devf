// Cargamos las imágenes de los billetes para tenerlos listos para usar
var imagenes = [];
imagenes["100"] = "billete_100.png";
imagenes["50"] = "billete_50.png";
imagenes["20"] = "billete_20.png";
imagenes["10"] = "billete_10.png";
imagenes["5"] = "billete_5.png";
imagenes["1"] = "billete_1.png";

// Clase  Billete la cual va a servir para manejar el dinero en el cajero, 
// así como para poderlos mostrar en pantalla.
class Billete
{
    constructor(v, c)
    {
        this.imagen = new Image();
        this.valor = v;
        this.cantidad = c;

        this.imagen.src = imagenes[this.valor.toString()];
    }

    showBill(x, y)
    {    
        canvas2dContext.drawImage(this.imagen, x, y);   
    }
}