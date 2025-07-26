import BlogPostItemContainer from "../Container";
import BlogPostItemContent from "../Content";
import BlogPostItemFooter from "../Footer";
import BlogPostItemHeader from "../Header";
import { ReactNode } from "react";

export default function BlogPostItemDetail({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <BlogPostItemContainer className={className}>
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
