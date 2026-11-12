// =====================================
// 1. CREAR EL MAPA DE ESTELÍ
// =====================================

const mapa = L.map("mapa").setView([13.09346, -86.35495], 16);

// Agregar el mapa base
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,

    referrerPolicy: "strict-origin-when-cross-origin",

    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);


// =====================================
// 2. LUGARES DEL RECORRIDO CULTURAL
// =====================================

const lugares = [
    {
        nombre: "Parque Central 19 de Julio",
        coordenadas: [13.093061, -86.356088],
        descripcion: "Punto de inicio de nuestro recorrido cultural por Estelí."
    },
    {
        nombre: "Centro Cultural Felipe Urrutia",
        coordenadas: [13.092550, -86.356194],
        descripcion: "Espacio dedicado a la cultura y las expresiones artísticas."
    },
    {
        nombre: "Casa de Cultura Leonel Rugama",
        coordenadas: [13.091785, -86.355584],
        descripcion: "Espacio de formación artística y promoción cultural."
    },
    {
        nombre: "Casa de Cultura Ciro Molina",
        coordenadas: [13.088042, -86.354671],
        descripcion: "Espacio dedicado a las artes plásticas y al muralismo."
    }
];


// =====================================
// 3. AGREGAR MARCADORES
// =====================================

// Aquí guardamos los marcadores para usarlos después.
const marcadores = {};

lugares.forEach(function(lugar, indice) {

    const marcador = L.marker(lugar.coordenadas).addTo(mapa);

    marcador.bindPopup(`
        <div>
            <h3>${lugar.nombre}</h3>
            <p>${lugar.descripcion}</p>
            <p><strong>Parada ${indice + 1} del recorrido</strong></p>
            <a
                href="https://www.google.com/maps/dir/?api=1&destination=${lugar.coordenadas[0]},${lugar.coordenadas[1]}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Cómo llegar
            </a>
        </div>
    `);

    // Guardar cada marcador usando el nombre del lugar.
    marcadores[lugar.nombre] = marcador;

});


// =====================================
// 4. DIBUJAR LA LÍNEA DEL RECORRIDO
// =====================================

const coordenadasRecorrido = lugares.map(function(lugar) {
    return lugar.coordenadas;
});

const recorrido = L.polyline(coordenadasRecorrido, {
    color: "#1f4d3b",
    weight: 5,
    opacity: 0.8,
    dashArray: "10, 8"
}).addTo(mapa);

recorrido.bindPopup(
    "Recorrido cultural: Raíces y Rutas de Estelí"
);


// Ajustar el mapa para mostrar todos los lugares.
mapa.fitBounds(recorrido.getBounds(), {
    padding: [30, 30]
});


// =====================================
// 5. HACER FUNCIONAR LOS BOTONES
// =====================================

const tarjetas = document.querySelectorAll(".tarjeta");

tarjetas.forEach(function(tarjeta, indice) {

    const boton = tarjeta.querySelector(".boton");
    const lugar = lugares[indice];

    if (boton && lugar) {

        boton.href = "#mapa";

        boton.addEventListener("click", function(evento) {

            evento.preventDefault();

            // Centrar el mapa en el lugar seleccionado.
            mapa.setView(lugar.coordenadas, 18);

            // Abrir la información del marcador.
            marcadores[lugar.nombre].openPopup();

            // Desplazarse hasta el mapa.
            document.querySelector("#mapa").scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }

});

// =====================================
// BOTÓN PARA MOSTRAR TODOS LOS LUGARES
// =====================================

// Botón para mostrar todos los lugares
const botonMostrarTodos = document.getElementById("mostrar-todos");

if (botonMostrarTodos) {
    botonMostrarTodos.addEventListener("click", function() {

        const coordenadas = lugares.map(function(lugar) {
            return lugar.coordenadas;
        });

        mapa.fitBounds(coordenadas, {
            padding: [40, 40],
            maxZoom: 16,
            animate: true
        });

    });
}