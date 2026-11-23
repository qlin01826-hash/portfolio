export const mayaGuidanceFlow = `flowchart TD
  subgraph MAP["地图可视化"]
    direction LR
    A["空间分区<br/>室内遗迹 · 雨林 · 神殿"] --> B["通路与门状态<br/>未开放 · 可进入"]
    B --> C["解谜点状态<br/>未发现 · 进行中 · 完成"]
  end
  subgraph TASK["任务引导"]
    direction LR
    D["读取当前地图状态"] --> E["生成当前目标<br/>目标点 · 所需条件"]
    E --> F["玩家到达并交互"]
    F --> G{"条件是否满足？"}
  end
  C --> D
  G -->|完成| H["更新点位、通路与下一目标"]
  H --> B
  G -->|未完成| I["保留目标<br/>反馈缺失线索"]
  I --> E
  classDef core fill:#25332d,stroke:#b5cdbb,color:#f0f3ef;
  class C,D,E,H core;`;

export const academyNarrativeFlow = `flowchart TD
  A["当前场景与任务节点"] --> B["玩家对话或行动选择"]
  B --> T["任务状态<br/>接受 · 进行 · 完成 · 保留"]
  B --> R["人物状态<br/>立场 · 信任 · 关系变化"]
  B --> K["信息与世界状态<br/>已知线索 · 已触发事件"]
  T --> C["条件组合检查<br/>任务 × 人物 × 信息"]
  R --> C
  K --> C
  C --> M["主任务事件"]
  C --> P["人物专属分支"]
  C --> S["信息与秘密分支"]
  C -.-> L["条件不足<br/>分支保持隐藏"]
  M --> N["下一场景或汇合节点"]
  P --> N
  S --> N
  N --> W["写入持续状态"]
  W --> A
  classDef core fill:#25332d,stroke:#b5cdbb,color:#f0f3ef;
  class B,C,N,W core;`;

export const bamiyanProjectFlow = `flowchart TD
  subgraph BASIS["复原依据"]
    direction LR
    A["测绘 · 影像 · 历史资料"] --> B["佛龛与洞窟<br/>三维空间模型"]
  end
  subgraph LEVEL["关卡组织"]
    direction LR
    C["提取空间特征<br/>洞口 · 高差 · 尺度 · 采光"] --> D["组织探索路线<br/>入口 · 狭道 · 洞窟 · 高处平台"]
    D --> E["布置环境引导<br/>方向线索 · 停留节点"]
  end
  subgraph EXPERIENCE["体验结果"]
    direction LR
    F["玩家行动<br/>移动 · 俯身 · 观察 · 收集"] --> G["空间与叙事反馈"]
    G --> H["理解洞窟关系与遗产场景"]
  end
  B --> C
  E --> F
  I["试玩与展览反馈"] --> C
  I --> E
  classDef core fill:#25332d,stroke:#b5cdbb,color:#f0f3ef;
  class B,C,E,G,H core;`;
