"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, LoaderCircle, RotateCcw } from "lucide-react";

export function ProjectVideo({ src, poster, title, autoPlay = false }: { src: string; poster: string; title: string; autoPlay?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "buffering" | "error">("loading");
  const [buffered, setBuffered] = useState(0);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setPhase("loading");
    setBuffered(0);
  }, [src, attempt]);

  const updateBuffer = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0 || video.buffered.length === 0) return;
    const end = video.buffered.end(video.buffered.length - 1);
    setBuffered(Math.min(100, Math.round((end / video.duration) * 100)));
  };

  return (
    <div className="project-video-frame">
      <video
        key={`${src}-${attempt}`}
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        autoPlay={autoPlay}
        preload="metadata"
        onLoadStart={() => setPhase("loading")}
        onLoadedMetadata={updateBuffer}
        onProgress={updateBuffer}
        onCanPlay={() => setPhase("ready")}
        onPlaying={() => setPhase("ready")}
        onWaiting={() => setPhase("buffering")}
        onError={() => setPhase("error")}
        aria-label={`${title} 完整演示视频`}
      />
      {phase !== "ready" && (
        <div className={`video-loading-state ${phase === "error" ? "is-error" : ""}`} role={phase === "error" ? "alert" : "status"}>
          {phase === "error" ? <AlertCircle aria-hidden="true" /> : <LoaderCircle className="loading-spinner" aria-hidden="true" />}
          <strong>{phase === "error" ? "视频暂时无法载入" : phase === "buffering" ? "正在缓冲演示" : "正在准备演示"}</strong>
          {phase !== "error" && <><span>{buffered > 0 ? `已缓冲 ${buffered}%` : "读取视频信息…"}</span><div className="video-buffer-track"><i style={{ width: `${Math.max(buffered, 8)}%` }} /></div></>}
          {phase === "error" && <button type="button" onClick={() => setAttempt((value) => value + 1)}><RotateCcw aria-hidden="true" />重新加载</button>}
        </div>
      )}
    </div>
  );
}
