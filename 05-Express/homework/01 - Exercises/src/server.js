const express = require("express");

let publications = [];
let counter = 1;

const server = express();

server.use(express.json());

server.post("/posts", (req,res) => {
    const { author, title, contents } = req.body;
    if (!author || !title || !contents) {
        return res.status(400).json({ 
        error: "No se recibieron los parámetros necesarios para crear la publicación" });
      }    

      const newPublication = {
        id: counter++,
        author,
        title,
        contents,
      };
      
      publications.push(newPublication);
      
      return res.status(201).json(newPublication);
    });

server.get(`/posts`, (req, res) => {
        const { author, title } = req.query;

  const matchingPublications = publications.filter(
    (publication) => publication.author === author && publication.title === title
  );

  if (matchingPublications.length > 0) {
    res.json(matchingPublications);
  } else {
    res.status(404).json({
      error: "No existe ninguna publicación con dicho título y autor indicado",
    });
  }
    });

server.get("/posts/:author", (req, res) => {
    const author = req.params.author;

    const matchingPublications = publications.filter(
        (publication) => publication.author === author
    );

    if (matchingPublications.length > 0) {
        res.json(matchingPublications);
    } else {
        res.status(404).json({
            error: "No existe ninguna publicación del autor indicado",
        });
    }
})

server.put("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
  const { title, contents } = req.body;

  if (!title || !contents) {
    return res
      .status(400)
      .json({ error: "No se recibieron los parámetros necesarios para modificar la publicación" });
  }

  const publication = publications.find((publication) => publication.id === id);

  if (!publication) {
    return res
      .status(404)
      .json({ error: "No se recibió el id correcto necesario para modificar la publicación" });
  }

  publication.title = title;
  publication.contents = contents;

  return res.json(publication);
});

server.delete("/posts/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!id) {
        return res.status(400).json({ error: "No se recibió el id de la publicación a eliminar" });
    }

    const publicationIndex = publications.findIndex((publication) => publication.id === id);

    if (publicationIndex === -1) {
        return res.status(404).json({ error: "No se recibió el id correcto necesario para eliminar la publicación" });
    }

    publications.splice(publicationIndex, 1);

    return res.json({ success: true });
});

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
