import Types_Pokemons from "./Types_Pokemons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Picked_Card from "./Picked_Card";
import './styles.css';

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
    <div className="whole_side">
    <div className="left_side">
      <div className="search_with_type">
      <div className="search_class">
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
      </div>
      <div className="types_class">
      <Types_Pokemons
        onTypesChange={(types) => {
          setSelectedTypes(types);
          searchdata(search, types.join(","));
        }}
      />
      </div>
      </div>
      <div className="results_class">
        {data.length > 0 ? (
          data.map((post, index) => (
            <div key={index} className="one_result_class">
              <img src={`http://localhost:8000/images/${post.id}`} height="200px" width="200px"></img>
              <br></br>
              <br></br>
              <input
                className="btn btn-outline-info"
                type="button"
                onClick={() => pokemonPicked(post.id)}
                value={post.name.english}
                
              ></input>
            </div>
          ))
        ) : (
          <p></p>
        )}
        </div>
      </div>
      <div className="right_side">
      {pickedPokemon && <Picked_Card id={pickedPokemon} />}
      </div>
      </div>
    </>
  );
}
