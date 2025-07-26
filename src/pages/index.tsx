import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import AboutMe from "../components/AboutMe";

export default function Home(): ReactNode {
  return (
    <Layout
      title={`원정 기록`}
      description="Description will go into a meta tag in <head />"
    >
      <main>
        <AboutMe />
      </main>
    </Layout>
  );
}
