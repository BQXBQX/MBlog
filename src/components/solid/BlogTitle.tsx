import FormattedDate from "./FormattedDate";
import styles from "./BlogTitle.module.scss";

interface BlogTitleProps {
  title: string;
  time: Date;
}

export function BlogTitle({ title, time }: BlogTitleProps) {
  return (
    <div class={styles["title-container"]}>
      <h1 class={styles.title}>{title}</h1>
      <FormattedDate time={time} />
    </div>
  );
}
