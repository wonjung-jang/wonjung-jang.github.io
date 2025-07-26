import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// Node.js에서 실행됩니다 - 클라이언트 사이드 코드를 사용하지 마세요 (브라우저 API, JSX 등)

const config: Config = {
  title: "원정 기록",
  tagline: "원정 기록",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://wonjung-jang.github.io",
  // 사이트가 제공되는 /<baseUrl>/ 경로명을 설정하세요
  // GitHub pages 배포의 경우, 보통 '/<프로젝트명>/'입니다
  baseUrl: "/",

  // GitHub pages 배포 설정
  // GitHub pages를 사용하지 않는다면, 이 설정들은 필요하지 않습니다
  organizationName: "wonjung-jang", // 보통 GitHub 조직/사용자 이름
  projectName: "wonjung-jang.github.io", // 보통 저장소 이름

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // 국제화를 사용하지 않더라도, 이 필드를 사용하여 html lang과 같은 유용한 메타데이터를 설정할 수 있습니다
  // 예를 들어, 사이트가 중국어라면 "en"을 "zh-Hans"로 바꿀 수 있습니다
  i18n: {
    defaultLocale: "ko",
    locales: ["ko"],
  },

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: false, // 기본 블로그 비활성화
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "dev-blog",
        routeBasePath: "/dev",
        path: "./blog/dev",
        authorsMapPath: "../authors.yml",
        blogTitle: "개발 원정",
        blogDescription: "개발과 관련된 이야기들",
        blogSidebarTitle: "개발 원정",
        blogSidebarCount: "ALL",
        postsPerPage: 10,
        showReadingTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "daily-blog",
        routeBasePath: "/daily",
        path: "./blog/daily",
        authorsMapPath: "../authors.yml",
        blogTitle: "일상 원정",
        blogDescription: "일상 이야기들",
        blogSidebarTitle: "일상 원정",
        blogSidebarCount: "ALL",
        postsPerPage: 10,
        showReadingTime: true,
      },
    ],
  ],

  themeConfig: {
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
        {
          to: "/dev", // 개발 블로그 홈
          label: "개발 원정",
          position: "left",
        },
        { to: "/daily", label: "일상 원정", position: "left" }, // 일상 블로그 홈
        {
          href: "https://github.com/wonjung-jang",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub Profile",
        },
        {
          href: "https://www.linkedin.com/in/%EC%9B%90%EC%A0%95-%EC%9E%A5-7ab179335/",
          position: "right",
          className: "header-linkedin-link",
          "aria-label": "LinkedIn Profile",
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
