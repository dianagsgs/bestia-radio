import Link from "next/link";
import styles from "./Icon.module.css";

const Backdrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalOverlay = () => {
  return <div className={styles.modal}>hola</div>;
};

const Icon = (props) => {
  let content;
  if (props.type === "link") {
    content = (
      <Link href={props.link}>
        <a>
          <img src={`img/icons/${props.img}.png`} alt="La Bestia Icon" />
          <div className="text">{props.title}</div>
        </a>
      </Link>
    );
  } else {
    content = (
      <div className={styles.button} onClick={props.onClickTrigger}>
        <img src={`img/icons/${props.img}.png`} alt="La Bestia Icon" />
        <div className="text">{props.title}</div>
      </div>
    );
  }
  return <div className={styles.item}>{content}</div>;
};

export default Icon;
