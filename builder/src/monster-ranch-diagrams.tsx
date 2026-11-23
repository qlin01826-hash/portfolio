type Box = { x: number; y: number; w: number; h?: number; lines: string[]; faint?: boolean };
type Tag = { x: number; y: number; text: string };
type FlowData = { width: number; height: number; boxes: Box[]; paths: string[]; tags?: Tag[] };

const flows: Record<string, FlowData> = {
  loop: {
    width: 1040, height: 285,
    boxes: [
      { x: 24, y: 118, w: 135, lines: ["出售或留养"], faint: true },
      { x: 256, y: 42, w: 158, lines: ["获得集中收益"] },
      { x: 256, y: 198, w: 158, lines: ["承担更高需求与风险"] },
      { x: 505, y: 120, w: 150, lines: ["投资建设"] },
      { x: 743, y: 42, w: 135, lines: ["引入怪物"] },
      { x: 863, y: 120, w: 150, lines: ["养殖与产出"] },
    ],
    paths: [
      "M159 144 H205 V68 H256", "M159 144 H205 V224 H256", "M414 68 H460 V146 H505", "M414 224 H460 V146 H505",
      "M655 146 H863", "M878 68 H938 V120", "M938 120 V16 H170 V144 H159",
    ],
    tags: [{ x: 207, y: 42, text: "出售" }, { x: 207, y: 198, text: "留养" }],
  },
  structure: {
    width: 1130, height: 310,
    boxes: [
      { x: 20, y: 96, w: 190, lines: ["规划系统", "选择、摆放、预览"] },
      { x: 264, y: 96, w: 170, lines: ["暂存方案／蓝图"] },
      { x: 507, y: 96, w: 190, lines: ["实际建造", "材料、员工、施工"] },
      { x: 507, y: 218, w: 190, lines: ["区域划分", "用途与权限"] },
      { x: 746, y: 157, w: 130, lines: ["空间检查"] },
      { x: 924, y: 143, w: 185, h: 76, lines: ["养殖、员工、物流、安全", "等运营系统"] },
    ],
    paths: [
      "M210 128 H264", "M434 128 H507", "M697 128 H720 V188 H746", "M697 250 H720 V188 H746", "M876 188 H924",
      "M1016 143 V38 H117 V96",
    ],
    tags: [{ x: 470, y: 94, text: "确认开工" }, { x: 666, y: 38, text: "扩建与改造需求" }],
  },
  planning: {
    width: 1130, height: 365,
    boxes: [
      { x: 25, y: 35, w: 152, lines: ["选择建造项目"] },
      { x: 215, y: 35, w: 170, lines: ["查看依赖与缺口"] },
      { x: 420, y: 35, w: 125, lines: ["选择单件"] },
      { x: 620, y: 116, w: 205, h: 76, lines: ["占地、朝向、费用", "与前置预览"] },
      { x: 905, y: 123, w: 152, lines: ["放置校验"], faint: true },
      { x: 430, y: 264, w: 175, lines: ["暂存方案／蓝图"] },
      { x: 750, y: 264, w: 170, lines: ["交付实际建造"] },
    ],
    paths: [
      "M177 65 H215", "M385 65 H420", "M545 65 H580 V154 H620", "M825 154 H905",
      "M981 123 V75 H722 V116", "M981 185 V233 H517 V264", "M605 295 H750", "M517 264 V220 H722 V192",
    ],
    tags: [{ x: 858, y: 76, text: "不通过" }, { x: 812, y: 234, text: "通过" }, { x: 631, y: 221, text: "修改或取消" }, { x: 679, y: 295, text: "确认开工" }],
  },
  construction: {
    width: 1180, height: 310,
    boxes: [
      { x: 18, y: 77, w: 155, lines: ["确认的建造方案"] },
      { x: 204, y: 77, w: 133, lines: ["施工队列"] },
      { x: 367, y: 77, w: 133, lines: ["材料供应"] },
      { x: 531, y: 77, w: 150, lines: ["员工搬运与施工"] },
      { x: 711, y: 77, w: 130, lines: ["建成单件"] },
      { x: 866, y: 156, w: 155, lines: ["维修、升级或拆除"] },
      { x: 1033, y: 45, w: 140, lines: ["邻接外观重组"] },
      { x: 982, y: 239, w: 190, lines: ["占地、边界、通行", "与设施功能"] },
    ],
    paths: [
      "M173 108 H204", "M337 108 H367", "M500 108 H531", "M681 108 H711", "M841 108 H1033",
      "M841 108 H852 V186 H866", "M1021 186 H1080 V76 H1033", "M1021 186 H1080 V239", "M841 108 H924 V270 H982",
    ],
  },
  zones: {
    width: 1130, height: 394,
    boxes: [
      { x: 24, y: 35, w: 155, lines: ["划定功能区域"] },
      { x: 235, y: 35, w: 155, lines: ["叠加管理权限"] },
      { x: 24, y: 151, w: 155, lines: ["已建边界、门与设施"] },
      { x: 235, y: 151, w: 155, lines: ["空间识别"] },
      { x: 24, y: 273, w: 180, lines: ["列出缺口与修复位置"] },
      { x: 250, y: 273, w: 178, lines: ["补建、改道或调整区域"] },
      { x: 494, y: 151, w: 155, lines: ["区域条件检查"] },
      { x: 710, y: 151, w: 135, lines: ["区域状态"], faint: true },
      { x: 912, y: 151, w: 194, lines: ["提供养殖或工作能力"] },
    ],
    paths: [
      "M179 66 H235", "M390 66 H446 V181 H494", "M179 181 H235", "M390 181 H494", "M204 304 H250", "M428 304 H462 V181 H494",
      "M649 181 H710", "M845 181 H912", "M776 211 V353 H113 V304 H24",
    ],
    tags: [{ x: 878, y: 145, text: "可用" }, { x: 615, y: 354, text: "条件不足／失效" }],
  },
  feedback: {
    width: 1050, height: 278,
    boxes: [
      { x: 24, y: 45, w: 135, lines: ["已建建筑"] },
      { x: 24, y: 167, w: 135, lines: ["区域用途与权限"] },
      { x: 211, y: 106, w: 170, lines: ["空间与设施状态"] },
      { x: 435, y: 45, w: 170, lines: ["物流与员工工作"] },
      { x: 435, y: 167, w: 170, lines: ["养殖与安全"] },
      { x: 655, y: 106, w: 165, lines: ["成本与产出反馈"] },
      { x: 860, y: 106, w: 166, lines: ["下一轮规划、", "改建与升级"] },
    ],
    paths: [
      "M159 76 H183 V136 H211", "M159 198 H183 V136 H211", "M381 136 H409 V76 H435", "M381 136 H409 V198 H435",
      "M605 76 H630 V136 H655", "M605 198 H630 V136 H655", "M820 136 H860",
    ],
  },
};

export type RanchFlow = keyof typeof flows;

export function MonsterRanchFlow({ kind, title }: { kind: RanchFlow; title: string }) {
  const flow = flows[kind];
  const marker = `mr-arrow-${kind}`;
  return <svg className="mr-flow-svg" viewBox={`0 0 ${flow.width} ${flow.height}`} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <defs><marker id={marker} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 L7 4 L1 7" fill="none" stroke="#a1adb2" strokeWidth="1.1" /></marker></defs>
    <rect width={flow.width} height={flow.height} fill="#0b0c0d" />
    {flow.paths.map((d, i) => <path key={i} d={d} fill="none" stroke="#829197" strokeWidth="1.5" strokeLinejoin="round" markerEnd={`url(#${marker})`} />)}
    {flow.boxes.map((b, i) => {
      const h = b.h ?? 62;
      return <g key={i}><rect x={b.x} y={b.y} width={b.w} height={h} rx="14" fill={b.faint ? "#131c21" : "#213039"} stroke={b.faint ? "#61737d" : "#526b78"} strokeWidth="1.2" strokeDasharray={b.faint ? "3 3" : undefined} />
        <text x={b.x + b.w / 2} y={b.y + h / 2 - (b.lines.length - 1) * 10} textAnchor="middle" dominantBaseline="middle" fill="#edf2f3" fontSize="15" fontWeight="600">{b.lines.map((line, j) => <tspan key={j} x={b.x + b.w / 2} dy={j ? 20 : 0}>{line}</tspan>)}</text></g>;
    })}
    {flow.tags?.map((tag, i) => <g key={i}><rect x={tag.x - tag.text.length * 7 - 10} y={tag.y - 15} width={tag.text.length * 14 + 20} height="30" rx="15" fill="#17242b" stroke="#5f7783" /><text x={tag.x} y={tag.y} dominantBaseline="middle" textAnchor="middle" fill="#e5eef1" fontSize="13" fontWeight="600">{tag.text}</text></g>)}
  </svg>;
}
