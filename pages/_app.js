import { useEffect, useState } from "react";
import "../styles/bootstrap.min.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {

  //  CHECK FOR MOBILE
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowSize, setWindowSize] = useState(null);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.visualViewport.width;
    setWindowWidth(width);
    if (width <= 640 && windowSize !== "small") {
      setWindowSize("small");
    } else if (width <= 1007 && windowSize !== "medium") {
      setWindowSize("medium");
    } else if (width > 1007 && windowSize !== "large") {
      setWindowSize("large");
    }
  };
  
  // PARA CAMBIAR WALLPAPERS

  // 1. (Si aun no existe) Crea un folder en public/img/themes/ con el nombre que quieras (ej. "space")
  // 2. (Si aun no has hay) Mete las fotos que quieras en este folder, asegurate de que los nombres de los archivos:
  // - Tengan terminacion ".jpg"
  // - Sean numeros consecutivos del 1 al [numero de fotos] (ej. "1.jpg", "2.jpg", etc.)
  // 3. Cambia la variable folder al nombre del folder que creaste
  // 4. Cambia la variable img_count al numero de fotos en el folder
  // 5. Si quieres que el fondo sea aleatorio cambia la variable random_img a true, si es false el default sera 1.jpg
  // 6. Si quieres que aparezcan nombres customizados en el menu llena custom_names:
  // - asegurate de que haya el mismo numero de nombres que imagenes en el folder
  // - nota que el nombre en index i se asignara a la imagen (i+1).jpg
  // - si dejas la lista vacia [], los nombres en el menu seran "folder i" para cada imagen i.jpg en el folder "folder"

  const folder = "ciudades";
  const img_count = 7;
  const random_img = false; // cambiar a true si quieres imagen aleatoria (si no la 1.jpg será default)
  const custom_names = ["CDMX", "Bogota", "Buenos Aires", "Caracas", "Lima", "Quito", "Santiago"]
  const [randomBg, setRandomBg] = useState(1);

  useEffect(() => {
    setRandomBg(Math.floor(Math.random() * (random_img ? img_count : 1) + 1));

    function loadScript(a) {
      var b=document.getElementsByTagName("head")[0],c=document.createElement("script");
      c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)
    }
    loadScript(function(){beTracker.t({hash:"17e7690fbf077b9a8dac02c551fee78b"})});
  }, []);

  return <Component
            {...pageProps}
            wallpaperFolder={folder}
            randomWallpaper={randomBg}
            wallpaperCount={img_count}
            customWallpaperNames={custom_names}
          />;
}

export default MyApp;
