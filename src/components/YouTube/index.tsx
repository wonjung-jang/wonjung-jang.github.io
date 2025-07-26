import React from "react";

interface YouTubeProps {
  videoId: string;
  title?: string;
  width?: string | number;
  height?: string | number;
}

export default function YouTube({
  videoId,
  title = "YouTube video player",
  width = "100%",
  height = 315,
}: YouTubeProps) {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%", // 16:9 aspect ratio
        height: 0,
        overflow: "hidden",
        marginBottom: "1.5rem",
      }}
    >
      <iframe
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
