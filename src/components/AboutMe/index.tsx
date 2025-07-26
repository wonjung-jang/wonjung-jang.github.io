import styles from "./styles.module.css";
import Information from "./Information";
import TMI from "./TMI";

export default function AboutMe() {
  return (
    <div className={styles.container}>
      <section className={styles.mainSection}>
        <Information />
        <TMI />
      </section>
    </div>
  );
}
