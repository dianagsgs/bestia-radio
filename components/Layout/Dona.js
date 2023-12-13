import styles from "./Dona.module.css";
import { Fragment } from "react";
import Section from "./Section"

import head from 'next/head'

export default function Dona(props) {
  /*const kofi = 
    `<script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'/>
    <script>
      kofiwidgetoverlay.draw('pixelbakery', {
        'type': 'floating-chat',
        'floating-chat.donatebutton.text': 'tip us',
        'floating-chat.donatebutton.background-color': '#ff5f5f',
        'floating-chat.donatebutton.text-color': '#fff'
      });
    </script>`*/
  
  return (
    <Fragment>
      <Section
        id="dona"
        titulo="/img/titulos/dona.png"
        title_width="100"
        mobile={props.mobile}
        background_num={props.background_num}
      >
        DONA
      </Section>
    </Fragment>
  );
}
