// Getting Controls by id and Events callbacks Assignments
var numDinero = document.getElementById("numberDinero");
var butExtraer = document.getElementById("buttonExtraer");
var butClear = document.getElementById("buttonClear");
var resultado = document.getElementById("resultado");
var reporte = document.getElementById("reporte");
var moneyAvailable = document.getElementById("availableMoney");
var billetesCanvas = document.getElementById("billetes");
var canvas2dContext = billetesCanvas.getContext("2d");
var anchoCanvas = billetesCanvas.offsetWidth;
var altoCanvas = billetesCanvas.offsetHeight;
butExtraer.addEventListener("click", entregarDinero);
butClear.addEventListener("click", clear);
document.addEventListener("keyup", enterPressed);

// Arrays and Variables Global Declarations
var caja = [];
var entregado = [];
var dineroSolicitado = 0;
var papeles = 0;
var div = 0;
var actualMoney = 0;
var dineroEntregadoSesion = 0;
var sessionNumber = 0;

setGlobalParameters();
calcActualMoney(); // Llamamos a la función que calcula y muestra cuanto dinero hay disponible en el cajero.

function setGlobalParameters()
{
    caja.push(new Billete(100, 10));
    caja.push(new Billete(50, 50));
    caja.push(new Billete(20, 100));
    caja.push(new Billete(10, 200));
    caja.push(new Billete(5, 100));
    caja.push(new Billete(1, 100));
}

function entregarDinero()
{
    var rightWord = ""; // Variable para saber la palabra correcta a utilizar (en singular o plural): Billete o Billetes
    var x = 0; 
    var y = 0;
    dineroSolicitado = parseInt(numDinero.value); // Monto de Dinero solicitado por el usuario.
    clear();
    
    if(actualMoney > 0)
    {   
        resultado.innerHTML = "<p>Retire su dinero con cuidado por favor.<br/>Monto solicitado: $" + dineroSolicitado +"</p>";   
        
        // Calculation Core Block, Bucle que calcula la mínima cantidad posible de billetes que se debe entregar
        for(var bi of caja)
        {
            if(dineroSolicitado > 0)
            {
                div = Math.floor(dineroSolicitado / bi.valor);
                
                if(div > bi.cantidad)
                {
                    papeles = bi.cantidad;
                }
                else
                {
                    papeles = div;
                }

                entregado.push(new Billete(bi.valor, papeles));
                dineroSolicitado -= bi.valor * papeles; // Disminuimos el dinero solicitado para la siguiente iteración
                actualMoney -= bi.valor * papeles; // Actualizamos el dinero que va quedando en el cajero según lo que vamos entregando
                dineroEntregadoSesion += bi.valor * papeles; // Vamos sumando el dinero que se va a entregar, de ser posible todo lo solicitado
                bi.cantidad -= papeles; // Disminuimos la cantidad de billetes que queda segun lo que vamos entregando                
            }
            else
            {
                break;
            }
        }
        // Saber si se logro completar el monto solicitado o no, y si no, muestra el mensaje correspondiente
        if(dineroSolicitado > 0)
        {
            resultado.innerHTML += "<p>Novedad: Lo sentimos, no se pudo completar el monto, pero te dimos lo que pudimos: $" + dineroEntregadoSesion + "...<br/>Soy un Cajero Pobre y no tengo dinero... lo siento, así es la vida a veces :(</p>";   
        }
        // Entrega del Dinero
        for(var e of entregado) // Delivery Block, Bloque que entrega el dinero como tal
        {   
            if(e.cantidad > 0)
            {
                if(e.cantidad == 1)
                {   
                    rightWord = "billete";
                }
                else
                {
                    rightWord = "billetes";
                }

                resultado.innerHTML += e.cantidad + " " + rightWord + " de $" + e.valor + "<br/>";
                
                for(var sb = 0; sb < e.cantidad; sb++) // Se muestra la imagen del Billete el número de veces que se calculo su entrega
                {   // sb: showing bills
                    e.showBill(x, y); // Se llama a la función que muestra el billete en el canvas
                    y += 70; // Acumulador para que se vaya mostrando un billete debajo de otro en orden
                    if(y > altoCanvas - 10) 
                    {// Verificador si ha llegado el tope del alto del canvas, ajusta las coordenadas para que siga en la siguiente columna
                        y = 0;
                        x += 150;
                    }
                }
            }
        }
        calcActualMoney(); //Llamamos a la función para mostrar el dinero disponible en el cajero y generar el reporte del dinero entregado
    }
    else
    {
        resultado.innerHTML = "<p>Lo sentimos, no hay dinero disponible en el cajero para procesar tu solicitud, por favor, vuelve más tarde :S</p>";
    }
}

function calcActualMoney() // Función Reguladora del Balance monetario. Muestra el dinero entregado y el valor que le queda al cajero
{
    if(actualMoney == 0)
    {   // Bucle que se ejectua al inicio, cuando se lee el script al cargar la página y mostrar el dinero disponible en el cajero
        for(var m of caja)
        {   // Recorremos el arreglo caja que contiene todos los billetes
            if(m.cantidad > 0)
            {   // Si hay al menos un billete de esta denominacion se suma a actualMoney
                actualMoney += (m.cantidad * m.valor);
            }
        }
    }
    
    moneyAvailable.innerHTML = "Dinero Total Disponible en el Cajero: $" + actualMoney; // Mostramos cuanto dinero hay en el cajero en el lugar correcto
    
    if(dineroEntregadoSesion > 0)
    {   // Emitimos el reporte de entrega de dinero en cada sesion
        sessionNumber ++; // Acumulador para mostrar el número de la sesión / transacción correspondiente
        reporte.innerHTML += "Dinero entregado en la sesión número " + sessionNumber + ": $" + dineroEntregadoSesion + "<br/>";
    }
}

function clear()
{   // Función limpiadora de todos los aspectos necesarios de limpiar de la pantalla y de la lógica del progama
    dineroEntregadoSesion = 0;
    entregado.length = 0; // Se vacía el array entregado para realizar una nueva entrega limpia, sin el resultado de la sesion anterior
    resultado.innerHTML = ""; // Se limpia la descripción de la salida
    numDinero.value = 1; // Se establece el elemento number en su mínimo
    canvas2dContext.clearRect(0, 0, anchoCanvas, altoCanvas); // Se limpian las imagenes de los billetes del Canvas para la nueva sesión
}

function enterPressed(evento) 
{   // Funcion para detectar si se presiono alguno de las dos teclas de Enter (Enter o Intro) y disparar la función Core
    if(evento.key == "Enter")
    {
        entregarDinero();
    }
}