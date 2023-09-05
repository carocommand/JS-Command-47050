function aceptarNombre() {
    const nombre = prompt ("Ingresa tu nombre:")
    return nombre
}

function aceptarEdad() {
    let edad = 0
    while (isNaN(edad) || edad < 1 || edad > 100) {
        edad = prompt ("Ingresa tu edad:")
        edad = +edad
    }
    return edad
}

function aceptarColor() {
    let color
    while (color != "azul" && color != "rosa" && color != "naranja" && color != "verde") {
        color = prompt ("Que color preferís: azul, rosa, naranja o verde?")
    }
    return color
}

function aceptarNumero() {
    let numero = NaN
    console.log(numero)
    while (isNaN(numero)) {
        numero = prompt ("Ingresa tu número favorito:")
        numero = +numero
    }
    return numero
}

function aceptarComida() {
    let comida 
    while (comida != "lasagna" && comida != "sardinas" && comida != "pollo" && comida != "aceitunas") {
        comida = prompt ("Que comida te gusta más: lasagna, sardinas, pollo o aceitunas?")
    }
    return comida
}

function aceptarEstacion() {
    let estacion 
    while (estacion != "verano" && estacion != "otoño" && estacion != "invierno" && estacion != "primavera") {
        estacion = prompt ("Cuál estación del año es la mejor?")
    }
    return estacion
}

function esPar(numero) {
    return numero %2 == 0
}

function aniosGatunos(edad) {

    let aniogato = 0

    if (edad <= 24) {
        aniogato = edad / 12
    }
    else {
        aniogato = 2 + ((edad - 24) / 4)
    }
    return aniogato
}

function iniciarQuiz() {
    const nombre = aceptarNombre()
    alert ("Hola " + nombre + "!")
    const edad = aceptarEdad()
    const color = aceptarColor()
    const numero = aceptarNumero()
    const comida = aceptarComida()
    const estacion = aceptarEstacion()

    let gato = ""

    if (esPar(numero)) {
        switch (color) {
            case "azul":
            case "rosa":
                switch (comida) {
                    case "lasagna":
                    case "pollo":
                        switch (estacion) {
                            case "verano":
                            case "primavera":
                                gato = "naranja"
                                break
                            default:
                                gato = "negro"
                        }
                        break;
                    default:
                        switch (estacion) {
                            case "verano":
                            case "primavera":
                                gato = "tabby"
                                break
                            default:
                                gato = "negro"
                        }
                }
                break;
            default:
                switch (comida) {
                    case "lasagna":
                    case "pollo":
                        switch (estacion) {
                            case "verano":
                            case "primavera":
                                gato = "tabby"
                                break
                            default:
                                gato = "negro"
                        }
                        break;
                    default:
                        switch (estacion) {
                            case "verano":
                            case "primavera":
                                gato = "tricolor"
                                break
                            default:
                                gato = "tabby"
                        }
                }
        }
    }
    else {
        switch (color) {
            case "azul":
            case "rosa":
                switch (comida) {
                    case "lasagna":
                    case "pollo":
                        switch (estacion) {
                            case "verano":
                            case "primavera":
                                gato = "tricolor"
                                break
                            default:
                                gato = "negro"
                        }
                        break;
                    default:
                        switch (estacion) {
                            case "verano":
                            case "primavera":
                                gato = "tuxedo"
                                break
                            default:
                                gato = "tricolor"
                        }
                }
                break;
            default:
                switch (comida) {
                    case "lasagna":
                    case "pollo":
                        switch (estacion) {
                            case "verano":
                            case "primavera":
                                gato = "tuxedo"
                                break
                            default:
                                gato = "tricolor"
                        }
                        break;
                    default:
                        switch (estacion) {
                            case "verano":
                            case "primavera":
                                gato = "tuxedo"
                                break
                            default:
                                gato = "blanco"
                        }
                }
        }
    }
    alert (nombre + ": sos un gato " + gato + " y tenés " + aniosGatunos(edad) + " años gatunos!")
}

iniciarQuiz()