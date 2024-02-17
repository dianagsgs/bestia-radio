import Image from "next/image";
import styles from "./Section.module.scss";

export default function Section(props) {
  return (
    <section
      className={props.mobile ? styles.section_mobile : styles.section}
      id={props.id}
    >
      <div className={styles.title}>
        <Image
          src={props.titulo}
          width={130}
          height={30}
          alt="titulo"
          layout="responsive"
          className={styles.titleImg}
        />
      </div>
      {props.children}
    </section>
  );
}
