"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { ProjectVideo } from "./project-video";
import { ExistingDiagramPreview } from "./leafboat-diagram-preview";
import { LeafboatMermaid } from "./leafboat-mermaid";
import { leafboatRuleFlow, leafboatSystemFlow } from "./leafboat-system-flow";
import { MonsterRanchHome } from "./monster-ranch-case";
import { academyNarrativeFlow, bamiyanProjectFlow, mayaGuidanceFlow } from "./project-system-flows";
import { CoreSystemDiagram } from "./core-system-diagrams";
import type { PortfolioData, PortfolioProject, ProjectGroup } from "./portfolio-types";

const groups: ProjectGroup[] = ["游戏", "游戏化平台", "严肃游戏"];
const projectSequence = ["leafboat", "monster-ranch", "maya", "academy-mist", "archeditor", "bamiyan"];
const directoryCopy: Record<string, { description: string; foot: string }> = {
  leafboat: { description: "统一的蛛丝规则改变对象状态，并连接采集、生存、建造与航行，形成可被玩家发现的涌现。", foot: "简单规则 · 状态变化 · 涌现" },
  "monster-ranch": { description: "规划、施工与区域划分把建造结果交给员工、物流和养殖，形成复杂的跨系统联动。", foot: "规划施工 · 区域管理 · 系统联动" },
  maya: { description: "地图持续呈现通路与解谜点状态，任务读取这些状态，引导玩家寻找线索并完成机关。", foot: "地图可视化 · 任务引导 · 解谜关卡" },
  "academy-mist": { description: "玩家选择写入任务、人物与信息状态，条件组合决定多条剧情的开放、隐藏与汇合。", foot: "状态驱动 · 多线叙事" },
  archeditor: { description: "Unity 体块生成深度图，ControlNet 以空间约束控制 AI 生成，并按偏差返回不同调整路径。", foot: "AI 生成 · 空间约束 · 技术路线" },
  bamiyan: { description: "从资料复原洞窟空间，将高差、尺度与光线转成关卡引导，建立对遗产场景的文化体验。", foot: "空间复原 · 关卡引导 · 文化体验" },
};
const overviewEvidence: Record<string, Array<{ src: string; alt: string; caption: string; kind?: "board" }>> = {
  leafboat: [
    { src: "./media/leafboat-stills/connection.jpg", alt: "叶舟实机画面：蛛丝连接多片叶片", caption: "连接叶片｜同一套吐丝操作将叶片组合成漂浮结构" },
    { src: "./media/leafboat-stills/navigation.jpg", alt: "叶舟实机画面：在水流中调整叶舟航向", caption: "水面航行｜收放连接，顺着水流调整船体方向" },
  ],
  "monster-ranch": [
    { src: "./media/media/monster-ranch/ranch-pen.png", alt: "怪兽养殖建造实机画面：用围栏和门搭成怪物栏舍", caption: "建成栏舍｜围栏与门构成可使用的空间" },
    { src: "./media/media/monster-ranch/staff-zone.png", alt: "怪兽养殖建造实机画面：在宿舍划定员工区", caption: "区域用途｜宿舍设施进入员工区的条件检查" },
  ],
  maya: [
    { src: "./media/case-assets/maya/interior-map.webp", alt: "探寻玛雅室内场景中的阵列、壁画、三层密码门和柜子点位", caption: "室内解谜｜阵列触发门，壁画提供密码，柜子是可选拾取点。", kind: "board" },
    { src: "./media/case-assets/maya/exterior-map.webp", alt: "探寻玛雅室外雨林与神殿地图", caption: "室外路线｜棺椁、祖灵、供品与祭坛组成后续章节的探索路径。", kind: "board" },
  ],
  "academy-mist": [
    { src: "./media/case-assets/academy/mission-choice.jpg", alt: "学院迷雾第一幕实机中的接受任务选项", caption: "任务选择｜实机中出现接受或暂不接受委托的选项。" },
    { src: "./media/case-assets/academy/bamboo-dialogue.jpg", alt: "学院迷雾第一幕竹林场景中的人物对话", caption: "竹林对话｜后续人物与信息分支见章节策划。" },
  ],
  bamiyan: [
    { src: "./media/media/bamiyan/ascent.png", alt: "巴米扬虚拟现实体验中沿光线攀登的洞窟通道", caption: "通道引导｜窄路与采光共同提示向上的路线。" },
    { src: "./media/media/bamiyan/candle.png", alt: "巴米扬虚拟现实体验中的洞窟烛火场景", caption: "停留交互｜暗处烛火让玩家停下观察和收集。" },
  ],
  archeditor: [
    { src: "./media/media/gallery/archeditor-massing.jpg", alt: "ArchEditor 实机演示中的三维体块编辑画面", caption: "Unity 编辑端｜调整体块形态、尺寸与局部空间关系。" },
  ],
};

const coreSystemPreviews: Record<string, { eyebrow: string; title: string; meta: string; description: string; caption: string; href: string; source: string; label: string }> = {
  maya: {
    eyebrow: "关卡系统",
    title: "地图 · 任务 · 状态",
    meta: "空间分区 · 解谜点状态 · 当前目标",
    description: "地图持续显示区域通路与解谜点状态，任务系统读取当前地图生成目标。玩家完成机关后，点位、通路和下一任务同步更新。",
    caption: "地图回答哪里可去、解谜做到哪一步；任务把这些状态转成下一目标。",
    href: "?project=maya#map-puzzles",
    label: "探寻玛雅地图可视化状态与任务引导互相更新的关卡系统图",
    source: mayaGuidanceFlow,
  },
  "academy-mist": {
    eyebrow: "叙事系统",
    title: "多线叙事",
    meta: "选择 · 持续状态 · 条件组合 · 分支汇合",
    description: "参考 CRPG 常见的状态驱动方法：选择写入任务、人物与信息状态，后续节点组合读取，再开放主任务、人物专属或秘密分支。",
    caption: "状态跨场景保留；多个条件共同决定分支开放、隐藏与汇合。",
    href: "?project=academy-mist#narrative-state",
    label: "学院迷雾选择写入多类持续状态并通过条件组合开放多条剧情分支的叙事系统图",
    source: academyNarrativeFlow,
  },
  archeditor: {
    eyebrow: "技术系统",
    title: "体块 · 约束 · 生成",
    meta: "Unity · 深度图 · ControlNet · Stable Diffusion",
    description: "Unity 体块先确定空间结构与视角，再生成并上传深度图。ControlNet 与文字提示共同约束生成；检查结果分别返回体块、视角或提示参数。",
    caption: "空间问题返回 Unity，风格问题返回提示参数，检查通过后输出方案图。",
    href: "?project=archeditor#technical-route",
    label: "ArchEditor 从 Unity 体块和深度图上传到 ControlNet 约束 Stable Diffusion 的技术系统图",
    source: `flowchart TD
      A["Unity 编辑体块<br/>确定方案视角"] --> B["生成并上传深度图"]
      B --> C["ControlNet<br/>读取空间约束"]
      P["文字提示与风格参数"] --> D["Stable Diffusion<br/>生成方案图"]
      C --> D
      D --> E["对照体块<br/>检查轮廓与空间关系"]
      E --> F{"是否符合预期？"}
      F -->|形体或视角| A
      F -->|风格或表达| P
      F -->|通过| G["输出方案图"]`,
  },
  bamiyan: {
    eyebrow: "关卡系统",
    title: "复原 · 关卡 · 体验",
    meta: "资料研究 · 空间模型 · 路线组织 · 遗产理解",
    description: "项目从测绘、影像和历史资料恢复洞窟空间，再提取洞口、高差、尺度和采光组织路线，最终通过玩家行动建立对遗产场景的理解。",
    caption: "复原依据进入关卡组织；环境引导和玩家行动共同产生空间与叙事体验。",
    href: "?project=bamiyan#level-guidance",
    label: "巴米扬从资料与空间复原到关卡组织玩家行动和遗产理解的完整项目系统图",
    source: bamiyanProjectFlow,
  },
};

export function PortfolioExperience({ initialData, isAdmin }: { initialData: PortfolioData; isAdmin: boolean }) {
  const [playingProject, setPlayingProject] = useState<string | null>(null);
  const orderedProjects = [...initialData.projects].sort((a, b) => {
    const aIndex = projectSequence.indexOf(a.id);
    const bIndex = projectSequence.indexOf(b.id);
    return (aIndex < 0 ? projectSequence.length : aIndex) - (bIndex < 0 ? projectSequence.length : bIndex);
  });
  const projectsByGroup = groups.map((group) => ({ group, projects: orderedProjects.filter((project) => project.group === group) }));
  const [activeProject, setActiveProject] = useState(orderedProjects[0]?.id ?? "");
  const [showProjectIndex, setShowProjectIndex] = useState(false);
  const projectKey = orderedProjects.map((project) => project.id).join("|");

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const works = document.getElementById("works");
      const marker = window.innerHeight * .34;
      let current = orderedProjects[0]?.id ?? "";
      for (const project of orderedProjects) {
        const element = document.getElementById(project.id);
        if (element && element.getBoundingClientRect().top <= marker) current = project.id;
      }
      setActiveProject(current);
      setShowProjectIndex(Boolean(works && works.getBoundingClientRect().top <= window.innerHeight * .25));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [projectKey]);

  const goToProject = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    window.history.replaceState(null, "", `#${id}`);
    element.scrollIntoView({ behavior: "auto", block: "start" });
    setActiveProject(id);
  };

  return (
    <main className="portfolio-shell monochrome-portfolio">
      <header className="portfolio-nav monochrome-nav">
        <a className="portfolio-logo" href="#top" aria-label="返回顶部"><span>W</span><b>PORTFOLIO</b></a>
        <div className="nav-owner">{initialData.name}{isAdmin && <a href="/admin">编辑</a>}</div>
      </header>
      <ProjectIndex projects={orderedProjects} activeProject={activeProject} visible={showProjectIndex} onSelect={goToProject} />

      <section className="portfolio-intro" id="top">
        <p>{initialData.name}</p>
        <h1>PORTFOLIO</h1>
        <div><p>{initialData.intro}</p></div>
      </section>

      <section className="project-directory" aria-labelledby="directory-title">
        <header><p>INDEX</p><h2 id="directory-title">项目目录</h2></header>
        <div className="directory-groups">
          {projectsByGroup.map(({ group, projects }) => (
            <section className="directory-group" key={group}>
              <h3>{group}</h3>
              <div className="directory-cards">
                {projects.map((project) => (
                  <a className="directory-card" href={`#${project.id}`} key={project.id}>
                    <img src={project.coverUrl} alt="" />
                    <div><span>{project.category}</span><strong>{project.title}</strong><p>{directoryCopy[project.id]?.description ?? project.tagline}</p></div>
                    <small>{directoryCopy[project.id]?.foot ?? (project.videoUrl || project.projectUrl ? "演示可用" : "项目介绍")}</small>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="project-catalog compact-catalog" id="works" aria-label="项目作品">
        {orderedProjects.map((project, index) => <ExpandedProject project={project} index={index} playingProject={playingProject} setPlayingProject={setPlayingProject} key={project.id} />)}
      </section>

      <footer className="continuation">to be continue...</footer>
    </main>
  );
}

function ProjectIndex({ projects, activeProject, visible, onSelect }: { projects: PortfolioProject[]; activeProject: string; visible: boolean; onSelect: (id: string) => void }) {
  const activeIndex = Math.max(0, projects.findIndex((project) => project.id === activeProject));
  return <>
    <nav className={`project-rail${visible ? " is-visible" : ""}`} aria-label="项目定位">
      <header><span>PROJECTS</span><b>{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</b></header>
      <div className="project-rail-list">
        {projects.map((project, index) => <a href={`#${project.id}`} className={project.id === activeProject ? "active" : ""} aria-current={project.id === activeProject ? "true" : undefined} key={project.id} onClick={(event) => { event.preventDefault(); onSelect(project.id); }}><span>{String(index + 1).padStart(2, "0")}</span><strong>{project.title}</strong></a>)}
      </div>
      <div className="project-rail-progress" aria-hidden="true"><i style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }} /></div>
      <a className="project-rail-top" href="#top">返回顶部</a>
    </nav>
    <div className={`mobile-project-index${visible ? " is-visible" : ""}`}>
      <span>{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
      <label><span className="sr-only">跳转到项目</span><select value={activeProject} onChange={(event) => onSelect(event.target.value)}>{projects.map((project) => <option value={project.id} key={project.id}>{project.title}</option>)}</select></label>
    </div>
  </>;
}

function ExpandedProject({ project, index, playingProject, setPlayingProject }: { project: PortfolioProject; index: number; playingProject: string | null; setPlayingProject: (id: string) => void }) {
  const number = String(index + 1).padStart(2, "0");
  const isPlaying = playingProject === project.id;
  const evidence = overviewEvidence[project.id];

  return (
    <article className={`project-spread project-${project.id}`} id={project.id}>
      <header className="spread-topline"><span>{number}</span><span>{project.group} · {project.category}</span><span>{project.year}</span></header>
      <div className="spread-cover">
        <img src={project.coverUrl} alt={`${project.title} 项目封面`} loading={index === 0 ? "eager" : "lazy"} />
      </div>
      <section className="spread-overview" aria-labelledby={`${project.id}-overview`}>
        <div className="spread-overview-heading"><p className="spread-label">项目介绍</p><h2 id={`${project.id}-overview`}>{project.title}</h2><p>{project.tagline}</p></div>
        <div className="spread-description">
          <p>{project.summary}</p>
          <dl><div><dt>职责</dt><dd>{project.role}</dd></div><div><dt>进度</dt><dd>{project.progress}</dd></div><div><dt>工具</dt><dd>{project.tools}</dd></div></dl>
        </div>
      </section>
      {(project.videoUrl || project.projectUrl) && <section className="spread-demo spread-demo-priority" aria-label={`${project.title} 项目演示`}>
        <div className="spread-demo-copy"><p className="spread-label">项目演示</p><h3>查看完整演示</h3><p>{project.demoDescription}</p><span>{project.demoDuration}</span></div>
        <div className="spread-demo-media">
          {project.videoUrl && isPlaying && <ProjectVideo src={project.videoUrl} poster={project.coverUrl} title={project.title} autoPlay />}
          {project.videoUrl && !isPlaying && <button className="demo-poster" type="button" onClick={() => setPlayingProject(project.id)} aria-label={`播放 ${project.title} 完整演示`}><img src={project.coverUrl} alt="" /><span><Play fill="currentColor" />播放演示</span>{project.demoDuration && <b>{project.demoDuration}</b>}</button>}
          {!project.videoUrl && project.projectUrl && <a className="demo-poster" href={project.projectUrl} target="_blank" rel="noreferrer"><img src={project.coverUrl} alt="" /><span><Play fill="currentColor" />观看演示</span>{project.demoDuration && <b>{project.demoDuration}</b>}</a>}
        </div>
      </section>}
      {evidence && <div className={`spread-evidence ${evidence.length === 1 ? "spread-evidence-single" : ""}`} aria-label={`${project.title} 项目画面预览`}>
        {evidence.map((item) => <figure key={item.src}>
          <img className={item.kind === "board" ? "evidence-board" : undefined} src={item.src} alt={item.alt} loading="lazy" />
          <figcaption>{item.caption}</figcaption>
        </figure>)}
      </div>}
      {project.id === "leafboat" && <LeafboatHomeMaterial />}
      {project.id === "monster-ranch" && <MonsterRanchHome />}
      {coreSystemPreviews[project.id] && <ProjectSystemHome projectId={project.id} />}
      <footer className="spread-footer"><a href={`?project=${project.id}`}>查看完整案例</a></footer>
    </article>
  );
}

function ProjectSystemHome({ projectId }: { projectId: string }) {
  const item = coreSystemPreviews[projectId];
  return <section className="leafboat-home-material project-system-home" aria-labelledby={`${projectId}-system-preview-title`}>
    <div className="leafboat-home-diagram">
      <ExistingDiagramPreview label={`${item.title}完整流程图缩略展示`}>
        <figure className="lb-diagram" aria-label={item.label}>
          <div className="lb-diagram-heading"><h3>{item.title}</h3><span>{item.meta}</span></div>
          {projectId === "archeditor"
            ? <div className="lb-diagram-scroll"><LeafboatMermaid id={`${projectId}-system-home`} source={item.source} label={item.label} /></div>
            : <div className="project-core-preview"><CoreSystemDiagram kind={projectId as "maya" | "academy-mist" | "bamiyan"} /></div>}
          <figcaption>{item.caption}</figcaption>
        </figure>
      </ExistingDiagramPreview>
    </div>
    <div className="leafboat-home-copy">
      <p className="spread-label">{item.eyebrow}</p>
      <h3 id={`${projectId}-system-preview-title`}>{item.title}</h3>
      <p>{item.description}</p>
      <a className="leafboat-home-more" href={item.href}><span>点开查看更多</span><small>完整流程图 · 设计说明 · 对应画面</small></a>
    </div>
  </section>;
}

function LeafboatHomeMaterial() {
  return <section className="leafboat-home-material" id="leafboat-material" aria-labelledby="leafboat-material-title">
    <div className="leafboat-home-copy">
      <p className="spread-label">系统设计</p>
      <h3 id="leafboat-material-title">系统关系与规则联动</h3>
      <p>吐丝建立连接、收丝拉动物体。食物维持生存与吐丝，叶片构成叶舟；水流与生物影响移动和资源获取。下方完整展示系统间的七条连接及其规则反馈。</p>
      <a className="leafboat-home-more" href="?project=leafboat#system-design">
        <span>点开查看更多</span>
        <small>两张完整流程图 · 三轮试玩 · 实机截图</small>
      </a>
    </div>
    <div className="home-full-diagrams" aria-label="叶舟完整系统图">
      <figure className="lb-diagram">
        <div className="lb-diagram-heading"><h3>系统关系图</h3><span>蛛丝操作 · 资源获取 · 生存 · 叶舟航行 · 环境与生物</span></div>
        <div className="lb-diagram-scroll" tabIndex={0}><LeafboatMermaid id="lb-system-home-full" source={leafboatSystemFlow} label="叶舟完整系统关系图：五个系统节点与七条带方向的连接" /></div>
        <figcaption>资源获取 → 生存状态 → 蛛丝操作；叶舟航行带来新的资源位置，环境和生物同时改变航行与食物获取。</figcaption>
      </figure>
      <details className="home-diagram-detail">
        <summary>展开规则联动图｜状态变化、四个系统响应与操作闭环</summary>
        <figure className="lb-diagram">
          <div className="lb-diagram-heading"><h3>规则联动图</h3><span>完整节点与反馈链</span></div>
          <div className="lb-diagram-scroll" tabIndex={0}><LeafboatMermaid id="lb-rule-home-full" source={leafboatRuleFlow} label="叶舟完整规则联动图：资源与生存、水域生态、叶舟搭建、航行、状态反馈与下次操作" /></div>
          <figcaption>同一条连接与牵引规则改变对象状态；结果反馈到玩家下一次的目标、连接与收丝方式。</figcaption>
        </figure>
      </details>
    </div>
    <div className="leafboat-home-iterations" aria-label="三轮试玩进度">
      <p className="leafboat-home-iterations-label">试玩迭代</p>
      <div><span>01</span><strong>操作理解</strong><p>键位分散 → 操作集中</p></div>
      <div><span>02</span><strong>探索动力</strong><p>环境安逸 → 压力与线索</p></div>
      <div><span>03</span><strong>玩家新用法</strong><p>连叶成路 → 区域调整 <em>待验证</em></p></div>
    </div>
  </section>;
}
