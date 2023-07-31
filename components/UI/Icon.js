import styles from "./Icon.module.css";

const Icon = (props) => {
  let content;
  if (props.type === "link") {
    content = (
      <a href={props.link} target="_blank">
        <img src={`img/icons/${props.img}.png`} alt="La Bestia Icon" />
        <div className="text">{props.title}</div>
      </a>
    );
  } else {
    content = (
      <div className={styles.button} onClick={props.onClickTrigger}>
        <img src={`img/icons/${props.img}.png`} alt="La Bestia Icon" />
        <div className="text">{props.title}</div>
      </div>
    );
  }
  return <div className={props.mobile ? styles.item_mobile : styles.item}>{content}</div>;
};

export default Icon;
