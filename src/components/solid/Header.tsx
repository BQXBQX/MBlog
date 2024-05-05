import { createSignal, onMount } from "solid-js";
import { SITE_TITLE } from "../../consts";
import styles from "./Header.module.scss";
import HeaderLink from "./HeaderLink";

interface HeaderProps {
  type: "sticky" | "fixed";
}

export default function Header(props: HeaderProps) {
  const [isPhone, setIsPhone] = createSignal<boolean>(false);
  const [isShowOptions, setIsShowOptions] = createSignal<boolean>(false);

  onMount(() => {
    const userAgent = window.navigator.userAgent;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    setIsPhone(isMobile);
  });

  return (
    <header
      class={`${styles["header-container"]} ${
        isShowOptions() ? styles["show-options"] : ""
      }`}
      style={{ position: `${props.type}` }}
    >
      <div class={`${styles["header-nav-container"]}`}>
        <a href="/">
          <span class={styles["site-title"]}>{SITE_TITLE}</span>
        </a>
        {!isPhone() ? (
          <div class={styles["header-link-container"]}>
            <HeaderLink href="/">博客们。</HeaderLink>
            <HeaderLink href="/about">关于我。</HeaderLink>
          </div>
        ) : (
          <div
            class={styles["more-svg-container"]}
            onclick={() => setIsShowOptions(!isShowOptions())}
          >
            <div
              class={`${styles.top} ${
                isShowOptions() ? styles["top-clicked"] : ""
              }`}
            />
            <div
              class={`${styles.middle} ${
                isShowOptions() ? styles["middle-clicked"] : ""
              }`}
            />
            <div
              class={`${styles.bottom} ${
                isShowOptions() ? styles["bottom-clicked"] : ""
              }`}
            />
          </div>
        )}
      </div>
      <div class={styles["options-container"]}>
        <div class={styles["link-item"]}>
          <HeaderLink href="/">博客们。</HeaderLink>
        </div>
        <div class={styles["link-item"]}>
          <HeaderLink href="/about">关于我。</HeaderLink>
        </div>
        <div class={styles.divider}></div>
      </div>
    </header>
  );
}
