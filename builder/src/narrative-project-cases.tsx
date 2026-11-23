import type { ReactNode } from "react";
import { LeafboatMermaid } from "./leafboat-mermaid";
import { CoreSystemDiagram } from "./core-system-diagrams";

function Section({ number, label, title, children, id }: { number: string; label: string; title: string; children: ReactNode; id?: string }) {
  return <section className="case-section focused-case-section" id={id}><div className="case-section-label"><span>{number}</span><p>{label}</p></div><div className="focused-case-content"><h2>{title}</h2>{children}</div></section>;
}

function Diagram({ id, source, label, caption, className = "" }: { id: string; source: string; label: string; caption: string; className?: string }) {
  return <figure className={`focused-vector-figure narrative-diagram ${className}`}><div className="narrative-diagram-scroll"><LeafboatMermaid id={id} source={source} label={label} /></div><figcaption>{caption}</figcaption></figure>;
}

const exteriorFlow = `flowchart LR
  A["棺椁密码"] --> B["祖灵出现"]
  B --> C["获得仪式目标"]
  C --> D["寻找三处供品"]
  D --> E{"供品齐全？"}
  E -->|否| D
  E -->|是| F["返回祭坛"]
  F --> G["完成仪式"]
  G --> H["光影重组碎片"]
  classDef endpoint fill:#25332d,stroke:#b5cdbb,color:#f0f3ef;
  class H endpoint;`;

const chapterFlow = `flowchart LR
  A["学院：接到委托"] --> B{"是否接受任务？"}
  B -->|接受| C["任务状态：进行中"]
  B -->|暂不接受| D["任务状态：保留"]
  C --> E["进入竹林：遇见第二位角色"]
  D -.-> E
  E --> F{"如何回应？"}
  F -->|安慰| G["人物线：交流方向"]
  F -->|直问| H["信息线：追问真相"]
  G --> I["下一章节条件"]
  H --> I
  classDef design fill:#1d2c38,stroke:#a9bfce,color:#f0f3ef;
  class G,H,I design;`;

const mayaNodes = [
  ["中央阵列", "踩踏后启动密码门外圈，明确主机关已经响应。"],
  ["壁画", "提供第三圈所需密码，让观察结果回到门的操作中。"],
  ["密码门", "外圈触发、图腾拼合与密码输入共同组成三层机制。"],
  ["金币柜子", "作为室内可选探索内容，不参与密码门开启判定。"],
];

export function MayaCase() {
  return <>
    <Section number="02" label="关卡设计" title="地图与任务" id="map-puzzles">
      <p className="case-lead">地图不只是展示位置，还要持续显示区域是否开放、解谜点做到哪一步，并把这些状态转成当前任务目标。玩家完成机关后，地图通路和下一目标同步更新。</p>
      <div className="case-core-stack maya-core-layout">
        <figure className="narrative-source-image"><a href="./media/case-assets/maya/interior-map.webp" target="_blank" rel="noreferrer"><img src="./media/case-assets/maya/interior-map.webp" alt="室内场景中的壁画、密码门、中央阵列和柜子点位" /></a><figcaption>室内地图｜中央阵列、壁画、密码门和金币柜子的空间位置。</figcaption></figure>
        <figure className="focused-vector-figure core-system-figure"><CoreSystemDiagram kind="maya" /><figcaption>地图提供可达区域与解谜点状态；任务读取这些状态生成目标，完成结果再更新地图。</figcaption></figure>
      </div>
      <div className="narrative-node-grid">{mayaNodes.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
    </Section>
    <Section number="03" label="章节设计" title="章节路线">
      <p className="case-lead">第二、三章把探索从遗迹室内扩展到雨林与神殿。玩家从棺椁谜题获得祖灵指引，再在不同地点寻找供品并回到祭坛。</p>
      <Diagram id="maya-exterior-route" source={exteriorFlow} label="棺椁、祖灵、供品与祭坛组成的章节路线" caption="后续章节的策划路线。公开演示覆盖范围以页面上方的视频为准。" className="core-diagram horizontal-diagram" />
      <figure className="narrative-source-image wide-evidence"><a href="./media/case-assets/maya/exterior-map.webp" target="_blank" rel="noreferrer"><img src="./media/case-assets/maya/exterior-map.webp" alt="雨林与神殿地图及探索路线" loading="lazy" /></a><figcaption>室外地图｜雨林、神殿和探索路径；点击查看完整尺寸。</figcaption></figure>
    </Section>
    <Section number="04" label="设计依据" title="原始方案">
      <p className="case-lead">原始点位图保留机关外观、空间位置与关卡对象，作为上方流程图的设计依据。</p>
      <div className="narrative-artifact-stack"><figure><a href="./media/case-assets/maya/interior-points.webp" target="_blank" rel="noreferrer"><img src="./media/case-assets/maya/interior-points.webp" alt="室内阵列、密码门、壁画与金币柜子的原始点位设计" loading="lazy" /></a><figcaption>室内点位｜门、阵列、壁画与柜子。</figcaption></figure><figure><a href="./media/case-assets/maya/exterior-points.webp" target="_blank" rel="noreferrer"><img src="./media/case-assets/maya/exterior-points.webp" alt="室外棺椁、祖灵与仪式地点的原始点位设计" loading="lazy" /></a><figcaption>室外点位｜棺椁、祖灵与仪式对象。</figcaption></figure></div>
    </Section>
  </>;
}

export function AcademyCase() {
  return <>
    <Section number="02" label="叙事设计" title="多线叙事" id="narrative-state">
      <p className="case-lead">这里参考 CRPG 常见的状态驱动组织方式，但不把项目直接定义为 CRPG。玩家选择会同时改变任务、人物关系与信息状态；后续节点组合读取这些状态，开放主任务、人物专属或秘密分支，也让条件不足的内容继续隐藏。</p>
      <figure className="focused-vector-figure core-system-figure"><CoreSystemDiagram kind="academy-mist" /><figcaption>分支不是一次性对话树：状态会跨场景保留，在后续节点重新组合，并允许不同线路汇合。</figcaption></figure>
      <div className="state-model-grid"><article><span>任务状态</span><strong>玩家当前要做什么</strong><p>记录委托是否接受、进行或保留。</p></article><article><span>人物状态</span><strong>角色如何回应玩家</strong><p>为后续对话和交流方向提供条件。</p></article><article><span>信息状态</span><strong>玩家已经知道什么</strong><p>控制世界背景与真相的释放顺序。</p></article></div>
    </Section>
    <Section number="03" label="实机案例" title="第一幕" id="chapter-one">
      <p className="case-lead">第一幕从学院委托进入竹林。下面用同一段流程对照实机选择画面和后续章节方案。</p>
      <Diagram id="academy-chapter-example" source={chapterFlow} label="第一幕任务选择、竹林对话与后续人物信息分支" caption="实线节点可在第一幕演示中核对；人物线与信息线的长线影响仍属于章节策划。" className="core-diagram compact-diagram" />
      <div className="narrative-still-grid"><figure><img src="./media/case-assets/academy/mission-choice.jpg" alt="第一幕实机中的接受任务和暂不接受选项" loading="lazy" /><figcaption>任务选择｜对应“是否接受任务”节点。</figcaption></figure><figure><img src="./media/case-assets/academy/bamboo-dialogue.jpg" alt="第一幕实机中的竹林人物对话" loading="lazy" /><figcaption>竹林对话｜对应第二位角色出场节点。</figcaption></figure></div>
      <p className="narrative-boundary"><strong>完成边界</strong>　实机可核对角色出场、任务选项、竹林对话与场景切换；选项对长线人物关系和剧情的具体影响仍是策划方案。</p>
    </Section>
    <Section number="04" label="设计依据" title="原始方案">
      <p className="case-lead">原章节表按场景、出场人物、对话和玩家选项记录内容。这里单列放大，用来核对上方流程中的具体节点。</p>
      <div className="narrative-artifact-stack"><figure><a href="./media/case-assets/academy/chapter-one-plan.webp" target="_blank" rel="noreferrer"><img src="./media/case-assets/academy/chapter-one-plan.webp" alt="学院迷雾原始章节设计表第一页" loading="lazy" /></a><figcaption>原始章节表 01｜委托选择与竹林场景。</figcaption></figure><figure><a href="./media/case-assets/academy/chapter-two-plan.webp" target="_blank" rel="noreferrer"><img src="./media/case-assets/academy/chapter-two-plan.webp" alt="学院迷雾原始章节设计表第二页" loading="lazy" /></a><figcaption>原始章节表 02｜人物对话与回应选项。</figcaption></figure></div>
    </Section>
  </>;
}
