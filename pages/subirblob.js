import { Fragment, useEffect, useState } from "react";
import { put } from "@vercel/blob";
import axios from "axios";

import styles from "../styles/subirblob.module.css";

export default function Subirblob(props) {
 
  /** ------------------------ CONSTANTS */

  // TODO: no subir el TOKEN ASI
  const BLOB_TOKEN = "vercel_blob_rw_VVQSKZPtiR4L8fS6_2GXlbBWoqH8N9DPnAoUCoq8tQKFazo";
  const BLOB_NAME = 'articulos/placeholderraro.png';
  
  const [file, setFile] = useState(null);
  const [logged_in, setLoggedIn] = useState(false);
  const [articulos, setArticulos] = useState([{id: "wait"}]);

  /** ------------------------ FUNCTIONS */

  /** GENERAL */

  const alertError = (api, error) => {
    alert("HUBO UN PROBLEMA CON: " + api + "-" + error +". Por favor toma un screenshot de toda la pantalla y contacta a Diana");
  };

  const showFile = input => {
    setFile(input.target.files[0]);
  };

  const subir_blob = async () => {
    const { url } = await put(BLOB_NAME, file, { access: 'public', token: BLOB_TOKEN });
    alert('URL: ' + url);
  };

  const login = () => {
    let email = document.getElementById("login_email").value;
    let password = document.getElementById("login_pw").value;
    axios({
      method: "GET",
      url:"/api/login?query=SELECT Id FROM login WHERE Email = '"+ email+"' AND Pass = '"+password+"'"
    })
    .then((response) => {
      if(response.data == '[]'){
        alert("LOGIN INCORRECTO");
      } else {
        setLoggedIn(true);
        document.cookie = "bestiaAdminLoggedIn=true";
      }
    }).catch((error) => {
      if (error.response) {
        alertError("login", error);
      }
    })
  };

  /** GUARDAR COSAS */

  const guardar_cosas = (api, values) => {
    axios({
      method: "POST",
      url:"/api/"+api+"?values="+values
    })
    .then((response) => {
      alert("listo "+api);
      location.reload();
    }).catch((error) => {
      if (error.response) {
        alertError(api,error);
      }
    })
  };

  // GUARDAR PROGRAMA:

  const guardar_programa = () => {
    let id = document.getElementById("id_programa").value;
    let nombre = document.getElementById("nombre_programa").value;
    let hora = document.getElementById("hora_programa").value;
    let activo = document.getElementById("activo").checked;
    let lunes = document.getElementById("lunes").checked;
    let martes = document.getElementById("martes").checked;
    let miercoles = document.getElementById("miercoles").checked;
    let jueves = document.getElementById("jueves").checked;
    let viernes = document.getElementById("viernes").checked;
    let sabado = document.getElementById("sabado").checked;
    let domingo = document.getElementById("domingo").checked;
    let values = 
      "("+id+", '"+nombre+"', '"+hora+":00', "+activo+", "+lunes+", "+martes+", "+miercoles+", "+jueves+", "+viernes+", "+sabado+", "+domingo+")"
    
    guardar_cosas("post_programa",values);
  }

  // GUARDAR LOCUTOR:

  const guardar_locutor = () => {
    let id = document.getElementById("id_locutor").value;
    let nombre = document.getElementById("nombre_locutor").value;
    let path_foto = document.getElementById("path_foto_locutor").value;
    let bio = document.getElementById("bio").value;
    let instagram = document.getElementById("instagram").value;
    let values = 
      "("+id+", '"+nombre+"', '"+path_foto+"', '"+bio+"', '"+instagram+"')";

    guardar_cosas("post_locutor",values);
  }

  // GUARDAR LINK:

  const guardar_link = () => {
    let id = document.getElementById("id_link").value;
    let id_locutor = document.getElementById("id_locutor_link").value;
    let id_programa = document.getElementById("id_programa_link").value;
    let values = 
      "("+id+", "+id_locutor+", "+id_programa+")";

    guardar_cosas("link_locutor_programa",values);
  }

  // GUARDAR EVENTO:

  const guardar_evento = () => {
    let id = document.getElementById("id_evento").value;
    let flyer = document.getElementById("flyer").value;
    let nombre = document.getElementById("nombre_evento").value;
    let lugar = document.getElementById("lugar").value;
    let fecha = document.getElementById("fecha_evento").value;
    let hora = document.getElementById("hora_evento").value;
    let precio = document.getElementById("precio").value;
    let registro = document.getElementById("registro").checked;
    let values = 
      "("+id+", '"+flyer+"', '"+nombre+"', '"+lugar+"', '"+fecha+"', '"+hora+":00', '"+precio+"', "+registro+")";
    guardar_cosas("post_evento",values);
  }

   // GUARDAR ARTICULO:

   const guardar_articulo = async () => {
    let confirm = window.confirm("Asegurate de que todos los datos estén corretos y si es así, da click en ok Aceptar para guardar");

    if (confirm) {

      const { url } = await put("articulos/"+file.name, file, { access: 'public', token: BLOB_TOKEN });

      let id = document.getElementById("id_articulo").value;
      let tipo = document.getElementById("tipo").value;
      let titulo = document.getElementById("titulo_articulo").value; 
      let blurb = document.getElementById("blurb").value;
      let texto = document.getElementById("texto_articulo").value;
      let date = new Date();
      let fecha =date.toISOString();// document.getElementById("fecha_articulo").value;
      let autor = document.getElementById("autor").value;
      let link = document.getElementById("link_articulo").value;
      let values = 
        "("+id+", '"+tipo+"', '"+titulo+"', '"+url+"', '"+blurb+"', '"+texto+"', '"+fecha+"', '"+autor+"', '"+link+"', true)";

      guardar_cosas("post_articulo",values);
    }
  }

  /** GET COSAS */

  const getListaArticulos = () => {
    let items=[];
    for(let i = 0; i < articulos.length; i++) {
      let item = 
      <div>
        {articulos[i].tipo}: {articulos[i].titulo}
        <button onClick={() => hideArticulo(articulos[i].id, articulos[i].activo)}>{articulos[i].activo ? "HIDE" : "UNHIDE"}</button>
        <button disabled onClick={() => editArticulo(articulos[i].id)}>EDIT</button>
        <button disabled onClick={() => dropArticulo(articulos[i].id, articulos[i].titulo)}>DROP</button>
      </div>;
      items.push(item);
    }
    return items;
  };

  /** OCULTAR COSAS */

  const hideArticulo = (id, activo) => {
    let set_where = `SET Activo = ${!activo} WHERE Id = ${id}`
    axios({
      method: "POST",
      url:"/api/update_articulo?set_where="+set_where
    })
    .then((response) => {
      alert("listo update_articulo");
      location.reload();
    }).catch((error) => {
      if (error.response) {
        alertError("update_articulo", error)
      }
    })
  };

  /** EDITAR COSAS */

  const editArticulo = (id) => {
    console.log("edit " + id);
  };

  /** BORRAR COSAS */

  const dropArticulo = (id, titulo) => {
    let yes = confirm("estas segura de que quieres borrar " + titulo + "??");
    if (yes) {
      console.log("drop " + id);
    }
  };


  /** ------------------------ USE EFFECT */

  useEffect(() => {
    setLoggedIn(document.cookie.includes("bestiaAdminLoggedIn=true"));
    axios({
      method: "GET",
      url:"/api/get_articulos"
    })
    .then((response) => {
      setArticulos(response.data);
    }).catch((error) => {
      if (error.response) {
        alertError("get_articulos", error);
      }
    })
  }, []);

  /** ------------------------ CONTENT */

  const subirBlobContent = () => {
    return (
      <span>
        <h4>SUBIR BLOB:</h4>
        <p>
          VERIFICA QUE EL BLOB_NAME SEA CORRECTO: {BLOB_NAME}
        </p>
        <p>
          <input type="file" onChange={showFile}></input>
        </p>
        <p>
          <button onClick={() => subir_blob()}>SUBIR</button>
        </p>
      </span>
    );
  };

  const articuloContent = () => {
    return (
      <span>
        <h4>AGREGAR ARTICULO</h4>

        <p>Id (no cambiar):<input
          id="id_articulo"
          type="text"
          value={articulos[0]["id"]+1}
          disabled
        /></p>
        
        <p>Tipo:<select id="tipo">
          <option>RARO</option>
          <option>NOTICIA</option>
          <option>S.P.A.</option>
          <option>ENTREVISTA</option>
        </select></p>
        
        <p>Titulo:<input id="titulo_articulo" type="text"/></p>

        <p>Subir foto -- medidas:</p>
        <p>1200x675 - NOTICIA, 2048x2560 - PORTADA, 1200x474 - RARO y S.P.A.</p>
        <p>
          <input type="file" onChange={showFile}></input>
        </p>

        {/*<p>Fecha:<input id="fecha_articulo" type="date"/></p>*/}
        
        <p>Blurb (textito chiquito bonito bebe):<textarea id="blurb"  cols="40" rows="5"/></p>

        <p>Link (Para noticia es lo que va a decir "aqui" al final (opcional), para los otros 3 link a WIX (necesario)):<input id="link_articulo" type="text"/></p>

        <p>Texto largo (opcional):<textarea id="texto_articulo" cols="40" rows="5"/></p>
        
        <p>Autor (opcional):<input id="autor" type="text"/></p>
        
        <button onClick={() => guardar_articulo()}>GUARDAR</button>

        <p>---------------------------------------------------------------------</p>

        <h4>GESTIONAR ARTICULOS</h4>
        <p>Nota: Si necesitas editar o borrar por completo un artículo pide ayuda a Diana por ahora. Si necesitas que solo deje de aparecer, lo puedes ocultar haciendo click en "hide"</p>
        {getListaArticulos()}
      </span>
    );
  };

  const eventoContent = () => {
    return (
      <span>
        <h4>AGREGAR EVENTO</h4>  
        Id:<input id="id_evento" type="text"></input>
        Path foto flyer:<input id="flyer" type="text"></input>
        Nombre:<input id="nombre_evento" type="text"></input>
        Lugar:<input id="lugar" type="text"></input>
        Fecha:<input id="fecha_evento" type="date"></input>
        Hora:<input id="hora_evento" type="time"></input>
        Precio:<input id="precio" type="text"></input>
        Registro:<input id="registro" type="checkbox"></input>
        <button onClick={() => guardar_evento()}>GUARDAR</button>
      </span>
    );
  };

  const programaContent = () => {
    return (
      <span>
        <h4>AGREGAR PROGRAMA</h4>
        Id:<input id="id_programa" type="text"></input>
        Nombre:<input id="nombre_programa" type="text"></input>
        Hora:<input id="hora_programa" type="time"></input>
        Activo:<input id="activo" type="checkbox"></input>
        Lunes:<input id="lunes" type="checkbox"></input>
        Martes:<input id="martes" type="checkbox"></input>
        Miercoles:<input id="miercoles" type="checkbox"></input>
        Jueves:<input id="jueves" type="checkbox"></input>
        Viernes:<input id="viernes" type="checkbox"></input>
        Sabado:<input id="sabado" type="checkbox"></input>
        Domingo:<input id="domingo" type="checkbox"></input>
        <button onClick={() => guardar_programa()}>GUARDAR</button>
      </span>
    );
  };

  const locutorContent = () => {
    return (
      <span>
        <h4>AGREGAR LOCUTOR</h4>
        Id:<input id="id_locutor" type="text"></input>
        Nombre:<input id="nombre_locutor" type="text"></input>
        Path foto:<input id="path_foto_locutor" type="text"></input>
        Bio:<textarea id="bio" cols="40" rows="5"></textarea>
        Instagram:<input id="instagram" type="text"></input>
        <button onClick={() => guardar_locutor()}>GUARDAR</button>

        <p>
          ------------------------
        </p>

        <h4>AGREGAR LINK LOCUTOR-PROGRAMA</h4>
        Id:<input id="id_link" type="text"></input>
        Id Locutor:<input id="id_locutor_link" type="text"></input>
        Id Programa:<input id="id_programa_link" type="text"></input>
        <button onClick={() => guardar_link()}>GUARDAR</button>
      </span>
    );
  };

  const loginContent = () => {
    return (
      <span>
        <p>PLEASE LOGIN</p>
        <p>
          EMAIL:<input id="login_email" type="text"></input>
        </p>
        <p>
          PASS:<input id="login_pw" type="password"></input>
        </p>
        <button onClick={() => login()}>LOGIN</button>
      </span>
    );
  };

  return (
    <Fragment>
      {logged_in ? 
      <span style={{padding: "2vw"}}>
        {articuloContent()}
        <p  style={{color: "red"}}>///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</p>
        <h1 style={{color: "red"}}> --------------- DANGER ZONE ---------------  </h1>
        <p  style={{color: "red"}}>no usar ninguna de las herramientas debajo de este punto, si necesitas editar el contenido de esas tablas pedir ayuda a Diana por ahora.</p>
        <p  style={{color: "red"}}>///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</p>
        {subirBlobContent()}
        <p>
          ------------------------
        </p>
        {eventoContent()}
        <p>
          ------------------------
        </p>
        {programaContent()}
        <p>
          ------------------------
        </p>
        {locutorContent()}
      </span>
      :
      loginContent()
      }
    </Fragment>
  );
}
