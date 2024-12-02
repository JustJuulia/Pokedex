const express = require("express");
const application = express();
const cors = require("cors");
application.use(cors());
const pokemon = require("./pokedex.json");
const types = require("./types.json");
const path = require('path')

application.get("/types", (request, response) => {
  response.send(types)
});
application.get("/type/:typ", (request, response) => {
  const picked_by_type = pokemon.filter((pokem) => pokem.type.includes(request.params.typ))
  response.send(picked_by_type);
})
application.get("/search", (request, response) => {
  const val = request.query.val;
  const types = request.query.type;
  let filtered = pokemon.filter((pokem) =>
    pokem.name.english.toLowerCase().includes(val.toLowerCase())
  );

  if (types) {
    const selectedTypes = types.split(",").map((type) => type.trim());
    filtered = filtered.filter((pokem) =>
      pokem.type.some((type) => selectedTypes.includes(type))
    );
  }

  response.send(filtered);
});

application.get("/images/:id", (request, response) => {
  const id_p = request.params.id.padStart(3, '0');
  const path_img = path.join(__dirname, 'images', `${id_p}.png`);
  response.sendFile(path_img, (err) =>{
    if (err) {
      res.status(404).json({ error: `Image not found ${path_img}` });
    }
  })
});

application.get("/:id", (request, response) => {
  let poki = pokemon.find(poke => poke.id === parseInt(request.params.id));
  if (poki) {
    response.send(poki);
  }
})


application.listen(8000, () => console.log("servere started"));
