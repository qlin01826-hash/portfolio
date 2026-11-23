import type { ReactNode } from "react";
import { LeafboatMermaid } from "./leafboat-mermaid";
import { CoreSystemDiagram } from "./core-system-diagrams";

function Section({ number, label, title, children, id }: { number: string; label: string; title: string; children: ReactNode; id?: string }) {
  return <section className="case-section focused-case-section" id={id}><div className="case-section-label"><span>{number}</span><p>{label}</p></div><div className="focused-case-content"><h2>{title}</h2>{children}</div></section>;
}

function Diagram({ id, source, label, caption, className = "" }: { id: string; source: string; label: string; caption: string; className?: string }) {
  return <figure className={`focused-vector-figure narrative-diagram ${className}`}><div className="narrative-diagram-scroll"><LeafboatMermaid id={id} source={source} label={label} /></div><figcaption>{caption}</figcaption></figure>;
}

const bamiyanStages = [
  { title: "洞窟入口", cue: "洞窟开口与可见路线", action: "确认进入方向，开始沿高差探索", purpose: "让玩家主动进入路线", image: "./media/media/bamiyan/entrance.png", alt: "从巴米扬洞窟开口望向外部的空间画面" },
  { title: "狭窄通道", cue: "收窄尺度与向上的光线", action: "靠近并俯身通过，继续向上", purpose: "用身体动作感受空间变化", image: "./media/media/bamiyan/ascent.png", alt: "人物在狭窄洞窟通道中沿光线向上行进" },
  { title: "烛火洞窟", cue: "暗处的烛火与局部照明", action: "停下收集；烛火逃散时重新尝试", purpose: "把视线和停留带入叙事节点", image: "./media/media/bamiyan/candle.png", alt: "洞窟内人物与烛火的体验画面" },
  { title: "高处平台", cue: "采光口与逐渐打开的远景", action: "走出通道，从新高度观察佛龛", purpose: "以景观反馈结束一次攀登", image: "./media/media/bamiyan/outlook.png", alt: "从高处平台望向巴米扬佛龛的体验画面" },
];

function ArchTechnicalDiagram() {
  const arrow = <div className="arch-route-arrow" aria-hidden="true">↓</div>;
  return <figure className="focused-vector-figure arch-route-figure">
    <div className="arch-route-grid" role="img" aria-label="从 Unity 体块、深度图和 ControlNet 约束到 Stable Diffusion 生成与结果检查的技术路线">
      <section className="arch-route-stage">
        <header><span>01</span><h3>UNITY 编辑端</h3></header>
        <div className="arch-route-card">场地与建筑条件</div>{arrow}
        <div className="arch-route-card core">编辑三维体块</div>{arrow}
        <div className="arch-route-card">确定方案视角</div>{arrow}
        <div className="arch-route-card core">生成深度图</div>{arrow}
        <div className="arch-route-card core">上传深度图</div>
      </section>
      <div className="arch-route-bridge" aria-hidden="true"><span>空间约束</span><b>→</b></div>
      <section className="arch-route-stage arch-generation-stage">
        <header><span>02</span><h3>AI 生成与检查</h3></header>
        <div className="arch-route-inputs"><div className="arch-route-card core">ControlNet<br />读取空间约束</div><div className="arch-route-card">文字提示<br />与风格参数</div></div>
        <div className="arch-route-merge" aria-hidden="true"><span>↘</span><span>↙</span></div>
        <div className="arch-route-card core wide">Stable Diffusion 生成方案图</div>{arrow}
        <div className="arch-route-card core wide">对照体块检查轮廓与空间关系</div>{arrow}
        <div className="arch-route-card decision wide">是否符合预期？</div>
        <div className="arch-route-branches"><article><span>形体 / 视角</span><strong>返回 Unity</strong></article><article><span>风格 / 表达</span><strong>返回提示参数</strong></article><article className="pass"><span>检查通过</span><strong>输出方案图</strong></article></div>
      </section>
    </div>
    <figcaption>主链是一次生成；检查结果分别返回体块、视角或生成条件继续调整。</figcaption>
  </figure>;
}

export function ArchEditorCase() {
  return <>
    <Section number="02" label="AI 创作流程" title="技术路线" id="technical-route">
      <p className="case-lead">操作从 Unity 中的空间输入开始。三维体块生成深度图后进入 ControlNet；文字提示与深度约束共同驱动 Stable Diffusion，生成结果再返回体块和参数调整。</p>
      <ArchTechnicalDiagram />
    </Section>
    <Section number="03" label="实机内容" title="编辑端">
      <div className="focused-media-pair">
        <figure><img src="./media/media/gallery/archeditor-massing.jpg" alt="ArchEditor 中的三维体块编辑界面" loading="lazy" /><figcaption>Unity 编辑端｜场地边界、建筑条件与三维体块。</figcaption></figure>
        <div className="focused-media-copy"><h3>体块编辑</h3><p>现有演示可以核对体块放置、尺寸调整、局部变形和视角选择。技术路线图继续说明这些空间输入如何进入深度约束生成流程。</p></div>
      </div>
    </Section>
    <Section number="04" label="设计判断" title="约束与迭代">
      <div className="focused-decision-grid"><article><h3>空间约束</h3><p>直接用文字生成时，建筑形体和空间关系难以稳定保持。体块与深度图先明确空间边界，再交给生成模型。</p></article><article><h3>修改路径</h3><p>形体偏差返回 Unity 调整体块或视角；风格和表达偏差返回文字提示与生成参数，避免把不同问题混在一次修改里。</p></article></div>
    </Section>
  </>;
}

export function BamiyanCase() {
  return <>
    <Section number="01" label="项目系统" title="复原与体验" id="level-guidance">
      <p className="case-lead">项目先依据测绘、影像与历史资料恢复洞窟空间，再把洞口、高差、尺度和采光转成关卡路线与环境引导。玩家的移动、停留和收集最终服务于理解洞窟关系与遗产场景。</p>
      <figure className="focused-vector-figure core-system-figure"><CoreSystemDiagram kind="bamiyan" /><figcaption>上层是复原依据，中层是关卡组织，下层是体验结果；试玩与展览反馈继续调整路线和引导。</figcaption></figure>
    </Section>
    <Section number="02" label="实机案例" title="引导节点">
      <div className="bamiyan-stage-list">{bamiyanStages.map((stage, index) => <article key={stage.title}>
        <figure><img src={stage.image} alt={stage.alt} loading="lazy" /></figure>
        <div><span>{String(index + 1).padStart(2, "0")} / 关卡节点</span><h3>{stage.title}</h3><dl><div><dt>空间线索</dt><dd>{stage.cue}</dd></div><div><dt>玩家行为</dt><dd>{stage.action}</dd></div><div><dt>体验目的</dt><dd>{stage.purpose}</dd></div></dl></div>
      </article>)}</div>
    </Section>
    <Section number="03" label="空间依据" title="复原与展示">
      <div className="focused-media-pair"><figure><img src="./media/media/bamiyan/route-model.png" alt="巴米扬东大佛与周边洞窟的三维空间关系模型" loading="lazy" /><figcaption>空间模型｜东大佛、周边洞窟与高差路线。</figcaption></figure><div className="focused-media-copy"><h3>从资料到关卡</h3><p>测绘、影像和历史资料用于恢复洞窟位置、高差与尺度。关卡设计再把洞口、通道宽窄、采光和可见目标转化为路线节点。</p><p>空间模型回答“路线在哪里”，上方实机案例回答“玩家为什么会继续前进”。</p></div></div>
      <div className="exhibition-panel"><strong>第二届全国虚拟建筑研讨会</strong><span>参展中</span><p>展示巴米扬虚拟现实空间复原、洞窟路线与体验设计。</p></div>
    </Section>
  </>;
}
