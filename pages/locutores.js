import styles from "../styles/locutores.module.css";
import { Fragment } from "react";
import Section from "../components/Layout/Section"
import Menu from "../components/Layout/Menu";
import CustomImage from "../components/UI/CustomImage";


export default function Locutores(props) {
  const personas = [
    {
      "nombre":"Jen",
      "programas": [
        {"nombre":"Lunes Inexpertos","horario":"Lunes 11am"},
        {"nombre":"Playlists Inexpertas","horario":"Viernes 11am"}
      ],
      "foto":"jen.png",
      "bio":"Jen es chida"
    },
    {
      "nombre":"Remofis",
      "programas": [
        {"nombre":"La Hora de la Bestia","horario":"Lunes a Viernes 10am"}
      ],
      "foto":"remofis.png",
      "bio":"Es la jefa de la bestia"
    },
    {
      "nombre":"Sandy",
      "programas": [
        {"nombre":"Supernova","horario":"Jueves 7pm"}
      ],
      "foto":"sandy.png",
      "bio":"Sandy lleva desde el principio"
    },
  ];

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

  const getLocutores = () => {
    let items = []
    for(let i = 0; i < personas.length; i++) {
      let item =
        <Section
          id={"locutor_"+i}
          titulo="/img/titulos/locutores.png"
          title_width="110"
        >
          {personas[i].nombre + ": "}
          {getBulletPoints(personas[i].programas)}
          <CustomImage
            resp_w="13vw"
            src={"/img/locutores/"+personas[i].foto}
            w="83"
            h="75"
            id={"foto"+i}
            // class={styles.player}
          />
          {personas[i].bio}
        </Section>;
      items.push(item);
    }
    return items;
  }
  
  return (
    <Fragment>
      <Menu home={false}/>
      {getLocutores()}
    </Fragment>
  );
}
