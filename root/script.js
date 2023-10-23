const GATITO_COMIENDO_PATH = "../imagenes/gatito-comiendo.jpg"
const GATITO_JUGANDO_PATH = "../imagenes/gatito-jugando.jpg"
const GATITO_ALIEN_PATH = "../imagenes/gatito-alien.jpg"
let puntos = 0
let tareasCompletadas = []
let tareasSinCompletar = []

 class Mascota {
    constructor(nombre, energia, nivel){
        this.nombre = nombre;
        this.energia = energia;
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
            Swal.fire ({
                title: 'Los puntos no son suficientes!',
                text: 'Completa mas tareas',
                icon: 'warning',
                showConfirmButton: false,
                timer: 1500
            })
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

 let boton = document.getElementById("alimentar")
 boton.addEventListener("click", alimentar)

 let boton2 = document.getElementById("listo")
 boton2.addEventListener("click", agregarTarea)

 function dibujarPuntos(puntos) {
    let puntaje = document.getElementById("puntos")
    puntaje.innerHTML = "Points: " + puntos
 }

 function dibujarEnergia(energia) {
    let laEnergia = document.getElementById("energia")
    laEnergia.innerHTML = "Energy: " + energia
 }

function mostrarFact() {
    let dato = document.getElementById('fact')
    fetch ('https://catfact.ninja/fact?max_length=140')
    .then((res) => res.json())
    .then((json) => dato.innerHTML = json.fact)
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
    localStorage.setItem("tareasCompletadas", JSON.stringify(tareasCompletadas))
    localStorage.setItem("tareasSinCompletar", JSON.stringify(tareasSinCompletar))
    localStorage.setItem("puntos", JSON.stringify(puntos))
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
    localStorage.setItem("tareasCompletadas", JSON.stringify(tareasCompletadas))
    localStorage.setItem("tareasSinCompletar", JSON.stringify(tareasSinCompletar))
    localStorage.setItem("puntos", JSON.stringify(puntos))
    dibujarLista("tareas-comp", tareasCompletadas, eliminar)
    dibujarLista("tareas", tareasSinCompletar, completar)
}

function alimentar() {
    puntos = gatito.alimentar(puntos)
    localStorage.setItem("puntos", JSON.stringify(puntos))
    localStorage.setItem("gatito", JSON.stringify(gatito))
    dibujarEnergia(gatito.energia)
    dibujarPuntos(puntos)
}

function cambiarImagen(path) {
    let imagen = document.getElementById("foto-gatito")
    imagen.setAttribute("src", path)
}

function agregarTarea(event) {
    event.preventDefault()
    let inputTarea = document.getElementById("nuevaTarea")
    let valorTarea = inputTarea.value
    inputTarea.value = ""
    let tareaNueva = new Tarea (valorTarea, 1)
    tareasSinCompletar.push(tareaNueva)
    localStorage.setItem("tareasSinCompletar", JSON.stringify(tareasSinCompletar))
    dibujarLista("tareas", tareasSinCompletar, completar)
 }

 function inicializar() {
    let tareas1 = JSON.parse(localStorage.getItem("tareasSinCompletar"))
    let tareas2 = JSON.parse(localStorage.getItem("tareasCompletadas"))
    let puntaje = JSON.parse(localStorage.getItem("puntos"))
    let mascota = JSON.parse(localStorage.getItem("gatito"))
    if (tareas1 != null) {
        tareasSinCompletar = tareas1
    }
    if (tareas2 != null) {
        tareasCompletadas = tareas2
    }
    if (puntaje != null) {
        puntos = puntaje
    }
    if (mascota != null) {
        gatito = mascota
    }
 }

 function main() {
    inicializar()
    mostrarFact()
    dibujarEnergia(gatito.energia)
    dibujarPuntos(puntos)
    dibujarLista("tareas", tareasSinCompletar, completar)
    dibujarLista("tareas-comp", tareasCompletadas, eliminar)
}

 main()