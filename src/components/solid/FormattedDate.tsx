interface FormattedDateProps {
  time: Date;
}

export default function FormattedDate({ time }: FormattedDateProps) {
  return (
    <span>
      更新于：
      {time?.getFullYear()}年{time?.getMonth() && time?.getMonth() + 1}月
      {time?.getDate()}日{time?.getHours()}小时{time?.getMinutes()}分钟
    </span>
  );
}
