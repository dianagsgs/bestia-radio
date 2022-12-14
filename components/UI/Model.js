import "@google/model-viewer";
import styles from "./Model.module.css";

const Model = () => (
  <div className={styles.model}>
    <model-viewer
      src="/model.glb"
      alt="A 3D model of La Bestia"
      shadow-intensity="1"
      auto-rotate
      ar
    >
      <div slot="progress-bar"></div>
    </model-viewer>
  </div>
);

export default Model;
