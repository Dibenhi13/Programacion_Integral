import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./deportes.json", "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./deportes.json", JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    res.send("API de deportes funcionando correctamente");
});

app.get("/deportes", (req, res) => {
    const data = readData();
    res.json(data.deportes);
});

app.get("/deportes/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);

    const deporte = data.deportes.find(
        (deporte) => deporte.id === id
    );

    res.json(deporte);
});

app.post("/deportes", (req, res) => {
    const data = readData();
    const body = req.body;

    const newDeporte = {
        id: data.deportes.length + 1,
        ...body,
    };

    data.deportes.push(newDeporte);
    writeData(data);

    res.json(newDeporte);
});

app.put("/deportes/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);

    const deporteIndex = data.deportes.findIndex(
        (deporte) => deporte.id === id
    );

    data.deportes[deporteIndex] = {
        ...data.deportes[deporteIndex],
        ...body,
    };

    writeData(data);

    res.json(data.deportes[deporteIndex]);
});

app.delete("/deportes/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);

    const deporteIndex = data.deportes.findIndex(
        (deporte) => deporte.id === id
    );

    data.deportes.splice(deporteIndex, 1);
    writeData(data);

    res.json({
        message: "Deporte borrado correctamente"
    });
});

app.listen(3001, () => {
    console.log("Servidor escuchando por el puerto 3001");
});