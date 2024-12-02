const express = require("express");
const application = express();
const cors = require("cors");
application.use(cors());
const pokemon = require("./pokedex.json");
const types = require("./types.json");


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



application.get("/types", (request, response) => {
   response.send(types)
});
application.listen(8000, () => console.log("servere started"));
