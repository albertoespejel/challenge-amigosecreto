let amigos = [];
let sorteados = [];

function agregarAmigo() {
//Captura el input del usuario.
    let input = document.querySelector("#amigo");
    let nombre = input.value.trim();

//Valida la entrada para que efectivamente se ingrese un nombre y no un espacio en blanco.
    if (nombre === ""){
        alert("Ingrese un nombre.");
        return;
}

//Valida que el nombre no esté repetido e ignora mayúsculas/minúsculas
if (amigos.some(function(amigo) {
        return amigo.toLowerCase() === nombre.toLowerCase();
    })) {
        alert("Ese nombre ya fue ingresado.");
        return;
    }

//Agrega el nombre al array
amigos.push(nombre);

//limpia el input
input.value = "";

//Muestra la lista de amigos en pantalla
mostrarLista();

}

function mostrarLista(){
//Obtiene y conecta la variable listaNombres con el elemento <ul> de la pagina (id="listaAmigos").
    let listaNombres = document.getElementById("listaAmigos");
//Limpia la lista previa
    listaNombres.innerHTML = "";
for (let i = 0; i < amigos.length; i++) {
    let li = document.createElement("li");
    li.textContent = amigos[i];
// Si ya fue sorteado, agrega texto tachado al nombre
if (sorteados.includes(amigos[i])) {
    li.classList.add("tachado");
}
    listaNombres.appendChild(li);
    }

//Habilita o deshabilita el botón de sorteo según la cantidad de amigos
let btnSortear = document.getElementById("btnSortear");
btnSortear.disabled = amigos.length < 2 || sorteados.length === amigos.length;
}

function sortearAmigo() {
//Filtra los amigos que no han sido sorteados
let disponibles = amigos.filter(nombre=>
    !sorteados.includes(nombre)
);
//Valida que haya amigos para sortear
    if (disponibles.length === 0) {
    alert("¡Todos los nombres ya fueron sorteados! La lista se reiniciará para volver a jugar.");
    // Limpiar listas y UI para volver a jugar
    amigos = [];
    sorteados = [];
    mostrarLista();
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    resultado.style.display = "none";
    return;
    }
    if (amigos.length < 2) {
        alert("Agregá al menos dos nombres para sortear.");
        return;
    }
//Genera un índice aleatorio válido
let indice = Math.floor(Math.random() * disponibles.length);
//Obtiene el nombre sorteado
let nombreSorteado = disponibles[indice];
sorteados.push(nombreSorteado);

// Muestra el resultado en el elemento de id="resultado" y lo hace visible
let resultado = document.getElementById("resultado");
resultado.innerHTML = nombreSorteado;
resultado.style.display = "inline-block";

// Actualiza la lista para tachar
mostrarLista();

}

//Permite ingresar nombres presionando Enter
document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
});
