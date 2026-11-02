
import { useState } from "react";

export default function App() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviar = (e) => {
    e.preventDefault();

    if (!nombre || !apellidos || !correo || !clave) {
      setMensaje("Completa todos los campos.");
      return;
    }

    setMensaje(`Bienvenido, ${nombre} ${apellidos}`);
  };

  return (
    <main style={{ maxWidth: 360, margin: "40px auto", padding: 16 }}>
      <h1>Registro de usuario</h1>

      <form onSubmit={enviar} style={{ display: "grid", gap: 12 }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />

        <button type="submit">Registrar</button>
      </form>

      <p>{mensaje}</p>
    </main>
  );
}
