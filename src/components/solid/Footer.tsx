import styles from "./Footer.module.scss";
import cSrc from "../../assets/svgs/c.svg";
import c2Src from "../../assets/svgs/c2.svg";
import astroSrc from "../../assets/svgs/astro.svg";
import solidSrc from "../../assets/svgs/solid.svg";
export default function Footer() {
  return (
    <div class={styles["footer-container"]}>
      <div class={styles.divider} />
      <div class={styles["footer-content"]}>
        <div class={styles["footer-left"]}>
          <img src={c2Src.src} width={15} />
          <span style={{ "font-size": "16px" }}>
            2024 bqx.All rights reserved.
          </span>
        </div>
        <div class={styles["footer-right"]}>
          <span style={{ "font-size": "16px" }}>Give thanks to </span>
          <img src={astroSrc.src} width={15} />
          <img src={solidSrc.src} width={18} />
        </div>
      </div>
    </div>
  );
}
