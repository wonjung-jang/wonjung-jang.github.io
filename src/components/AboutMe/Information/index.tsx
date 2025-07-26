import GitHub from "@site/src/icons/GitHub";
import LinkedIn from "@site/src/icons/LinkedIn";
import styles from "./styles.module.css";

export default function Information() {
  return (
    <div className={styles.blogOwnerInformation}>
      <div className={styles.blogOwnerDescription}>
        <h1>한 문장으로 정리할 내용 생기면 채울 예정.</h1>
        <p>안녕하세요. 개발자 장원정입니다.</p>
        <section className={styles.socialSection}>
          <a
            href="https://github.com/wonjung-jang"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <GitHub />
          </a>
          <a
            href="https://www.linkedin.com/in/wonjung-jang-4b175b200/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <LinkedIn />
          </a>
        </section>
      </div>
      <img src="/img/image.png" alt="profile" className={styles.profileImage} />
    </div>
  );
}
