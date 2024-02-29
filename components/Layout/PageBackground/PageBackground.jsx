import { useState, useEffect } from "react";
import styles from "./PageBackground.module.scss";

const PageBackground = ({ children }) => {
  const [image, setImage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const randomImage = Math.floor(Math.random() * 4) + 1;
    setImage(randomImage);
  }, []);

  // if viewport width is less than 1000px, change the background image
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={styles.pageBackground}
      style={{
        backgroundImage: `url(/img/bg/${
          isMobile ? "bg-mob-" : "bg-"
        }${image}.png)`,
      }}
    >
      {children}
    </div>
  );
};

export default PageBackground;
