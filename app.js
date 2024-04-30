import express, { json } from 'express';
import fs from "fs";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

//leer la db.json 
const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

//aqui creamos la funcion para poder modificar el archivo
const writedata = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

app.get("/", (req, res) => {
    res.send("Bienvenidos a mi API REST")
})

//metodo GET 

app.get("/Peliculas", (req, res) => {
    const data = readData();
    res.json(data.Peliculas);
})

//Metodo GET por ID 
app.get("/Peliculas/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const Peliculas = data.Peliculas.find((Peliculas) => Peliculas.id === id);
    res.json(Peliculas);
});

//Metodo POST 
app.post("/Peliculas", (req, res) => {
    const data = readData();
    const body = req.body;
    const newPeliculas = {
        id: data.Peliculas.length + 1,
        ...body,
    };
    data.Peliculas.push(newPeliculas);
    writedata(data);
    res.json(newPeliculas);
});

//Metodo PUT
app.put("/Peliculas/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const PeliculasIndex = data.Peliculas.findIndex((Peliculas) => Peliculas.id === id);
    data.Peliculas[PeliculasIndex] = {
        ...data.Peliculas[PeliculasIndex],
        ...body,
    };
    writedata(data);
    res.json({ Message: "La pelicula fue Actualizada" });
});


//Metodo DELETE 
app.delete("/Peliculas/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const PeliculasIndex = data.Peliculas.findIndex((Peliculas) => Peliculas.id === id);
    data.Peliculas.splice(PeliculasIndex, 1);
    writedata(data);
    res.json({ Message: "La pelicula Fue eliminada" });
});

app.listen(3000, () => {
    console.log('Servidor escuchando peticiones en el puerto 3000');
});
//// de este objeto usamos la funcion listen para escuchar le pasamos el puerto 3000 y tambien le pasamos una funcion callback que lo que hace es imprimir un mensaje que el servidor esta escuchando en el puerto 3000