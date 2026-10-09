
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mostrar archivos HTML, CSS, JS e imágenes
app.use(express.static(path.join(__dirname, "public")));

// Obtener todos los productos
app.get("/electronicos", (req, res) => {
    try {
        const ruta = path.join(__dirname, "ejem.json");

        const datos = JSON.parse(
            fs.readFileSync(ruta, "utf8")
        );

        res.json(datos);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al cargar productos"
        });
    }
});

// Obtener producto por ID
app.get("/electronicos/:id", (req, res) => {
    const ruta = path.join(__dirname, "ejem.json");

    const datos = JSON.parse(
        fs.readFileSync(ruta, "utf8")
    );

    const producto = datos.electronicos.find(
        p => p.id === Number(req.params.id)
    );

    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    res.json(producto);
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});




/*import express from "express";
import fs from "fs";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());


const readData = () => {
    try {
        const data = fs.readFileSync("./ejem.json", "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./ejem.json", JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    res.send("API funcionando correctamente");
});

app.get("/electronicos", (req, res) => {
    const data = readData();
    res.json(data.electronicos);
});

app.get("/electronicos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const electronico = data.electronicos.find((electronico) => electronico.id === id);
    res.json(electronico);
});

app.post("/electronicos", (req, res) => {
    const data = readData();
    const body = req.body;
    const newElectronico = {
        id: data.electronicos.length + 1,
        ...body,
    };
    data.electronicos.push(newElectronico);
    writeData(data);
    res.json(newElectronico);

});

app.put("/electronicos/:id", (req,res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const elecIndex = data.electronicos.findIndex((electronico) => electronico.id === id);
    data.electronicos[elecIndex] = {
        ...data.electronicos[elecIndex],
        ...body,
    };
    writeData(data);
});

app.delete("/electronicos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const elecIndex = data.electronicos.findIndex((electronico) => electronico.id === id);
    data.electronicos.splice(elecIndex, 1);
    writeData(data);
    res.json({
        message: "Electronico borrado correctamente"
    });
})

app.listen(3001, () => {
    console.log("Servidor escuchando por el puerto 3001");
});*/