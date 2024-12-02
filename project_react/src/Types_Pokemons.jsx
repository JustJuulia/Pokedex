import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Types_Pokemons({ onTypesChange }) {
  const [types, setTypes] = useState([]);
  const [typesState, setTypesState] = useState([]);

  const typesChanged = (event) => {
    const updatedState = typesState.map((type) =>
      type.name === event.target.value
        ? { ...type, state: event.target.checked }
        : type
    );
    setTypesState(updatedState);
    const activeTypes = updatedState
      .filter((type) => type.state)
      .map((type) => type.name);
    onTypesChange(activeTypes);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/types`)
      .then((response) => {
        const initialState = response.data.map((type) => ({
          name: type.english,
          state: false,
        }));
        setTypes(response.data);
        setTypesState(initialState);
      })
      .catch((error) => {
        console.error("Error fetching types:", error);
        setTypes([]);
      });
  }, []);

  return (
    <div>
      {types.map((type, index) => (
        <div key={index}>
          <input
            type="checkbox"
            className="form-check-input"
            value={type.english}
            onChange={typesChanged}
          />
          <label className="form-check-label">{type.english}</label>
        </div>
      ))}
    </div>
  );
}
