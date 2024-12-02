const express = require("express");
const application = express();
const cors = require("cors");
application.use(cors());
const pokemon = require("./pokedex.json");
const types = require("./types.json");


application.get("/search", (request, response) => {
  const val = request.query.val;
  if (val) {
    const filtered = pokemon.filter((pokem) =>
        pokem.name.english.toLowerCase().includes(val.toLowerCase())
      );
      
    response.send(filtered)
  } else {
      response.status(400).json({ error: "Query parameter 'val' is required" });
  }
});

application.get("/types", (request, response) => {
   const type = types.filter((type) => type.english);
   console.log(type)
   response.send(type)
});
application.listen(8000, () => console.log("servere started"));
