import styles from "../styles/locutores.module.css";
import axios from "axios";

import { Fragment, useEffect, useState } from "react";
import Section from "../components/Layout/Section"
import Menu from "../components/Layout/Menu";
import CustomImage from "../components/UI/CustomImage";


export default function Locutores(props) {
  const [locutores, setLocutores] = useState(null);

  const getBulletPoints = (list) => {
    let points = []
    for(let i = 0; i < list.length; i++) {
      let point =
        <div>
          {list[i].nombre + ", " + list[i].horario}
        </div>;
      points.push(point);
    }
    return points;
  }

  const getItem = (persona) => {
    let item =
    <Section
      id={"locutor_"+persona.id}
      titulo="/img/titulos/locutores.png"
      title_width="110"
    >
      {persona.nombre + ": "}
      {getBulletPoints(persona.programas)}
      <CustomImage
        resp_w="20vw"
        src={"/img/locutores/"+persona.foto}
        w="83"
        h="75"
        id={"foto"+persona.id}
        // class={styles.player}
      />
      {persona.bio}
    </Section>;
    return item;
  }

  useEffect(() => {
    axios({
      method: "GET",
      url:"/api/get_locutores"
    })
    .then((response) => {
      const personas = response.data;
      let items = []
      for(let i = 0; i < personas.length; i++) {
        items.push(getItem(personas[i]));
      }
      setLocutores(items);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }, []);
  
  return (
    <Fragment>
      <Menu home={false}/>
        {locutores}
    </Fragment>
  );
}
