import { ArrowLeft, ArrowUpRight, Check, Play } from "lucide-react";
import { caseStudies } from "./case-studies";
import { defaultPortfolio } from "./static-data";
import { ProjectVideo } from "./project-video";
import { LeafboatActions } from "./leafboat-materials";
import { LeafboatSystems } from "./leafboat-systems";
import { StaticDemo, StaticFeedback } from "./static-extras";
import { MonsterRanchCase } from "./monster-ranch-case";
import { ArchEditorCase, BamiyanCase } from "./other-project-cases";
import { AcademyCase, MayaCase } from "./narrative-project-cases";

const flowCopy: Record<string, { title: string; lead: string }> = {
  maya: { title: "探索与解谜", lead: "观察壁画获得线索，再去操作密码门、柜子与中央阵列；机关结果决定是否继续推进。" },
  "academy-mist": { title: "第一幕流程", lead: "当前可玩版本从角色对话进入事件，再切换场景。后续分支是设计方案，尚未包含在演示中。" },
  bamiyan: { title: "体验路线", lead: "从洞窟入口进入，沿高差向上攀登；停留观察采光与场景，并通过烛火逐步获得信息。" },
  archeditor: { title: "体块编辑", lead: "先定场地与约束，再放置、缩放和局部变形体块；编辑结果可以保存并恢复。" },
};

const demoCopy: Record<string, string> = {
  "academy-mist": "第一幕的角色出场、对话、事件与场景切换。",
  archeditor: "场地边界输入、体块编辑、参数调整与局部变形。",
};

export function WorkPage({ id }: { id: string }) {
  const portfolio = defaultPortfolio;
  const project = portfolio.projects.find((item) => item.id === id);
  const study = caseStudies[id];
  if (!project || !study) return null;

  return (
    <main className={`case-shell project-${project.id}`} style={{ "--case-accent": project.accent } as React.CSSProperties}>
      <header className="case-nav">
        <a href={`./#${project.id}`}><ArrowLeft />返回作品集</a>
        <span>PORTFOLIO · {portfolio.name}</span>
        <a href="./#directory-title">项目目录</a>
      </header>

      <figure className="case-cover case-cover-first">
        <img src={project.coverUrl} alt={`${project.title}${id === "bamiyan" ? "设计展板" : "项目封面"}`} />
      </figure>

      <section className="case-hero case-overview">
        <div className="case-hero-copy">
          <p className="micro-label">项目概览</p>
          <h1>{project.title}</h1>
          <h2>{project.tagline}</h2>
          <p>{project.summary}</p>
        </div>
        <div className="case-overview-side">
          <p className="case-question"><span>设计问题</span>{study.question}</p>
          <dl className="case-facts"><div><dt>进度</dt><dd>{project.progress}</dd></div>{study.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div>
      </section>

      {id === "leafboat" && <div className="case-material-nav"><LeafboatActions /></div>}
      {id === "leafboat" && <div className="case-download"><StaticDemo /></div>}

      {project.videoUrl && <section className="case-section case-video-section" id="project-demo"><div className="case-section-label"><span>01</span><p>完整演示</p></div><div><h2>{id === "leafboat" ? "实机演示" : "完整演示"}</h2><p className="case-lead">{id === "leafboat" ? "观看当前版本中的蛛丝牵引、船体移动、水域探索与资源获取，再对照下方的设计方案。" : demoCopy[id] ?? project.demoDescription}</p><ProjectVideo src={project.videoUrl} poster={project.coverUrl} title={project.title} /></div></section>}

      {!project.videoUrl && project.projectUrl && <section className="case-section case-video-section"><div className="case-section-label"><span>01</span><p>演示视频</p></div><div><h2>演示视频</h2><p className="case-lead">项目视频托管于外部平台，可在新窗口完整观看。</p><a className="case-external-demo" href={project.projectUrl} target="_blank" rel="noreferrer"><Play fill="currentColor" />观看完整演示<ArrowUpRight /></a></div></section>}

      {id === "leafboat" && <LeafboatSystems />}
      {id === "monster-ranch" && <MonsterRanchCase />}
      {id === "archeditor" && <ArchEditorCase />}
      {id === "bamiyan" && <BamiyanCase />}
      {id === "maya" && <MayaCase />}
      {id === "academy-mist" && <AcademyCase />}

      {id !== "leafboat" && id !== "monster-ranch" && id !== "archeditor" && id !== "bamiyan" && id !== "maya" && id !== "academy-mist" && <section className="case-section">
        <div className="case-section-label"><span>{project.videoUrl || project.projectUrl ? "02" : "01"}</span><p>操作流程</p></div>
        <div><h2>{flowCopy[id]?.title ?? "操作流程"}</h2><p className="case-lead">{flowCopy[id]?.lead ?? study.overview}</p><ol className="system-flow">{study.flow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}</ol></div>
      </section>}

      {id !== "leafboat" && id !== "monster-ranch" && id !== "archeditor" && id !== "bamiyan" && id !== "maya" && id !== "academy-mist" && <section className="case-section">
        <div className="case-section-label"><span>{project.videoUrl || project.projectUrl ? "03" : "02"}</span><p>关键决策</p></div>
        <div><h2>关键设计决策</h2><div className="decision-list">{study.decisions.map((decision, index) => <article key={decision.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{decision.title}</h3><p>{decision.body}</p></div></article>)}</div></div>
      </section>}

      {id !== "leafboat" && id !== "monster-ranch" && id !== "archeditor" && id !== "bamiyan" && id !== "maya" && id !== "academy-mist" && study.gallery.length > 0 && <section className="case-gallery">{study.gallery.map((image) => <figure key={image.src}><img src={image.src} alt={image.alt} loading="lazy" /><figcaption>{image.caption}</figcaption></figure>)}</section>}

      {id !== "monster-ranch" && <section className="case-section case-outcome">
        <div className="case-section-label">{id !== "leafboat" && <span>{id === "archeditor" || id === "maya" || id === "academy-mist" ? "05" : id === "bamiyan" ? "04" : project.videoUrl || project.projectUrl ? "04" : "03"}</span>}<p>{id === "leafboat" ? "项目成果" : "结果与边界"}</p></div>
        <div><h2>{id === "leafboat" ? "项目成果" : "结果与边界"}</h2><ul>{study.outcome.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></div>
      </section>}

      {id === "leafboat" && <StaticFeedback />}
      <nav className="case-next" aria-label="案例导航"><a href={`./#${project.id}`}><ArrowLeft />返回作品集中的当前项目</a></nav>
    </main>
  );
}
