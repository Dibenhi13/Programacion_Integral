
const contenedor = document.getElementById("productos");

async function cargarProductos() {
    try {
        const respuesta = await fetch("/electronicos");

        if (!respuesta.ok) {
            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );
        }

        const datos = await respuesta.json();

        console.log("Datos recibidos:", datos);

        if (!Array.isArray(datos.electronicos)) {
            throw new Error("Formato de JSON incorrecto");
        }

        contenedor.innerHTML = "";

        datos.electronicos.forEach(producto => {
            const tarjeta = document.createElement("div");

            tarjeta.classList.add("producto-card");

            tarjeta.innerHTML = `
                <img
                    src="${producto.imagen}"
                    alt="${producto.producto}"
                >

                <div class="producto-info">
                    <h3>${producto.producto}</h3>

                    <p><strong>ID:</strong> ${producto.id}</p>

                    <p><strong>Marca:</strong> ${producto.marca}</p>

                    <p class="precio">
                        $${producto.precio.toLocaleString("es-MX")}
                    </p>

                    <p class="stock">
                        Stock disponible: ${producto.stock}
                    </p>
                </div>
            `;

            contenedor.appendChild(tarjeta);
        });

    } catch (error) {
        console.error("Error al cargar productos:", error);

        contenedor.innerHTML = `
            <p>No se pudieron cargar los productos:
            ${error.message}</p>
        `;
    }
}

cargarProductos();
