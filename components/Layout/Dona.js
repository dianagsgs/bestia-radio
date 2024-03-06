import styles from "./Dona.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Dona() {
  return (
    <div className={styles.donut}>
      <a href="https://ko-fi.com/labestiaradiocdmx" target="_blank">
        <Image src="/img/dona.png" width={346} height={344} />
      </a>
    </div>
  );
}
