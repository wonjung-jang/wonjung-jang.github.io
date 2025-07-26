import React from "react";
import Giscus from "@giscus/react";

export default function GiscusComponent() {
  return (
    <Giscus
      id="comments"
      repo="wonjung-jang/wonjung-jang.github.io" // 여기에 실제 GitHub 저장소 경로를 입력하세요
      repoId="R_kgDOPS8_Yg"
      category="General"
      categoryId="DIC_kwDOPS8_Ys4CtblX"
      mapping="pathname"
      term="Welcome to giscus!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="ko"
      loading="lazy"
    />
  );
}
