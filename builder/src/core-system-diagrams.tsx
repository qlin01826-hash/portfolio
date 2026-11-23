type CoreSystemKind = "maya" | "academy-mist" | "bamiyan";

function Card({ title, detail, core = false }: { title: string; detail?: string; core?: boolean }) {
  return <div className={`cs-card${core ? " core" : ""}`}><strong>{title}</strong>{detail && <small>{detail}</small>}</div>;
}

function Arrow({ label }: { label?: string }) {
  return <div className="cs-arrow" aria-hidden="true">{label && <span>{label}</span>}<b>↓</b></div>;
}

function MayaDiagram() {
  return <div className="core-system-diagram maya-system-diagram" role="img" aria-label="地图可视化状态与任务引导互相更新的关卡系统图">
    <section className="cs-lane"><h4>地图可视化</h4><div className="cs-row three"><Card title="空间分区" detail="室内遗迹 · 雨林 · 神殿" /><i>→</i><Card title="通路与门状态" detail="未开放 · 可进入" /><i>→</i><Card title="解谜点状态" detail="未发现 · 进行中 · 完成" core /></div></section>
    <Arrow label="读取地图状态" />
    <section className="cs-lane"><h4>任务引导</h4><div className="cs-row four"><Card title="当前目标" detail="目标点 · 所需条件" core /><i>→</i><Card title="到达目标点" detail="移动与观察" /><i>→</i><Card title="执行交互" detail="机关 · 线索 · 供品" /><i>→</i><Card title="条件校验" detail="通过 / 未通过" core /></div></section>
    <div className="cs-result-pair"><article><span>未通过</span><strong>保留目标</strong><p>指出缺失线索，返回当前任务。</p></article><article className="success"><span>通过</span><strong>更新地图与任务</strong><p>开放通路，更新点位，并生成下一目标。</p></article></div>
  </div>;
}

function AcademyDiagram() {
  return <div className="core-system-diagram academy-system-diagram" role="img" aria-label="选择写入多类持续状态并通过条件组合开放多条剧情分支的叙事系统图">
    <div className="cs-row two compact"><Card title="当前场景与任务节点" /><i>→</i><Card title="玩家对话或行动选择" core /></div>
    <Arrow label="写入持续状态" />
    <section className="cs-lane"><h4>状态记录</h4><div className="cs-row three no-arrows"><Card title="任务状态" detail="接受 · 进行 · 完成 · 保留" /><Card title="人物状态" detail="立场 · 信任 · 关系变化" /><Card title="信息与世界状态" detail="已知线索 · 已触发事件" /></div></section>
    <Arrow label="任务 × 人物 × 信息" />
    <div className="cs-condition">条件组合检查</div>
    <div className="cs-branch-grid"><Card title="主任务事件" core /><Card title="人物专属分支" core /><Card title="信息与秘密分支" core /><Card title="条件不足" detail="分支保持隐藏" /></div>
    <div className="cs-converge"><span>分支推进或汇合</span><b>↓</b></div>
    <div className="cs-row two compact"><Card title="下一场景或汇合节点" /><i>→</i><Card title="写入新状态并继续" core /></div>
  </div>;
}

function BamiyanDiagram() {
  return <div className="core-system-diagram bamiyan-system-diagram" role="img" aria-label="从资料与空间复原到关卡组织玩家行动和遗产理解的完整项目系统图">
    <section className="cs-lane"><h4>复原依据</h4><div className="cs-row two compact"><Card title="测绘 · 影像 · 历史资料" /><i>→</i><Card title="佛龛与洞窟三维模型" core /></div></section>
    <Arrow label="提取真实空间关系" />
    <section className="cs-lane"><h4>关卡组织</h4><div className="cs-row three"><Card title="空间特征" detail="洞口 · 高差 · 尺度 · 采光" /><i>→</i><Card title="探索路线" detail="入口 · 狭道 · 洞窟 · 高处平台" /><i>→</i><Card title="环境引导" detail="方向线索 · 停留节点" core /></div></section>
    <Arrow label="转化为玩家经历" />
    <section className="cs-lane"><h4>体验结果</h4><div className="cs-row three"><Card title="玩家行动" detail="移动 · 俯身 · 观察 · 收集" /><i>→</i><Card title="空间与叙事反馈" core /><i>→</i><Card title="遗产理解" detail="洞窟关系 · 历史场景" core /></div></section>
    <div className="cs-feedback"><span>试玩与展览反馈</span><strong>返回路线组织与环境引导继续调整</strong></div>
  </div>;
}

export function CoreSystemDiagram({ kind }: { kind: CoreSystemKind }) {
  if (kind === "maya") return <MayaDiagram />;
  if (kind === "academy-mist") return <AcademyDiagram />;
  return <BamiyanDiagram />;
}
