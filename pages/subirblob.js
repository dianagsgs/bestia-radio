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
  const [articulos, setArticulos] = useState([{id: "wait_art"}]);
  const [programas, setProgramas] = useState({LUNES: [],MARTES:[], MIERCOLES:[], JUEVES:[], VIERNES:[], max_id:"wait_prog"});
  const [seccion, setSeccion] = useState("articulo");

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

  const selectSection = () => {
    setSeccion(document.getElementById("secciones").value);
  }

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
    let activo = true;
    let lunes = document.getElementById("lunes").checked;
    let martes = document.getElementById("martes").checked;
    let miercoles = document.getElementById("miercoles").checked;
    let jueves = document.getElementById("jueves").checked;
    let viernes = document.getElementById("viernes").checked;
    let sabado = false;
    let domingo = false;
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

  // GET ARTICULOS

  const getListaArticulos = () => {
    let items=[];
    for(let i = 0; i < articulos.length; i++) {
      let item = 
      <div>
        {articulos[i].tipo}: {articulos[i].titulo}
        <button onClick={() => hideAlgo(articulos[i].id, articulos[i].activo, "update_articulo")}>{articulos[i].activo ? "HIDE" : "UNHIDE"}</button>
        <button disabled onClick={() => editAlgo("articulo", articulos[i].id)}>EDIT</button>
        <button disabled onClick={() => dropAlgo("articulo", articulos[i].id, articulos[i].titulo)}>DROP</button>
      </div>;
      items.push(item);
    }
    return items;
  };

  // GET PROGRAMAS

  const getListaProgramas = (day) => {
    
    let items=[];
    for(let i = 0; i < day.length; i++) {
      let item = 
      <div>
        {day[i].hora}: {day[i].nombre}
        <button onClick={() => hideAlgo(day[i].id, day[i].activo,"update_programa")}>{day[i].activo ? "HIDE" : "UNHIDE"}</button>
        <button disabled onClick={() => editPrograma("programa",day[i].id)}>EDIT</button>
        <button disabled onClick={() => dropPrograma("programa", day[i].id, day[i].titulo)}>DROP</button>
      </div>;
      items.push(item);
    }
    return items;
  };

  /** OCULTAR COSAS */

  const hideAlgo = (id, activo, api) => {
    let set_where = `SET Activo = ${!activo} WHERE Id = ${id}`
    axios({
      method: "POST",
      url:"/api/"+api+"?set_where="+set_where
    })
    .then((response) => {
      alert("listo "+ api);
      location.reload();
    }).catch((error) => {
      if (error.response) {
        alertError(api, error)
      }
    })
  };

  /** EDITAR COSAS */

  const editAlgo = (tabla, id) => {
    console.log("edit " + id);
  };

  /** BORRAR COSAS */

  const dropAlgo = (tabla, id, titulo) => {
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
    axios({
      method: "GET",
      url:"/api/get_all_programas"
    })
    .then((response) => {
      setProgramas(response.data);
    }).catch((error) => {
      if (error.response) {
        alertError("get_programas", error);
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
          <option>NOTICIA</option>
          <option>ENTREVISTA</option>
          <option>RARO</option>
          <option>S.P.A.</option>
          <option>VA CALADO</option>
        </select></p>
        
        <p>Titulo:<input id="titulo_articulo" type="text"/></p>

        <p>Subir foto -- medidas:</p>
        <p>1200x675 - NOTICIA, 2048x2560 - PORTADA, 1200x474 - RARO y S.P.A. y VA CALADO</p>
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
        <p>NOTA: ANTES DE AGREGAR UN PROGRAMA ASEGURATE DE QUE NO HAYA OTRO PROGRAMA *ACTIVO* EL MISMO DIA A LA MISMA HORA, SI NO, COSAS RARAS PASARAN</p>
        <p>
          Id (no cambiar):<input id="id_programa" type="text" disabled value={programas.max_id+1}></input>
        </p>
        <p>
          Nombre:<input id="nombre_programa" type="text"></input>
        </p>
        <p>
          Hora !!24 HRS!!:<input id="hora_programa" type="time"></input>
        </p>
        <p>
          Lunes:<input id="lunes" type="checkbox"></input>
        </p>
        <p>
          Martes:<input id="martes" type="checkbox"></input>
        </p>
        <p>
          Miercoles:<input id="miercoles" type="checkbox"></input>
        </p>
        <p>
          Jueves:<input id="jueves" type="checkbox"></input>
        </p>
        <p>
          Viernes:<input id="viernes" type="checkbox"></input>
        </p>
        {/** SABADO Y DOMINGO tambien existen en DB */}
        <button onClick={() => guardar_programa()}>GUARDAR</button>

        <p>---------------------------------------------------------------------</p>

        <h4>GESTIONAR PROGRAMAS</h4>
        <p>Nota: Por el momento no se pueden borrar ni editar los programas pero si se pueden desactivar, si le picas HIDE a algun programa que está muchos días se desactivará para todos los días</p>
        <p>LUNES</p>
        {getListaProgramas(programas.LUNES)}
        <p>MARTES</p>
        {getListaProgramas(programas.MARTES)}
        <p>MIERCOLES</p>
        {getListaProgramas(programas.MIERCOLES)}
        <p>JUEVES</p>
        {getListaProgramas(programas.JUEVES)}
        <p>VIERNES</p>
        {getListaProgramas(programas.VIERNES)}
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
        <span style={{"display": "block"}}>
          <p>Elige una seccion:</p>
          <select name="secciones" id="secciones" onChange={() => selectSection()}>
            <option value="articulo">ARTICULOS</option>
            <option value="programa">PROGRAMAS</option>
            <option value="danger">DANGER ZONE</option>
          </select>
          <p>------------------------</p>
          {seccion === 'articulo' ? articuloContent() : <span/>}
          {seccion === 'programa' ? programaContent() : <span/>}
          {seccion === 'danger' ?
            <span>
              <p  style={{color: "red"}}>///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</p>
              <h1 style={{color: "red"}}> --------------- DANGER ZONE ---------------  </h1>
              <p  style={{color: "red"}}>no usar ninguna de las herramientas debajo de este punto, si necesitas editar el contenido de esas tablas pedir ayuda a Diana por ahora.</p>
              <p  style={{color: "red"}}>///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</p>
              {subirBlobContent()}
              <p>------------------------</p>
              {eventoContent()}
              <p>------------------------</p>
              {locutorContent()}
            </span> : <span/>
          }
        </span>
      :
        loginContent()
      }
    </Fragment>
  );
}
