import { MonsterRanchFlow, type RanchFlow } from "./monster-ranch-diagrams";

const media = "./media/media/monster-ranch";
const sizes: Record<string, [number, number]> = {
  "dorm.png": [710, 655],
  "catalog-base.png": [330, 245], "catalog-furniture.png": [330, 245], "catalog-equipment.png": [330, 230],
  "ranch-pen.png": [1920, 1080], "placement-preview.png": [690, 450], "saved-blueprint.png": [690, 450],
  "staff-zone.png": [1920, 1080], "wall-prerequisite.png": [320, 283],
};

function Diagram({ kind, alt, caption }: { kind: RanchFlow; alt: string; caption: string }) {
  return <figure className="mr-diagram"><div className="mr-diagram-scroll" tabIndex={0}><MonsterRanchFlow kind={kind} title={alt} /></div><figcaption>{caption}</figcaption></figure>;
}

function Still({ src, alt, caption, compact = false }: { src: string; alt: string; caption: string; compact?: boolean }) {
  return <figure className={`mr-still${compact ? " mr-still-compact" : ""}`}><img src={`${media}/${src}`} alt={alt} width={sizes[src][0]} height={sizes[src][1]} loading="lazy" /><figcaption>{caption}</figcaption></figure>;
}

function Section({ number, label, title, id, children }: { number: string; label: string; title: string; id?: string; children: React.ReactNode }) {
  return <section className="case-section mr-section" id={id}><div className="case-section-label"><span>{number}</span><p>{label}</p></div><div className="mr-section-body"><h2>{title}</h2>{children}</div></section>;
}

export function MonsterRanchHome() {
  return <section className="mr-home" aria-label="怪兽养殖建造系统预览">
    <div className="mr-home-copy"><p className="spread-label">建造系统</p><h3>规划 · 施工 · 区域</h3><p>从地基、围栏与设施等构件出发，自由组织栏舍和工作空间；再通过区域用途与条件检查，让建造结果进入怪物养殖和员工工作。</p><a href="?project=monster-ranch#ranch-system">查看完整案例<small>六张完整流程图 · 实机画面 · 规则说明</small></a></div>
    <div className="mr-home-diagram"><MonsterRanchFlow kind="structure" title="规划系统、蓝图、实际建造、区域划分、空间检查及运营反馈的完整关系图" /></div>
    <details className="home-diagram-detail"><summary>展开其余五张流程图｜经营循环、规划、施工、区域检查、运营反馈</summary>
      <div className="mr-home-flow-list">
        {([
          ["loop", "经营循环：出售或留养 → 收益和风险 → 建设 → 养殖"],
          ["planning", "规划：依赖与缺口 → 放置校验 → 蓝图 → 开工"],
          ["construction", "施工：队列 → 材料与员工 → 建成单件 → 空间状态"],
          ["zones", "区域检查：用途和边界 → 条件判断 → 修复或启用"],
          ["feedback", "运营反馈：建筑和区域 → 员工与养殖 → 再规划"],
        ] as const).map(([kind, title]) => <figure key={kind}><figcaption>{title}</figcaption><div className="mr-diagram-scroll" tabIndex={0}><MonsterRanchFlow kind={kind} title={title} /></div></figure>)}
      </div>
    </details>
  </section>;
}

export function MonsterRanchCase() {
  return <>
    <Section number="01" label="项目定位" title="养殖与扩建">
      <p className="case-lead">玩家收容并饲养怪物，布置栏舍、员工空间和物资设施。出售怪物可以获得阶段收益；继续留养则需要承担成长后的空间、照料和收容要求。资源再投入建设，形成下一轮扩建。</p>
      <Still src="ranch-pen.png" alt="围栏内的怪物及门组成的初始栏舍实机画面" caption="初始栏舍与怪物：建造服务于怪物饲养。" />
      <Diagram kind="loop" alt="怪物出售或留养影响收益、风险与建设投入的经营循环" caption="经营目标：出售获得收益，或留养并承担更高需求与风险，再投入建设。" />
    </Section>

    <Section number="02" label="系统总览" title="建造系统" id="ranch-system">
      <p className="case-lead">这个项目希望玩家自己搭建养殖与自动化设施，而不是只放下一栋功能固定的建筑。我负责的建造系统分为规划、实际建造、区域划分：规划保存待执行方案，施工生成可用实体，区域为已建空间指定用途和权限。三者的结果共同交给养殖、员工与物流等运营系统。</p>
      <Diagram kind="structure" alt="规划、蓝图、实际建造、区域划分、空间检查及运营系统之间的完整关系图" caption="系统关系：蓝图位于规划与施工之间；区域用途与实体结构共同进入空间检查。" />
      <div className="mr-three"><div><strong>规划</strong><p>准备怎么建：目标、单件、位置、预览与蓝图。</p></div><div><strong>实际建造</strong><p>现场建成什么：材料、员工、施工与实体状态。</p></div><div><strong>区域划分</strong><p>空间如何使用：用途、权限与条件检查。</p></div></div>
    </Section>

    <Section number="03" label="规划系统" title="规划">
      <p className="case-lead">玩家选择目标与单件，查看占地、材料和前置条件，再调整位置、朝向并接受放置校验。通过校验后，方案可以暂存为蓝图，继续修改或确认开工。蓝图记录待执行的摆放结果，不表示建筑已经完工。</p>
      <Diagram kind="planning" alt="选择建造项目、查看依赖、预览占地、放置校验、暂存蓝图和确认开工的流程图" caption="规划流程：校验失败返回预览调整；确认开工后才交给实际建造。" />
      <div className="mr-still-pair"><Still src="placement-preview.png" alt="绿色放置预览展示单件的占地与可施工状态" caption="放置预览：确认占地与位置。" /><Still src="saved-blueprint.png" alt="蓝色地板单件组成暂存方案蓝图" caption="暂存蓝图：方案保留，尚未施工。" /></div>
    </Section>

    <Section number="04" label="实际建造" title="构件与施工">
      <p className="case-lead">地基、墙、围栏、门、道路和设施是可组合的建造对象。玩家可放置单件，或拖拽形成连续的墙与围栏；相邻构件更新外观，围合与通行则另行判断。部分物件要求地基先完工。开工后，施工队列继续检查材料、员工与施工位，遇到阻塞时显示具体原因。</p>
      <h3 className="mr-evidence-title">构件与前置条件</h3>
      <div className="mr-still-pair mr-still-pair-mixed"><Still src="dorm.png" alt="员工宿舍中两张床和围合墙体的实机局部" caption="完工示例：墙体与床位组成员工宿舍。" /><Still src="wall-prerequisite.png" alt="墙的建造卡片写有需已完成地基" caption="建造卡片：墙需要已完成地基。" compact /></div>
      <details className="mr-detail"><summary>查看建造目录</summary><div className="mr-detail-body"><p>目录按基础建材、功能家具和设备设施组织。单件可批量布置；多格物件的占地和更高围栏等级属于规则方案。</p><div className="mr-catalog-grid"><Still src="catalog-base.png" alt="基础建材中的地基和地板目录" caption="基础建材：地板、地基。" compact /><Still src="catalog-furniture.png" alt="单人床与上下铺的功能家具目录" caption="功能家具：床位与费用。" compact /><Still src="catalog-equipment.png" alt="设备设施中的储物点目录" caption="设备设施：储物点。" compact /></div></div></details>
      <h3 className="mr-evidence-title">施工流程</h3>
      <Diagram kind="construction" alt="确认方案进入施工队列、材料供应、员工施工，建成单件后参与邻接与功能判断的流程图" caption="规则方案：材料与员工完成施工后，建成单件分别更新外观、占地与通行状态。" />
    </Section>

    <Section number="05" label="区域划分" title="用途与条件">
      <p className="case-lead">玩家给空间指定栖息、仓储或员工等用途，也可以叠加通行和安全限制。指定用途后，还要检查围合、面积、设施与入口等条件。画出员工区不会自动建出宿舍；墙、门、设施或怪物占地变化时，区域状态需要重新检查。</p>
      <Still src="staff-zone.png" alt="在有墙和床位的房间里预览员工区范围，右侧区域管理面板选中员工区" caption="员工区划定预览：绿色格表示正在选择的范围；右侧面板显示员工区用途和条件提示。" />
      <Diagram kind="zones" alt="功能区域、管理权限、已建边界和设施共同进入区域检查，不满足时补建调整的完整流程图" caption="区域检查：条件不足或失效时，列出缺口并返回补建或调整。" />
    </Section>

    <Section number="06" label="跨系统影响" title="养殖与自动化">
      <p className="case-lead">建造系统提供空间、设施位置和可达条件，后续由物流、员工、怪物养殖和安全系统读取。例如，玩家规划原料存放区、处理设施与投喂点，再安排它们之间的通路和平面管线；设施能力与覆盖范围变化后，可以调整围栏和区域。这里呈现的是建造对自动化养殖的接口与设计目标。</p>
      <div className="mr-example"><strong>一次扩建</strong><p>怪物长大 → 调整围栏与区域范围 → 检查投喂设施和员工路线 → 补充材料、开工 → 重新检查收容与照料条件。</p></div>
      <Diagram kind="feedback" alt="已建建筑与区域用途共同改变空间和设施状态，并影响物流、员工、养殖、安全及下一轮规划的图" caption="经营反馈：成本与产出会产生下一轮改建与升级需求。" />
      <p className="mr-note">面试中提到的管线目前是初步的单层平面方案；多级生产链、垂直管道和完整自动化工厂不作为当前实机成果展示。</p>
    </Section>

    <Section number="07" label="结果与边界" title="当前进度">
      <p className="case-lead">当前实机画面展示了建造目录、放置与蓝图状态、部分构件、设施和区域划分操作。规划、施工依赖、区域检查及跨系统联动在页面中作为策划规则说明；自动化养殖的完整运行仍属于项目研发方向。</p>
    </Section>
  </>;
}
