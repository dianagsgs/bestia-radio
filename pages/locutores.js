import styles from "../styles/locutores.module.css";
import axios from "axios";

import { Fragment, useEffect, useState } from "react";
import Section from "../components/Layout/Section"
import Menu from "../components/Layout/Menu";
import CustomImage from "../components/UI/CustomImage";


export default function Locutores(props) {

  let mobile = props.windowSize === "small";

  const [locutores, setLocutores] = useState(null);

  const getBulletPoints = (list) => {
    let points = [];
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
      mobile={mobile}
      background_num={props.randomBackground}
    >
      <div class={styles.content}>
        <div className="row">
          <div
            className={"col-lg-3"}
            class={
              mobile ? 
                styles.foto_locutor_fuera_mobile
              : styles.foto_locutor_fuera
            }
          >
            <CustomImage
              resp_w={mobile ? "58vw" : "20vw"}
              src={persona.foto}
              w="83"
              h="75"
              id={"foto"+persona.id}
              class={mobile ? styles.foto_locutor_dentro_mobile : styles.foto_locutor_dentro}
            />
          </div>
          <div className="col-lg-8">
            <p class={styles.font_nombre}>
              {persona.nombre + ":\n"}
              <span class={styles.font_insta}>
                {persona.insta}
              </span>
            </p>
            <p class={mobile ? styles.font_horario_mobile : styles.font_horario}>
              {getBulletPoints(persona.programas)}
            </p>
            <p class={mobile ? styles.font_bio_mobile : styles.font_bio}>
              {persona.bio}
            </p>
          </div>
        </div>
      </div>
    </Section>;
    return item;
  }

  const getItems = () => {
    let items = [];
    if(locutores !== null){
      for(let i = 0; i < locutores.length; i++) {
        items.push(getItem(locutores[i]));
      }
    }
    return items;
  };

  useEffect(() => {
    axios({
      method: "GET",
      url:"/api/get_locutores"
    })
    .then((response) => {
      setLocutores(response.data);      
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
      <Menu home={false} mobile={mobile}/>
        {getItems()}
    </Fragment>
  );
}
