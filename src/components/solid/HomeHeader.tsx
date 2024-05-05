import styles from "./HomeHeader.module.scss";
import avatarSrc from "../../assets/avatar.png";
import githubSrc from "../../assets/svgs/github.svg";
import gmailSrc from "../../assets/svgs/gmail.svg";
import rssSrc from "../../assets/svgs/rss.svg";
import { createSignal, onMount } from "solid-js";
import exampleSrc from "../../assets/blog-placeholder-about.jpg";
export default function HomeHeader() {
  const [isPhone, setIsPhone] = createSignal<boolean>(false);

  onMount(() => {
    const userAgent = window.navigator.userAgent;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    setIsPhone(isMobile);
  });

  return (
    <div class={styles["home-header-container"]}>
      <div class={styles["home-header-content"]}>
        <div class={styles["home-header-message"]}>
          <div>
            <span class={styles.title}>
              这里是 6QX👋。
              <br />
              一位 Frontend Developer。
            </span>
          </div>
          <div class={styles["home-header-message-svg-container"]}>
            <a href="https://github.com/BQXBQX">
              <img src={githubSrc.src} width={27} />
            </a>
            <a href="boqingxin14@gmail.com">
              <img src={gmailSrc.src} width={30} />
            </a>
            <a>
              <img src={rssSrc.src} width={23} />
            </a>
          </div>
        </div>
        <img src={exampleSrc.src} class={styles.avatar} />
      </div>
    </div>
  );
}
