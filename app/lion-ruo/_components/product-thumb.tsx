import Image from "next/image";
import styles from "../lion-ruo.module.css";

export function ProductThumb({
  image,
  name,
  compact = false,
}: {
  image: string | null;
  name: string;
  compact?: boolean;
}) {
  if (image) {
    return (
      <div className={compact ? styles.thumbImageCompact : styles.thumbImageWrap}>
        <Image
          src={image}
          alt={`${name} research vial`}
          fill
          sizes={compact ? "52px" : "(max-width: 720px) 90vw, (max-width: 1100px) 45vw, 31vw"}
          className={styles.thumbImage}
        />
      </div>
    );
  }

  return (
    <div className={compact ? styles.vialPlaceholderCompact : styles.vialPlaceholder} aria-hidden="true">
      <span className={styles.vialCap} />
      <span className={styles.vialGlass}>
        <span className={styles.vialMark}>L</span>
      </span>
    </div>
  );
}
