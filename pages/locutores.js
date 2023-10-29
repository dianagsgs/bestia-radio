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

  useEffect(() => {
    axios({
      method: "GET",
      url:"/api/get_locutores"
      //url:"/api/healthchecker"
    })
    .then((response) => {
      console.log('NO ERROR');
      const personas = response.data;
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
