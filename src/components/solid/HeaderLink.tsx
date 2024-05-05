import styles from "./HeaderLink.module.scss";
interface HeaderLinkProps {
  href?: string;
  children?: string;
}

export default function HeaderLink(props: HeaderLinkProps) {
  return (
    <a href={props.href}>
      <span class={styles["header-link-span"]}>{props.children}</span>
    </a>
  );
}
