import React, { type ReactNode } from "react";
import BlogPostItemHeaderTitle from "@theme/BlogPostItem/Header/Title";
import BlogPostItemHeaderInfo from "@theme/BlogPostItem/Header/Info";
import BlogPostItemHeaderAuthors from "@theme/BlogPostItem/Header/Authors";
import styles from "./styles.module.css";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import { useDateTimeFormat } from "@docusaurus/theme-common/internal";
import Tag from "@theme/Tag";
import Link from "@docusaurus/Link";

export default function BlogPostItemHeader(): ReactNode {
  const { metadata } = useBlogPost();
  const { tags, permalink } = metadata;

  // permalink로 어느 블로그인지 판단
  const getListPath = () => {
    if (permalink.startsWith("/dev/")) {
      return "/dev";
    } else if (permalink.startsWith("/daily/")) {
      return "/daily";
    }
    return "/"; // 기본값
  };

  const dateTimeFormat = useDateTimeFormat({
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const formatDate = (blogDate: string) =>
    dateTimeFormat.format(new Date(blogDate));

  return (
    <header className={styles.blogPostItemHeader}>
      <Link to={getListPath()}>← 목록으로</Link>
      <BlogPostItemHeaderTitle />
      <div className={styles.blogPostItemHeaderDescription}>
        <div className={styles.blogPostItemHeaderMetaData}>
          <ul className={styles.blogPostTags}>
            {tags.map((tag) => (
              <li key={tag.label}>
                <Tag {...tag} />
              </li>
            ))}
          </ul>
          <BlogPostItemHeaderInfo />
        </div>
        <BlogPostItemHeaderAuthors />
      </div>
    </header>
  );
}
