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
    if (width <= 1000 && windowSize !== "small") {
      setWindowSize("small");
    /*} else if (width <= 1007 && windowSize !== "medium") {
      setWindowSize("medium");*/
    } else if (width > 1007 && windowSize !== "large") {
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
          />;
}

export default MyApp;
