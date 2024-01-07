import styles from "./Radioteca.module.css";
import { Fragment } from "react";
import Section from "../../UI/Section";


import ResponsiveCarousel from "../../UI/ResponsiveCarousel";

export default function Radioteca(props) {

  /** TODO: ESTE COMPONENTE VA A CAMBIAR PORQUE AHORA VAN A VENIR DE SPOTIFY */

  const getWidgets = () => {
    let soundcloud_playlist_ids = [
      "1426978537","1426941700","1495489246","1494067222",
      "1493662096","1486782376","1463283238","1463278612",
      "1456534117","1431189352","1431186250","1430416264",
      "1427460292","1427444530","1427436862","1427422831",
      "1427413078","1427405134","1427396665","1427310826",
      "1427297695","1427227621","1427218726","1523337073",
      "1426965097","1497018316","1426332235","1426324255",
      "1426290625","1426287838","1413248044","1410220738"
    ];
    let items = [];
    for (let i = 0; i < soundcloud_playlist_ids.length; i++){
      let item = 
        <iframe
          key={i}
          width="77%"
          height="320"
          frameBorder="no"
          src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/"+soundcloud_playlist_ids[i]+"&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"}
        />
      items.push(item);
    }
    return items;
  }
  
  return (
    <Fragment>
      <Section
        id="radioteca"
        titulo="/img/titulos/radioteca.png"
        mobile={props.mobile}
      >
        <ResponsiveCarousel
          infinite={true}
        >
          {getWidgets()}
        </ResponsiveCarousel>
      </Section>
    </Fragment>
  )
}
