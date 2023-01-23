import styles from "./MenuThemes.module.css";

const MenuThemes = (props) => {

  const changeBackground = (img_num) => {
    const background = "/img/themes/" + props.folder + "/" + img_num + ".jpg";
    const sections = document.getElementsByClassName("section-box");
    for (let i = 0; i < sections.length; i++) {
      sections[i].style.backgroundImage = "url(" + background + ")";
    }
  };

  let list = [];

  for (let i = 1; i <= props.count; i++) {
    list.push(
      <div
        className={styles.menu_box_item}
        key={Math.random()}
        onClick={changeBackground.bind(null, i)}
      >
        <img src={`/img/menu/icon6.png`} className="theme-icon" />
        {props.custom_names === [] ? props.folder + " " + i : props.custom_names[i-1]}
      </div>
    );
  }

  return list;
};

export default MenuThemes;
