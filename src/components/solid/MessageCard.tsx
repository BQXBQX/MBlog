import styles from "./MessageCard.module.scss";
import calendarSrc from "../../assets/svgs/calendar.svg";
import FormattedDate from "./FormattedDate";

interface MessageCardProps {
  title: string;
  description: string;
  time?: Date;
  key?: string;
  url?: string;
}

export default function MessageCard({
  title,
  description,
  time,
  url,
}: MessageCardProps) {
  return (
    <a class={styles["message-card-container"]} href={url}>
      <h4 class={styles["message-card-title"]}>
        {title} <div class={styles.divider} />
      </h4>
      <div class={styles["message-date-container"]}>
        <img src={calendarSrc.src} width={18} />
        <FormattedDate time={time as Date} />
      </div>
      <div class={styles["message-description-container"]}>
        <span>{description}</span>
      </div>
    </a>
  );
}
