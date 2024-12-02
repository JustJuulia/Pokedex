import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
export default function Types_Pokemons(){
    const [types, setTypes] = useState([]);
    useEffect(() => {
    axios
      .get(`http://localhost:8000/types`)
      .then((response) => {
       setTypes(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setTypes([])
      })
},[]); 
    return(
        <>
        <div>{
                types.map((type, index) => (
                    <div key={index}>
                    <input type="checkbox" class="form-check-input" />
                    <label class="form-check-label">{type.english}</label>
                    </div>
                ))
            }
        </div>
        </>
    );
}