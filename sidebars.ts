import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// Node.js에서 실행됩니다 - 클라이언트 사이드 코드를 사용하지 마세요 (브라우저 API, JSX 등)

/**
 * 사이드바를 생성하면 다음을 할 수 있습니다:
 - 문서들의 순서가 있는 그룹 생성
 - 각 문서 그룹에 대한 사이드바 렌더링
 - 이전/다음 내비게이션 제공

 사이드바는 파일 시스템에서 자동 생성되거나, 여기에서 명시적으로 정의할 수 있습니다.

 원하는 만큼 사이드바를 생성하세요.
 */
const sidebars: SidebarsConfig = {
  // 블로그 사이드바 설정
  tutorialSidebar: ["dev", "daily"],

  // 수동으로 사이드바를 생성할 수도 있습니다
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
