import { useEffect, useState } from "react";
import "../styles/bootstrap.min.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  
  // PARA CAMBIAR WALLPAPERS

  // 1. (Si aun no existe) Crea un folder en public/img/themes/ con el nombre que quieras (ej. "space")
  // 2. (Si aun no has hay) Mete las fotos que quieras en este folder, asegurate de que los nombres de los archivos:
  // - Tengan terminacion ".jpg"
  // - Sean numeros consecutivos del 1 al [numero de fotos] (ej. "1.jpg", "2.jpg", etc.)
  // 3. Cambia la variable folder al nombre del folder que creaste
  // 4. Cambia la variable img_count al numero de fotos en el folder
  // y listo

  const folder = "mariah"; // elegir nombre de folder (ej. "classic" "space" "mariah"...)
  const img_count = 2; // cambiar!! en base a cuantas imágenes hay en ese folder
  const [randomBg, setRandomBg] = useState(1);

  useEffect(() => {
    setRandomBg(Math.floor(Math.random() * img_count + 1));
  }, []);

  return <Component
            {...pageProps}
            wallpaperFolder={folder}
            randomWallpaper={randomBg}
            wallpaperCount={img_count}
          />;
}

export default MyApp;
