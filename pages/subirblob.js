import { Fragment, useEffect, useState } from "react";
import { put, del } from "@vercel/blob";
import axios from "axios";

import styles from "../styles/subirblob.module.css";

export default function Subirblob(props) {
 
  /** ------------------------ CONSTANTS */

  // TODO: no subir el TOKEN ASI
  const BLOB_TOKEN = "vercel_blob_rw_VVQSKZPtiR4L8fS6_2GXlbBWoqH8N9DPnAoUCoq8tQKFazo";
  
  const [file, setFile] = useState(null);
  const [logged_in, setLoggedIn] = useState(false);
  const [articulos, setArticulos] = useState([{id: "wait_art"}]);
  const [programas, setProgramas] = useState({LUNES: [],MARTES:[], MIERCOLES:[], JUEVES:[], VIERNES:[], max_id:"wait_prog"});
  const [sesiones, setSesiones] = useState([{id: "wait_ses"}]);
  const [seccion, setSeccion] = useState("");
  const [tipoArticulo, setTipoArticulo] = useState("");
  const [accionArticulo, setAccionArticulo] = useState("");
  const [editandoArticulo, setEditandoArticulo] = useState(false);
  const [articuloEditado, setArticuloEditado] = useState([]);
  const [sesionYT, setYTSesion] = useState(-1);

  /** ------------------------ FUNCTIONS */

  /** GENERAL */

  const alertError = (api, error) => {
    alert("HUBO UN PROBLEMA CON: " + api + "-" + error +". Por favor toma un screenshot de toda la pantalla y contacta a Diana");
  };

  const showFile = input => {
    setFile(input.target.files[0]);
  };

  const borrar_blob = async (urlToDelete) => {
    await del(urlToDelete, { token: BLOB_TOKEN });
    return "deleted";
  }



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

  const tipoArticuloChange = () => {
    setTipoArticulo(document.getElementById("tipo").value);
  }

  const accionArticuloChange = () => {
    setAccionArticulo(document.getElementById("accionArticulo").value);
  }

  const selectYTSesion = () => {
    setYTSesion(document.getElementById("sesiones_youtube").value);
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
    let confirm = window.confirm("Asegurate de que todos los datos estén corretos y si es así, da click en Aceptar para guardar");

    if (confirm) {

      const { url } = await put("articulos/"+file.name, file, { access: 'public', token: BLOB_TOKEN });

      let id = articulos[0]["id"]+1;
      let tipo = document.getElementById("tipo").value;
      let titulo = document.getElementById("titulo_articulo").value; 
      let blurb = document.getElementById("blurb").value;
      let texto = ""; // document.getElementById("texto_articulo").value;
      let date = new Date();
      let fecha =date.toISOString();// document.getElementById("fecha_articulo").value;
      let autor = ""; // document.getElementById("autor").value;
      let link = document.getElementById("link_articulo").value;
      let values = 
        "("+id+", '"+tipo+"', '"+titulo+"', '"+url+"', '"+blurb+"', '"+texto+"', '"+fecha+"', '"+autor+"', '"+link+"', true)";

      guardar_cosas("post_articulo",values);
    }
  }

  // GUARDAR SESION:

  const guardarSesionYT = () => {
    let confirm = window.confirm("Asegurate de que todos los datos estén corretos y si es así, da click en Aceptar para guardar");;
    if (confirm) {
      {/** TO DO
      * 1. obtener el slug para el embed de YT con el link (considerar con ? y sin ?)
      * 2. set Activo de la sesionYT a false
      * 3. crear nueva entrada en DB con nueva sesion (activo = true)
      */}
    }
  };

  /** GET COSAS */

  // GET ARTICULOS

  const getListaArticulos = () => {
    let items=[];
    for(let i = 0; i < articulos.length; i++) {
      let item = 
      <tr>
        <td>{articulos[i].id} -- </td>
        <td>{articulos[i].tipo}</td>
        <td>{articulos[i].titulo}</td>
        <td><button onClick={() => hideAlgo(articulos[i].id, articulos[i].activo, "update_articulo")}>{articulos[i].activo ? "HIDE" : "UNHIDE"}</button></td>
        <td><button onClick={() => editAlgo("articulo", articulos[i].id,articulos[i].titulo,articulos[i].blurb,articulos[i].link)}>EDIT</button></td>
        <td><button onClick={() => dropAlgo("articulo", articulos[i].id, articulos[i].titulo, articulos[i].foto_path,"delete_articulo")}>DROP</button></td>
      </tr>;
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
        <button disabled onClick={() => dropPrograma("programa", day[i].id, day[i].titulo, "")}>DROP</button>
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

  const editAlgo = (tabla, id, titulo, blurb,link) => {
    setEditandoArticulo(true);
    setArticuloEditado([id,titulo, blurb,link]);
  };

  const cancelarEdicion = () => {
    setEditandoArticulo(false);
    setArticuloEditado([]);
  };

  const guardarEdicion = (id,api_guardar) => {
    let confirm = window.confirm("Asegurate de que todos los datos estén corretos y si es así, da click en Aceptar para guardar");

    if (confirm) {

      let titulo = document.getElementById("titulo_articulo").value; 
      let blurb = document.getElementById("blurb").value;
      let link = document.getElementById("link_articulo").value;

      let set_where = `SET titulo = '${titulo}', blurb = '${blurb}', link = '${link}' WHERE Id = ${id}`
      axios({
        method: "POST",
        url:"/api/"+api_guardar+"?set_where="+set_where
      })
      .then((response) => {
        alert("listo "+ api_guardar);
        location.reload();
      }).catch((error) => {
        if (error.response) {
          alertError(api_guardar, error)
        }
      })

    }
  };

  /** BORRAR COSAS */

  const dropAlgo = (tabla, id, titulo, url, api) => {
    let yes = confirm("estas segura de que quieres borrar " + titulo + "??");
    if (yes) {      
      // delete record from db
      let delete_where = `DELETE FROM ${tabla} WHERE Id = ${id}`
      axios({
        method: "POST",
        url:"/api/"+api+"?delete_where="+delete_where
      })
      .then((response) => {
        // delete image from blobstore
        if (url !== "") {borrar_blob(url)};

        alert("se elimino de la base de datos "+ titulo);
      }).catch((error) => {
        if (error.response) {
          alertError(api, error)
        }
      })

      // hide just in case either of the delete actions fail
      hideAlgo(id, true, "update_articulo");
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
    });
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
    });
    axios({
      method: "GET",
      url: "/api/get_sesiones",
    })
    .then((response) => {
      setSesiones(response.data);
    }).catch((error) => {
      if (error.response) {
        alertError("get_programas", error);
      }
    });
  }, []);

  /** ------------------------ CONTENT */

  const articuloContent = () => {
    return (
      <span>
        <p>Qué quieres hacer?</p>
        <select id="accionArticulo"  onChange={() => accionArticuloChange()}>
          <option value="" default></option>
          <option value="SUBIR">Subir algo nuevo</option>
          <option value="GESTIONAR">Gestionar existentes (ocultar, borrar, editar)</option>
        </select>
        <p>------------------------</p>

        {accionArticulo === "SUBIR" ? 
          <span>
            <p>1. Elige un tipo de artículo para subir:
              <select id="tipo" onChange={() => tipoArticuloChange()}>
                <option value="" default></option>
                <option value="NOTICIA">Noticia</option>
                <option value="ENTREVISTA">Portada</option>
                <option value="RARO">Raro</option>
                <option value="S.P.A.">Solo Para Adultos</option>
                <option value="VA CALADO">Va Calado</option>
              </select>
            </p>
            
            {tipoArticulo !== "" ?
              <span>
                <p>2. Título: <input id="titulo_articulo" type="text"/></p>
                <p>3. Texto corto que saldrá debajo del título:</p>
                <textarea id="blurb"  cols="40" rows="5"/>
                {tipoArticulo !== "NOTICIA" ?
                  <p>4. URL (posiblemente de Wix) a donde va a llevar el botón de "chécala ya":</p>
                  :
                  <p>4. (opcional) URL a donde va a llevar la palabra "aqui" al final del texto:</p>
                }
                <input id="link_articulo" type="text"/>
                <p>
                  5. Sube una imagen con medidas {
                    tipoArticulo === "NOTICIA" ? 
                      "1200x675" :
                      tipoArticulo === "ENTREVISTA" ? "2048x2560" : "1200x474"
                  }:
                </p>
                <p>
                  <input type="file" onChange={showFile}></input>
                </p>
                {/*<p>Fecha: <input id="fecha_articulo" type="date"/></p>*/}
                {/*<p>Texto largo (opcional):<textarea id="texto_articulo" cols="40" rows="5"/></p>*/}
                {/*<p>Autor (opcional):<input id="autor" type="text"/></p>*/}
                6. <button onClick={() => guardar_articulo()}>GUARDAR</button>
              </span>
              :
              <span/>
            }
          </span>
          :
          <span>
            {accionArticulo === "GESTIONAR" ?
              <span>
                {editandoArticulo ?
                  <span>
                    <p>
                      <b>EDITAR: {articuloEditado[0]}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button onClick={() => cancelarEdicion()}>CANCELAR</button>
                    </p>
                    <p>Nota: Por ahora solo se puede editar el título, el texto, y el link:</p>
                    <p>
                      Título: <input id="titulo_articulo" type="text" defaultValue={articuloEditado[1]}/>
                    </p>
                    <p>Blurb:</p>
                    <textarea id="blurb"  cols="40" rows="5" defaultValue={articuloEditado[2]}/>
                    <p>
                      {"NOTICIA"/*articulos[articuloEditado].tipo*/ !== "NOTICIA" ?
                        "Link de \"chécala ya\": "
                      :
                        "Link de la palabra \"aqui\" al final del texto: "
                      }
                      <input id="link_articulo" type="text" defaultValue={articuloEditado[3]}/>
                    </p>
                    <p><button onClick={() => guardarEdicion(articuloEditado[0],"update_articulo")}>GUARDAR CAMBIOS</button></p>
                  </span>
                :
                  <table>
                    <tr>
                      <th>ID --</th>
                      <th>TIPO</th>
                      <th>Título</th>
                      <th>Ocultar</th>
                      <th>Editar</th>
                      <th>Borrar</th>
                    </tr>
                    {getListaArticulos()}
                  </table>
                }
              </span>
            :
            <span/>}
          </span>
          }
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

  const sesionesContent = () => {
    return (
      <span>
        <p style={{color: "red"}} >----------- WORK IN PROGRESS: aun no hace nada</p>
        <p>¿Cuál sesión quieres reemplazar?</p>
        <select name="sesiones_youtube" id="sesiones_youtube" onChange={() => selectYTSesion()}>
          <option value="" default></option>
          <option value={sesiones[0][0]}>{sesiones[0][3]}</option>
          <option value={sesiones[1][0]}>{sesiones[1][3]}</option>
        </select>
        <p>¿Cuál es el link de YouTube de la nueva sesión? Ejemplo: https://www.youtube.com/watch?v=TGq-gEhQ0Sw</p>
        <p><input id="link_sesion_yt" type="text"/></p>
        <p>¿De quién nueva sesión? Ejemplo: Shame (esto solo es para poder identificar las sesiones más fácil en el backend)</p>
        <p><input id="name_sesion_yt" type="text"/></p>
        <p onClick={() => guardarSesionYT()}><button>GUARDAR</button></p>
      </span>
    );
  };

  const loginContent = () => {
    return (
      <span>
        <p>PLEASE LOGIN</p>
        <p>
          EMAIL: <input id="login_email" type="text"></input>
        </p>
        <p>
          PASS: <input id="login_pw" type="password"></input>
        </p>
        <button onClick={() => login()}>LOGIN</button>
      </span>
    );
  };

  return (
    <div class={styles.container}>
      {logged_in ? 
        <span style={{"display": "block"}}>
          <p>Elige una seccion de la página para agregar o editar contenido:</p>
          <select name="secciones" id="secciones" onChange={() => selectSection()}>
            <option value="" default></option>
            <option value="articulo">ARTICULOS (noticias, raro, va calado, s.p.a., portada)</option>
            <option value="programa">PROGRAMACION</option>
            <option value="sesiones">SESIONES YOUTUBE</option>
            <option value="danger">DANGER ZONE</option>
          </select>
          <p>------------------------</p>
          {seccion === 'articulo' ? articuloContent() : <span/>}
          {seccion === 'programa' ? programaContent() : <span/>}
          {seccion === 'sesiones' ? sesionesContent() : <span/>}
          {seccion === 'danger' ?
            <span>
              <p  style={{color: "red"}}>///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</p>
              <h1 style={{color: "red"}}> --------------- DANGER ZONE ---------------  </h1>
              <p  style={{color: "red"}}>no usar ninguna de las herramientas debajo de este punto, si necesitas editar el contenido de esas tablas pedir ayuda a Diana por ahora.</p>
              <p  style={{color: "red"}}>///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</p>
              {eventoContent()}
              <p>------------------------</p>
              {locutorContent()}
            </span> : <span/>
          }
        </span>
      :
        loginContent()
      }
    </div>
  );
}
