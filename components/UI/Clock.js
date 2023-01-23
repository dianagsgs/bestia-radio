import { useEffect } from "react";
import styles from "./Clock.module.css";

const Clock = () => {
  useEffect(() => {
    const box = document.getElementById("clock");
    const time = () => {
      let d = new Date();
      let m = d.getMinutes();
      let h = d.getHours();
      box.textContent = ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2);
    };
    setInterval(time, 1000);
  }, []);

  return <div className={styles.clock} id="clock" />;
};

export default Clock;
