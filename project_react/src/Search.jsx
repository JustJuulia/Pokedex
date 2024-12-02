import Types_Pokemons from "./Types_Pokemons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import Picked_Card from "./Picked_Card";
export default function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [picked_pokemon, setPicked_Pokemon] = useState("");
  const pokemon_picked = (id_n) =>{
    setPicked_Pokemon(id_n);
  }
  const searchdata = (v) => {
    if (!v) {
      setData([]);
      return;
    }
    axios
      .get(`http://localhost:8000/search?val=${v}`)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([]); 
      })
      .finally(() => {
        console.log("here is finally");
      });
  };
  return (
    <>
      <div class="input-group">
        <input
          type="search"
          class="form-control"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            searchdata(e.target.value);
          }}
        ></input>
      </div>
      <div>
      {data.length > 0 ? (
          data.map((post, index) => (
            <h1 key={index}>{post.name.english} <input type='button' onClick={() => pokemon_picked(post.id)} value={post.name.english} ></input></h1>
          ))
        ) : (
            <p></p>
        )}
      </div>
      <Types_Pokemons />
      {picked_pokemon && <Picked_Card id={picked_pokemon} />}
    </>
  );
}
