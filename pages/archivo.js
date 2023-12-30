import { Fragment, useState } from "react";

import { useRouter } from "next/router";

import Menu from "../components/Layout/Menu";
import Section from "../components/UI/Section";
import Player from "../components/Layout/Player";

import axios from "axios";

export default function Archivo(props) {
  const router = useRouter();

  let mobile = props.windowSize === "small";

  let show = "archivo";
  if (router.asPath.includes("?")) show = router.asPath.split("id=")[1];
  const [articleData, setArticleData] = useState(<span/>);

  const getArticle = (id) => {
    axios({
      method: "GET",
      url:"/api/get_articulo?id="+id
    })
    .then((response) => {
      setArticleData(response.data);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
    return <span>{articleData}</span>;
  }

  return (
    <main style={props.background_style}>
      <Menu home={false} mobile={mobile}/>
      <Player mobile={mobile}/>
      <Section
        id={show}
        titulo="/img/titulos/editorial.png"
        mobile={mobile}
      >
        {show === "archivo" ?
        <span>
          AQUI VA TODO EL ARCHIVO
        </span> :
        getArticle(show)
        }
      </Section>
    </main>
  );
}
