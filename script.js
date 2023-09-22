const GATITO_COMIENDO_PATH = "./imagenes/gatito-comiendo.jpg"
const GATITO_JUGANDO_PATH = "./imagenes/gatito-jugando.jpg"
const GATITO_ALIEN_PATH = "./imagenes/gatito-alien.jpg"
let puntos = 0
let tareasCompletadas = []
let tareasSinCompletar = []

 // El nivel todavía no está aplicado
 class Mascota {
    constructor(nombre, energia, nivel){
        this.nombre = nombre;
        this.energia = energia;
        this.nivel = nivel;
    }

    alimentar(puntos) {
        if (puntos >= 2) {
            this.energia = this.energia + 1
            if (this.energia >= 2 && this.energia < 4) {
            cambiarImagen(GATITO_COMIENDO_PATH)
            }
            if (this.energia >= 4 && this.energia < 6) {
            cambiarImagen(GATITO_JUGANDO_PATH)
            }
            if (this.energia === 6) {
            cambiarImagen(GATITO_ALIEN_PATH)
            }
            return puntos - 2
        } 
        if (puntos < 2){
            alert ("Los puntos no son sucifientes!")
            return puntos
        }
    }
 }

 let gatito = new Mascota ("Gatito", 0, 1)
 
 class Tarea {
    constructor(nombre, puntos){
        this.nombre = nombre;
        this.puntos = puntos;
    }
 }

 function dibujarPuntos(puntos) {
    let puntaje = document.getElementById("puntos")
    puntaje.innerHTML = "Puntos: " + puntos
 }

 function dibujarEnergia(energia) {
    let laEnergia = document.getElementById("energia")
    laEnergia.innerHTML = "Energía: " + energia
 }

function dibujarLista(idLista, listaDeTareas, fn) {
    let lista = document.getElementById(idLista)
    lista.innerHTML = ""
    for (let i=0; i<listaDeTareas.length; i++) {
        let item = document.createElement("li")
        item.addEventListener("click", fn, false)
        item.innerHTML = listaDeTareas[i].nombre
        lista.appendChild(item)
    }
}

function completar(event) {
    let nombreTarea = event.target.innerHTML
    let indiceTarea = tareasSinCompletar.findIndex(t => t.nombre === nombreTarea)
    let tarea = tareasSinCompletar[indiceTarea]
    puntos = puntos + tarea.puntos
    dibujarEnergia(gatito.energia)
    dibujarPuntos(puntos)
    tareasSinCompletar.splice(indiceTarea, 1)
    tareasCompletadas.push(tarea)
    dibujarLista("tareas", tareasSinCompletar, completar)
    dibujarLista("tareas-comp", tareasCompletadas, eliminar)
}

function eliminar(event) {
    let nombreTarea = event.target.innerHTML
    let indiceTarea = tareasCompletadas.findIndex(t => t.nombre === nombreTarea)
    let tarea = tareasCompletadas[indiceTarea]
    puntos = puntos - tarea.puntos
    dibujarEnergia(gatito.energia)
    dibujarPuntos(puntos)
    tareasCompletadas.splice(indiceTarea, 1)
    tareasSinCompletar.push(tarea)
    dibujarLista("tareas-comp", tareasCompletadas, eliminar)
    dibujarLista("tareas", tareasSinCompletar, completar)
}

function alimentar() {
    puntos = gatito.alimentar(puntos)
    dibujarEnergia(gatito.energia)
    dibujarPuntos(puntos)
}

function cambiarImagen(path) {
    let imagen = document.getElementById("foto-gatito")
    imagen.setAttribute("src", path)
}

 function main() {
    const tarea1 = new Tarea("Lavar los platos", 1)
    const tarea2 = new Tarea("Lavar la ropa", 1)
    const tarea3 = new Tarea("Doblar y guardar la ropa", 1)
    const tarea4 = new Tarea("Tender la cama", 1)
    const tarea5 = new Tarea("Barrer y pasar el trapo", 1)
    const tarea6 = new Tarea("Ventilar ambientes", 1)
    const tarea7 = new Tarea("Tomar al menos 1.5L de agua", 1)
    const tarea8 = new Tarea("Estudiar por al menos 2 horas", 1)
    const tarea9 = new Tarea("Hacer mínimo 45' de ejercicio", 1)
    const tarea10 = new Tarea("Salir a tomar aire", 1)
    const tarea11 = new Tarea("Leer un libro", 1)
    const tarea12 = new Tarea("Meditar", 1)
    tareasSinCompletar.push(tarea1, tarea2, tarea3, tarea4, tarea5, tarea6, tarea7, tarea8, tarea9, tarea10, tarea11, tarea12)
    dibujarEnergia(gatito.energia)
    dibujarPuntos(puntos)
    dibujarLista("tareas", tareasSinCompletar, completar)
    dibujarLista("tareas-comp", tareasCompletadas, eliminar)
}

 main()