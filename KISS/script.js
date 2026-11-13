
// 1. Lista de países
// Datos ilustrativos para practicar la funcionalidad.
const paises = [
    { pais: "Bolivia", razon: 101.5 },
    { pais: "Costa Rica", razon: 100 },
    { pais: "Honduras", razon: 100 },
    { pais: "Panamá", razon: 100 },
    { pais: "Nicaragua", razon: 100 },
    { pais: "México", razon: 99 },
    { pais: "Perú", razon: 99 },
    { pais: "Colombia", razon: 98.5 },
    { pais: "Ecuador", razon: 98 },
    { pais: "Chile", razon: 97 },
    { pais: "Brasil", razon: 96.5 },
    { pais: "El Salvador", razon: 96.5 },
    { pais: "República Dominicana", razon: 96 },
    { pais: "Guatemala", razon: 96 },
    { pais: "Venezuela", razon: 95.5 },
    { pais: "Uruguay", razon: 93.5 },
    { pais: "Puerto Rico", razon: 91.5 },
    { pais: "Cuba", razon: 91 }
];

// 2. Elementos de HTML
const buscador = document.getElementById("buscador");
const filtro = document.getElementById("filtro");
const cuerpo = document.getElementById("cuerpo");
const stats = document.getElementById("stats");
const estado = document.getElementById("estado");
const reiniciar = document.getElementById("reiniciar");

// Variables para ordenar la tabla
let orden = "razon";
let direccion = -1;

// 3. Clasificar los países
function clasificar(razon) {
    if (razon > 100.5) return "XY";
    if (razon >= 99.5) return "igual";
    return "XX";
}

// 4. Mostrar tabla
function mostrarTabla() {

    const busqueda = buscador.value.toLowerCase().trim();
    const categoria = filtro.value;

    // Buscar y filtrar
    const resultados = paises.filter(p => {

        const nombre = p.pais.toLowerCase();

        const coincideNombre = nombre.includes(busqueda);

        const coincideFiltro =
            categoria === "todos" ||
            clasificar(p.razon) === categoria;

        return coincideNombre && coincideFiltro;
    });

    // Ordenar resultados
    resultados.sort((a, b) => {

        const valorA = orden === "categoria"
            ? clasificar(a.razon) : a[orden];

        const valorB = orden === "categoria"
            ? clasificar(b.razon) : b[orden];

        if (typeof valorA === "string") {
            return valorA.localeCompare(valorB, "es") * direccion;
        }

        return (valorA - valorB) * direccion;
    });

    // Generar las filas de la tabla
    cuerpo.innerHTML = resultados.map(p => {

        const porcentaje = p.razon / (p.razon + 100) * 100;
        const categoria = clasificar(p.razon);

        let etiqueta = "Casi igual";

        if (categoria === "XY") etiqueta = "XY";
        if (categoria === "XX") etiqueta = "XX";

        return `
            <tr>
                <td>${p.pais}</td>
                <td>${p.razon}</td>

                <td>
                    <div class="bar">
                        <span class="xy"
                            style="width:${porcentaje}%">
                        </span>

                        <span class="xx"
                            style="width:${100 - porcentaje}%">
                        </span>
                    </div>
                </td>

                <td>
                    <span class="tag">${etiqueta}</span>
                </td>
            </tr>
        `;
    }).join("");

    // Mostrar estadísticas
    const cantidad = resultados.length;

    if (cantidad > 0) {

        const suma = resultados.reduce(
            (total, p) => total + p.razon, 0
        );

        const promedio = (suma / cantidad).toFixed(1);

        const mayor = resultados.reduce(
            (a, b) => a.razon > b.razon ? a : b
        );

        const menor = resultados.reduce(
            (a, b) => a.razon < b.razon ? a : b
        );

        stats.innerHTML = `
            <div class="stat">
                <span>Países encontrados</span>
                <strong>${cantidad}</strong>
            </div>

            <div class="stat">
                <span>Promedio H/100 M</span>
                <strong>${promedio}</strong>
            </div>

            <div class="stat">
                <span>Mayor proporción</span>
                <strong>${mayor.pais}</strong>
            </div>

            <div class="stat">
                <span>Menor proporción</span>
                <strong>${menor.pais}</strong>
            </div>
        `;

    } else {

        cuerpo.innerHTML = `
            <tr>
                <td colspan="4">
                    No se encontraron países
                </td>
            </tr>
        `;

        stats.innerHTML = `
            <div class="stat">
                <span>Países encontrados</span>
                <strong>0</strong>
            </div>
        `;
    }

    estado.textContent =
        `Mostrando ${cantidad} de ${paises.length} países`;
}

// 5. Buscador y filtro
buscador.addEventListener("input", mostrarTabla);
filtro.addEventListener("change", mostrarTabla);

// 6. Ordenar tabla
document.querySelectorAll("th[data-clave]").forEach(th => {

    th.addEventListener("click", () => {

        const nuevaOrden = th.dataset.clave;

        if (orden === nuevaOrden) {
            direccion *= -1;
        } else {
            orden = nuevaOrden;
            direccion = 1;
        }

        mostrarTabla();
    });
});

// 7. Reiniciar
reiniciar.addEventListener("click", () => {

    buscador.value = "";
    filtro.value = "todos";

    orden = "razon";
    direccion = -1;

    mostrarTabla();
});

// Mostrar tabla al abrir la página
mostrarTabla();
