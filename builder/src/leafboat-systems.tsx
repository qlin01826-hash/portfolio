import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { ExistingDiagramPreview } from "./leafboat-diagram-preview";
import { LeafboatMermaid } from "./leafboat-mermaid";
import { leafboatSystemFlow, leafboatRuleFlow, leafboatIterationFlow } from "./leafboat-system-flow";

const systems = [
  { name: "蛛丝操作", action: "吐丝连接目标，再通过收丝牵引。", relation: "同一套操作用于获取食物、连接叶片和调整移动。" },
  { name: "叶舟搭建与航行", action: "连接周围叶片，调整自己的漂浮结构。", relation: "连接后的整体重量影响牵引结果，航行还受到水流影响。" },
  { name: "资源与生存", action: "获取水面食物，维持饱食度与吐丝所需的资源。", relation: "获取食物需要使用蛛丝，生存状态又影响后续行动。" },
  { name: "环境与生物", action: "观察水流、漂浮物与周围生物。", relation: "水流影响移动；拉动浆果时，可能引来水下的鱼争抢。" },
];

const iterations = [
  {
    title: "操作理解", round: "第一轮", problem: "吐丝、收丝和物品处理键位分散，玩家需要反复记忆。", solution: "将蛛丝操作集中到鼠标按键与滚轮，合并吃东西、处理鱼肉等物品操作。", status: "已调整", image: "connection", time: "00:25", imageAlt: "当前版本中，蜘蛛的连接丝线、收放提示与操作说明", detailImage: "structure", detailCaption: "当前版本实机 · 蛛丝连接与操作提示",
    finding: "即使是玩过《饥荒》《星露谷》等游戏的玩家，上手时也需要反复记忆键位。吐丝、收丝和物品处理分散在不同按键上，操作本身成为理解玩法的阻碍。",
    judgment: "把频繁使用的蛛丝操作放在容易触达的位置，合并用途相近的物品操作。",
    change: "将核心蛛丝操作集中到鼠标按键与滚轮，将吃东西、处理鱼肉等物品处理行为归到同一按键。",
    result: "下一轮试玩中，玩家能够更自由地在水面活动，反馈重点转向了“为什么要继续前进”。",
  },
  {
    title: "探索动力", round: "第二轮", problem: "环境安逸、生存压力偏低，玩家缺少前往目的地的动力。", solution: "引入精神状态与河流污染，并通过特殊物品提示故事背景。", status: "已调整", image: "navigation", time: "02:25", imageAlt: "当前版本中，蜘蛛在水流与岩石之间操纵叶舟，界面显示航行目标和生存状态", detailImage: "river", detailCaption: "当前版本实机 · 航行目标与水域探索",
    finding: "玩家喜欢在水面上活动，但环境比较安逸，生存压力较低，缺少前往目的地的动力。",
    judgment: "让继续探索与玩家眼前的生存处境产生联系，通过环境中的物品提示故事背景。",
    change: "引入精神状态与河流污染相关设计，让食物除了提供饱腹，也可能带来负面影响；增加能够提示背景故事的特殊物品。",
    result: "第三轮试玩中，玩家开始向前推进，但也发现了预想之外的移动方式。",
  },
  {
    title: "玩家新用法", round: "第三轮", problem: "叶片持续刷新，玩家可一路连接成路，削弱了航行的必要性。", solution: "拟区分叶片密集区与稀疏区，保留基地搭建，并让跨区移动需要航行。", status: "方案待验证", image: "network", time: "02:05", imageAlt: "当前版本中，多片叶子被蛛丝连接成一个整体", detailImage: "passage", detailCaption: "当前版本实机 · 多叶连接与水域穿行",
    finding: "有玩家把水面上的叶片连续连接起来，直接走向目的地。大量连接还暴露了性能问题。",
    judgment: "“连成道路”说明玩家已经主动运用了规则。但叶片持续刷新、分布稳定，使这种方法可以一路延伸，削弱了航行的作用。",
    change: "在叶片密集区保留连接和搭建基地的空间；在叶片稀疏区，让玩家拆出部分叶舟，通过航行前往下一区域。",
    result: "区域调整仍需后续实现和验证，大量连接的性能问题也需要继续处理。",
  },
];

function Still({ image, caption }: { image: string; caption: string }) {
  return <figure className="lb-still"><img src={`./media/leafboat-stills/${image}.jpg`} alt={caption} loading="lazy" width={1280} height={720} /><figcaption>{caption}</figcaption></figure>;
}

function PhotoDrawer({ id, title, eyebrow, problem, solution, image, imageAlt, time, status, meta, children }: {
  id: string; title: string; eyebrow: string; problem: string; solution: string; image: string; imageAlt: string; time: string; status?: string; meta: string; children: ReactNode;
}) {
  return <details className="lb-photo-drawer" id={id}>
    <summary>
      <span className="lb-drawer-thumbnail"><img src={`./media/leafboat-stills/${image}.jpg`} alt={imageAlt} loading="lazy" width={1280} height={720} /><span className="lb-thumbnail-caption">当前版本实机 · {time}</span></span>
      <span className="lb-drawer-copy"><span className="lb-drawer-eyebrow">{eyebrow}</span><strong className="lb-drawer-title">{title}</strong><span className="lb-iteration-overview"><span><b>问题</b>{problem}</span><span><b>解决方案</b>{solution}</span></span><span className="lb-drawer-meta">{status && <span className={`lb-status${status === "方案待验证" ? " is-pending" : ""}`}>{status}</span>}<span>{meta}</span></span><span className="lb-drawer-toggle"><span className="lb-when-closed">展开内容</span><span className="lb-when-open">收起内容</span><ChevronDown aria-hidden="true" /></span></span>
    </summary>
    <div className="lb-drawer-body">{children}</div>
  </details>;
}

function DiagramDrawer({ id, title, description, preview, children }: {
  id: string; title: string; description: string; preview: ReactNode; children: ReactNode;
}) {
  return <article className="lb-diagram-drawer" id={id}>
    <div className="lb-diagram-teaser">
      <div className="lb-diagram-preview-cell"><ExistingDiagramPreview label={`${title}的完整流程图缩略展示`}>{preview}</ExistingDiagramPreview></div>
      <div className="lb-drawer-copy"><span className="lb-drawer-eyebrow">系统方案</span><h3 className="lb-drawer-title">{title}</h3><p className="lb-drawer-description">{description}</p><span className="lb-drawer-meta">完整流程图 · 实机说明</span></div>
    </div>
    <details className="lb-diagram-expansion"><summary><span className="lb-when-closed">展开{title}与实机截图</span><span className="lb-when-open">收起{title}与实机截图</span><ChevronDown aria-hidden="true" /></summary><div className="lb-drawer-body">{children}</div></details>
  </article>;
}

function SystemDiagram({ prefix = "full" }: { prefix?: string }) {
  return <figure className="lb-diagram lb-system-diagram" aria-label="完整系统关系图">
    <div className="lb-diagram-heading"><h3>系统关系图</h3><span>操作 · 资源 · 生存 · 航行 · 环境</span></div>
    <div className="lb-diagram-scroll" tabIndex={0} role="region" aria-label="完整系统关系图，可横向滚动">
      <LeafboatMermaid id={`lb-system-${prefix}`} source={leafboatSystemFlow} label="原始系统关系图：五个节点、七条连线，保留完整节点说明与连线标签" />
    </div>
    <figcaption>获取食物维持吐丝能力，连接叶片调整航行结构；水流与周围生物持续影响玩家的选择。</figcaption>
  </figure>;
}

function RuleDiagram({ prefix = "full" }: { prefix?: string }) {
  return <figure className="lb-diagram" aria-label="完整规则联动图">
    <div className="lb-diagram-heading"><h3>规则联动</h3><span>基础规则 · 状态变化 · 系统响应</span></div>
    <div className="lb-diagram-scroll" tabIndex={0} role="region" aria-label="完整规则联动图，可横向滚动">
      <LeafboatMermaid id={`lb-rule-${prefix}`} source={leafboatRuleFlow} label="规则联动图：基础规则高亮，按资源与生存、水域生态、叶舟搭建、水面航行划分区域，并通过状态反馈返回下一次操作" />
    </div>
    <figcaption>同一条连接与牵引规则，通过状态变化影响多个系统；系统结果再改变下一次操作的条件。</figcaption>
  </figure>;
}

function IterationDiagram() {
  return <figure className="lb-diagram lb-iteration-diagram" aria-label="完整区域调整关系图">
    <div className="lb-diagram-heading"><h3>区域调整图</h3><span>方案待验证</span></div>
    <div className="lb-diagram-scroll" tabIndex={0} role="region" aria-label="完整区域调整图，可横向滚动">
      <LeafboatMermaid id="lb-iteration-full" source={leafboatIterationFlow} label="原始区域调整图：从试玩发现、环境问题和保留价值，到叶片密集与稀疏区域的调整思路" />
    </div>
    <figcaption>区域分布调整尚待实现和验证；大量连接带来的性能问题也需继续处理。</figcaption>
  </figure>;
}

export function LeafboatSystems() {
  return <>
    <section className="case-section system-design-section lb-photo-section" id="system-design">
      <div className="case-section-label"><p>系统设计</p></div>
      <div className="evidence-content lb-content"><h2>系统方案</h2><p className="case-lead">通过完整关系图查看系统之间的联系；展开各部分，查看具体规则、设计说明与实机截图。</p>
        <div className="lb-drawer-list">
          <DiagramDrawer id="system-composition" title="系统构成" description="蛛丝操作用于获取食物和连接叶片；食物维持吐丝能力，航行带来新资源，水流与生物继续影响移动和获取。" preview={<SystemDiagram prefix="preview" />}>
            <div className="lb-still-pair"><Still image="connection" caption="当前版本实机 · 叶片连接与蛛丝操作" /><Still image="navigation" caption="当前版本实机 · 叶舟航行与水域环境" /></div>
            <div className="lb-system-cards">{systems.map(({ name, action, relation }) => <article key={name}><h3>{name}</h3><p>{action}</p><p className="lb-system-relation">{relation}</p></article>)}</div>
            <SystemDiagram />
          </DiagramDrawer>
          <DiagramDrawer id="rule-flow" title="规则联动" description="同一套蛛丝操作，让食物靠近、叶片接入并改变叶舟运动；结果继续影响生存、生物反应和下一次牵引。" preview={<RuleDiagram prefix="preview" />}>
            <div className="lb-still-pair"><Still image="operation" caption="当前版本实机 · 蛛丝连接与操作提示" /><Still image="leaves" caption="当前版本实机 · 连接结构与水面移动" /></div>
            <div className="lb-rule-intro"><h3>基础规则</h3><p>吐丝建立连接，收丝拉动物体。结果由当前目标、连接关系和双方重量共同决定；改变后的食物位置、叶舟结构和运动状态，又影响资源获取、周围生物与后续牵引。</p></div>
            <RuleDiagram />
          </DiagramDrawer>
        </div>
      </div>
    </section>
    <section className="case-section system-design-section lb-photo-section" id="player-feedback">
      <div className="case-section-label"><p>试玩反馈</p></div>
      <div className="evidence-content lb-content"><h2>试玩迭代</h2><p className="case-lead">邀请公司同事、mentor，以及玩过《饥荒》《星露谷》等游戏的朋友进行三轮试玩。截图取自当前版本实机演示，用于说明对应玩法。</p>
        <div className="lb-drawer-list">{iterations.map((iteration, index) => <PhotoDrawer key={iteration.title} id={`iteration-${index + 1}`} title={iteration.title} eyebrow={iteration.round} problem={iteration.problem} solution={iteration.solution} image={iteration.image} imageAlt={iteration.imageAlt} time={iteration.time} status={iteration.status} meta={index === 2 ? "实机截图 · 区域调整图" : "实机截图 · 试玩反馈"}>
          <div className="lb-iteration-spread"><Still image={iteration.detailImage} caption={iteration.detailCaption} /><div className="lb-iteration-findings"><div><h3>试玩发现</h3><p>{iteration.finding}</p></div><div><h3>设计判断</h3><p>{iteration.judgment}</p></div></div></div>
          <div className="lb-iteration-update"><h3>{index === 2 ? "后续调整" : "调整与反馈"}</h3><p>{iteration.change}</p><p className="lb-iteration-result">{iteration.result}</p></div>
          {index === 2 && <IterationDiagram />}
        </PhotoDrawer>)}</div>
      </div>
    </section>
  </>;
}
