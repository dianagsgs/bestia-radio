import { Fragment, useState } from "react";
import { put } from "@vercel/blob";
import axios from "axios";

export default function Subirblob(props) {
  
  // ----------------------- SUBIR BLOB:
  // 1. PONER EL BLOB_NAME CORRECTO y GUARDAR. Ejemplos:
  // -- Para banners: 'banners/{desktop | mobile}/shure_sm7db.gif'
  // 2. Ir a http://localhost:3000/subirblob
  // 3. Seleccionar archivo
  // 4. Hacer click en subir
  // 5. Esperar a la alerta y tomar nota del URL para usar despues


  const BLOB_NAME = 'articulos/placeholdercover.png';
  const [file, setFile] = useState(null);
  const [logged_in, setLoggedIn] = useState(false);

  const login = () => {
    let email = document.getElementById("login_email").value;
    let password = document.getElementById("login_pw").value;
    console.log(email + ", " + password);
    axios({
      method: "GET",
      url:"/api/login?query=SELECT Id FROM login WHERE Email = '"+ email+"' AND Pass = '"+password+"'"
    })
    .then((response) => {
      if(response.data == '[]'){
        alert("LOGIN INCORRECTO");
      } else {
        console.log(response);
        setLoggedIn(true);
      }
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }

  const subir_blob = async () => {
    console.log(file);
    // TODO: no subir el TOKEN ASI
    const { url } = await put(BLOB_NAME, file, { access: 'public', token: "vercel_blob_rw_VVQSKZPtiR4L8fS6_2GXlbBWoqH8N9DPnAoUCoq8tQKFazo" });
    alert('URL: ' + url);
  };

  const showFile = input => {
    setFile(input.target.files[0]);
  }

  // ----------------------- GUARDAR COSAS:

  const guardar_cosas = (api, values) => {
    axios({
      method: "POST",
      url:"/api/"+api+"?values="+values
    })
    .then((response) => {
      alert("listo "+response);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
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

   const guardar_articulo = () => {
    let id = document.getElementById("id_articulo").value;
    let tipo = document.getElementById("tipo").value;
    let titulo = document.getElementById("titulo_articulo").value;
    let path_foto = document.getElementById("path_foto_articulo").value;
    let blurb = document.getElementById("blurb").value;
    let texto = document.getElementById("texto_articulo").value;
    let fecha = document.getElementById("fecha_articulo").value;
    let autor = document.getElementById("autor").value;
    let link = document.getElementById("link_articulo").value;
    let values = 
      "("+id+", '"+tipo+"', '"+titulo+"', '"+path_foto+"', '"+blurb+"', '"+texto+"', '"+fecha+"', '"+autor+"', '"+link+"')";
    
    //console.log(values);
    guardar_cosas("post_articulo",values);
  }


  return (
    <Fragment>
      {logged_in ? 
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

        <p>
          ------------------------
        </p>      
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

        <p>
          ------------------------
        </p>

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

        <p>
          ------------------------
        </p>

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

        <p>
          ------------------------
        </p>

        <h4>AGREGAR ARTICULO</h4>  
        Id:<input id="id_articulo" type="text"></input>
        Tipo:<select id="tipo">
          <option>RARO</option>
          <option>NOTICIA</option>
          <option>S.P.A.</option>
          <option>ENTREVISTA</option>
        </select>
        Titulo:<input id="titulo_articulo" type="text"></input>
        Path foto:<input id="path_foto_articulo" type="text"></input>
        Blurb:<input id="blurb" type="text"></input>
        Texto (opcional):<textarea id="texto_articulo" cols="40" rows="5"></textarea>
        Fecha:<input id="fecha_articulo" type="date"></input>
        Autor (opcional):<input id="autor" type="text"></input>
        Link (opcional):<input id="link_articulo" type="text"></input>
        <button onClick={() => guardar_articulo()}>GUARDAR</button>
      </span>
      :
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
      }
    </Fragment>
  );
}
