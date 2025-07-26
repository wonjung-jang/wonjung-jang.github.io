import React, { type ReactNode } from "react";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import type { Props } from "@theme/BlogPostItem";
import BlogPostCard from "./BlogPostCard";
import BlogPostItemDetail from "./BlogPostItemDetail";

export default function BlogPostItem({
  children,
  className,
}: Props): ReactNode {
  const { isBlogPostPage } = useBlogPost();

  return (
    <>
      {isBlogPostPage ? (
        <BlogPostItemDetail className={className}>
          {children}
        </BlogPostItemDetail>
      ) : (
        <BlogPostCard className={className} />
      )}
    </>
  );
}
