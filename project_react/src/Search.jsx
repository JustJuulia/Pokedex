import Types_Pokemons from "./Types_Pokemons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Picked_Card from "./Picked_Card";

export default function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [pickedPokemon, setPickedPokemon] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const pokemonPicked = (id_n) => {
    setPickedPokemon(id_n);
  };

  const searchdata = (s, t) => {
    if (s.length > 0) {
      axios
        .get(`http://localhost:8000/search?val=${s}&type=${t}`)
        .then((response) => {
          console.log("Filtered Pokémon:", response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setData([]);
        });
    }
    if (s.length === 0) {
      setData([]);
    }
  };

  return (
    <>
      <div className="input-group">
        <input
          type="search"
          className="form-control"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            searchdata(e.target.value, selectedTypes.join(","));
          }}
        ></input>
      </div>
      <div>
        {data.length > 0 ? (
          data.map((post, index) => (
            <h1 key={index}>
              {post.name.english}{" "}
              <input
                type="button"
                onClick={() => pokemonPicked(post.id)}
                value={post.name.english}
              ></input>
            </h1>
          ))
        ) : (
          <p></p>
        )}
      </div>
      <Types_Pokemons
        onTypesChange={(types) => {
          setSelectedTypes(types);
          searchdata(search, types.join(","));
        }}
      />
      {pickedPokemon && <Picked_Card id={pickedPokemon} />}
    </>
  );
}
