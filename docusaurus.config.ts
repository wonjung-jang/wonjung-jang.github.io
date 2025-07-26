import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "원정 기록",
  tagline: "원정 기록",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://wonjung-jang.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "wonjung-jang", // Usually your GitHub org/user name.
  projectName: "wonjung-jang.github.io", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "ko",
    locales: ["ko"],
  },

  presets: [
    [
      "classic",
      {
        blog: {
          routeBasePath: "/docs",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // 프로젝트의 소셜 카드로 교체하세요
    image: "img/social-card.jpg",
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      logo: {
        alt: "My Blog Logo",
        src: "img/logo.svg",
      },
      items: [
        { to: "/blog/dev", label: "개발 원정", position: "left" },
        { to: "/blog/daily", label: "일상 원정", position: "left" },
        {
          href: "https://github.com/wonjung-jang",
          position: "right",
          className: "header-github-link",
          ariaLabel: "GitHub Profile",
        },
        {
          href: "https://www.linkedin.com/in/%EC%9B%90%EC%A0%95-%EC%9E%A5-7ab179335/",
          position: "right",
          className: "header-linkedin-link",
          ariaLabel: "LinkedIn Profile",
        },
      ],
    },
    footer: {
      style: "light",
      copyright: `Copyright © ${new Date().getFullYear()} Wonjung, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
