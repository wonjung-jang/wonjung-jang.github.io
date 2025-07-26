import { ReactNode } from "react";
import clsx from "clsx";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import styles from "./styles.module.css";
import BlogPostItemHeaderTitle from "../Title";
import BlogPostItemHeaderInfo from "../Info";

export default function BlogPostCard({
  className,
}: {
  className?: string;
}): ReactNode {
  const { metadata } = useBlogPost();

  return (
    <Link
      to={metadata.permalink}
      className={styles.blogPostItemLink}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <BlogPostItemContainer
        className={clsx(className, styles.blogPostItemClickable)}
      >
        <BlogPostItemHeaderInfo />
        <BlogPostItemHeaderTitle />
        <div className={styles.blogPostItemInformation}>
          <span>{metadata.description}</span>
          <span className={styles.blogPostItemAuthor}>
            {metadata.authors[0].name}
          </span>
        </div>
      </BlogPostItemContainer>
    </Link>
  );
}
