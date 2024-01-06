import { useEffect, useState } from "react";
import "../styles/bootstrap.min.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {

  //  CHECK FOR MOBILE
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowSize, setWindowSize] = useState(null);

  const backgroundCount = 4;
  const randomBackground = Math.floor(Math.random() * backgroundCount);

  const background_src = "url(/img/Fondo/fondo_"+(windowSize === "small" ? "mobile" : "desktop")+"_"+randomBackground+".png)";

  const background_style = {
    backgroundImage: background_src,
    backgroundSize: "100vw 100%",
    backgroundAttachment: "fixed",
    backgroundPosition: windowSize === "small" ? "0vw 0vh" : "0vw 10vh"
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.visualViewport.width;
    setWindowWidth(width);
    if (width <= 1000 && windowSize !== "small") {
      setWindowSize("small");
    /*} else if (width <= 1007 && windowSize !== "medium") {
      setWindowSize("medium");*/
    } else if (width > 1000 && windowSize !== "large") {
      setWindowSize("large");
    }
  };
  
  useEffect(() => {
    function loadScript(a) {
      var b=document.getElementsByTagName("head")[0],c=document.createElement("script");
      c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)
    }
    loadScript(function(){beTracker.t({hash:"17e7690fbf077b9a8dac02c551fee78b"})});
  }, []);

  return <Component
            {...pageProps}
            windowSize={windowSize} 
            background_style={background_style}
          />;
}

export default MyApp;
