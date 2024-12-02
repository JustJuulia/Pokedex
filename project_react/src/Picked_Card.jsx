import axios from "axios";
import { useState, useEffect } from "react";

export default function Picked_Card(props) {
  const [info, setInfo] = useState({});
  useEffect(() => {
    const search_info = () => {
      axios
        .get(`http://localhost:8000/${props.id}`)
        .then((response) => {
          setInfo(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setInfo({}); 
        });
    };

    search_info();
  }, [props.id]);

  if (!info.name) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{info.name.english}</h1>
      <h2>{info.type ? info.type.join(", ") : "Loading types..."}</h2>
      <h3>HP: {info.base ? info.base.HP : "Loading..."}</h3>
    </div>
  );
}
