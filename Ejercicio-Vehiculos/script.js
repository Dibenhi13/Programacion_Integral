
const vehiculos = [
    { id: 1, marca: "Toyota", modelo: "Corolla", precio: 500 },
    { id: 2, marca: "Nissan", modelo: "Sentra", precio: 600 },
    { id: 3, marca: "Honda", modelo: "Civic", precio: 700 }
];

// Spread Operator para copiar el arreglo
const vehiculosDisponibles = [...vehiculos];

// Agregar otro vehículo con Spread Operator
const nuevosVehiculos = [
    ...vehiculosDisponibles,
    { id: 4, marca: "Mazda", modelo: "CX-5", precio: 900 }
];

const contenedor = document.getElementById("vehiculos");
const seleccion = document.getElementById("seleccion");

// Mostrar vehículos
nuevosVehiculos.forEach(vehiculo => {
    contenedor.innerHTML += `
        <p>
            ${vehiculo.marca} ${vehiculo.modelo}
            - $${vehiculo.precio} por día
        </p>
    `;

    seleccion.innerHTML += `
        <option value="${vehiculo.id}">
            ${vehiculo.marca} ${vehiculo.modelo}
        </option>
    `;
});

// Función para rentar vehículo
function rentarVehiculo() {
    const id = Number(document.getElementById("seleccion").value);
    const dias = Number(document.getElementById("dias").value);

    if (!Number.isInteger(dias) || dias < 1) {
        document.getElementById("resultado").innerText =
            "Ingresa un número válido de días.";
        return;
    }

    const vehiculo = nuevosVehiculos.find(v => v.id === id);

    // Spread Operator para copiar el objeto y agregar datos
    const renta = {
        ...vehiculo,
        dias: dias,
        total: vehiculo.precio * dias
    };

    document.getElementById("resultado").innerText =
        `Rentaste un ${renta.marca} ${renta.modelo}
        por ${renta.dias} días.
        Total a pagar: $${renta.total}`;
}
