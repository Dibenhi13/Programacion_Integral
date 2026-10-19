function saludar (nombre) {
    console.log("Hola " + nombre);
}

function procesarUsuario(nombre, callback){
    //Simula una operacion

    callback(nombre);
}

procesarUsuario("Ana", saludar); //"Hola Ana" se imprime despues