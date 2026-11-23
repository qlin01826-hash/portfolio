"use client";

import { useEffect, useState } from "react";

type Engine = typeof import("mermaid")["default"];
let enginePromise: Promise<Engine> | undefined;

function getEngine() {
  if (!enginePromise) {
    enginePromise = import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        look: "classic",
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        themeVariables: {
          background: "#111315",
          primaryColor: "#1b1d1f",
          primaryTextColor: "#f1f1ee",
          primaryBorderColor: "#93938e",
          secondaryColor: "#1b1d1f",
          tertiaryColor: "#1b1d1f",
          lineColor: "#b8b8b4",
          textColor: "#f1f1ee",
          edgeLabelBackground: "#111315",
          fontSize: "18px",
        },
        flowchart: { useMaxWidth: false, htmlLabels: true, wrappingWidth: 360 },
      });
      return mermaid;
    });
  }
  return enginePromise;
}

export function LeafboatMermaid({ id, source, label }: { id: string; source: string; label: string }) {
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    getEngine().then(async engine => {
      const result = await engine.render(id, source);
      if (!disposed) setSvg(result.svg);
    }).catch(() => { if (!disposed) setFailed(true); });
    return () => { disposed = true; };
  }, [id, source]);

  if (!svg) return <div className="lb-mermaid-placeholder" role={failed ? "alert" : "status"}>{failed ? "关系图加载失败，请刷新页面。" : "系统关系图加载中…"}</div>;
  return <div className="lb-mermaid" role="img" aria-label={label} dangerouslySetInnerHTML={{ __html: svg }} />;
}
