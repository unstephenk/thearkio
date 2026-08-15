import Image from "next/image";
import Link from "next/link";
import styles from "../lion-ruo.module.css";

export function LionBrand({ logoUrl }: { logoUrl: string }) {
  return (
    <Link href="/lion-ruo" className={styles.brand} aria-label="Lion RUO Peptides home">
      <Image
        src={logoUrl}
        alt="Lion RUO Peptides"
        width={300}
        height={100}
        className={styles.brandImage}
        priority
      />
    </Link>
  );
}
