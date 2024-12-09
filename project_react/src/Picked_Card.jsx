import axios from "axios";
import { useState, useEffect } from "react";
import "./styles.css";
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
    <div className="picked_class">
      <div className="picked_title">
        <h2>{info.name.english}</h2>
      </div>
      <img
         src={`http://localhost:8000/images/${props.id}`}
        className="picked_image"
      ></img>
      <div className="picked_types">
        <h3> Types: <p>{info.type ? info.type.join(", ") : "Loading types..."}</p></h3>
      </div>
      <div className="picked_infos">
        <div>
        <p>HP: {info.base ? info.base.HP : "Loading..."}</p>
        <p>Attack: {info.base ? info.base.Attack : "Loading..."}</p>
        <p>Defense: {info.base ? info.base.Defense : "Loading..."}</p>
        </div>
        <div className="info_picked_right_side">
        <p>Sp. Attack: {info.base ? info.base["Sp. Attack"] : "Loading..."}</p>
        <p>Sp. Defense: {info.base ? info.base["Sp. Defense"] : "Loading..."}</p>
        <p>Speed: {info.base ? info.base.Speed : "Loading..."}</p>
        </div>
      </div>
    </div>
  );
}
