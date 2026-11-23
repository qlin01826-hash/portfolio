// The user's original diagram definition. Both preview and expanded view render this verbatim.
export const leafboatSystemFlow = `flowchart TD
    A["蛛丝操作<br/>吐丝连接、收丝牵引"]
    B["资源获取<br/>拉近水面上的食物"]
    C["生存状态<br/>饱食度支持持续吐丝"]
    D["叶舟搭建与航行<br/>连接叶片，调整漂浮结构"]
    E["环境与生物<br/>水流、漂浮物、鱼"]

    A --> B
    B --> C
    C --> A
    A --> D
    D -->|"移动到新的位置"| B
    E -->|"影响移动与资源获取"| D
    E -->|"可能争抢食物"| B`;

// Approved rule loop: gameplay mechanics only; testing and iteration stay in their own section.
export const leafboatRuleFlow = `flowchart TD
    R["基础规则<br/>吐丝建立连接，收丝拉动物体"]:::core
    S["状态变化<br/>物体位置、连接关系与整体运动状态"]

    R --> S

    subgraph RES["资源与生存"]
        direction TB
        A["食物被拉近"]
        B["获取食物，补充饱食度<br/>支持后续吐丝"]
        A -->|"成功获取后"| B
    end

    subgraph ECO["水域生态"]
        direction TB
        C["鱼可能靠近争抢<br/>影响食物获取"]
    end

    subgraph BUILD["叶舟搭建"]
        direction TB
        D["叶片接入连接体<br/>连接关系与结构变化"]
    end

    subgraph MOVE["水面航行"]
        direction TB
        F["连接体结构与整体重量变化"]
        G["牵引与航行结果变化"]
        F --> G
    end

    S --> A
    S --> D
    A --> C
    D --> F

    I["状态反馈与操作选择<br/>根据当前状态调整目标、连接与收丝方式"]
    B --> I
    C --> I
    G --> I
    I -->|"当前状态与操作进入下一轮判定"| R

    classDef default fill:#191b1d,color:#eeeeeb,stroke:#858580
    classDef core fill:#f1f1ee,color:#101214,stroke:#858580,stroke-width:3px
    style RES fill:#101214,stroke:#64645f,color:#b8b8b4
    style ECO fill:#101214,stroke:#64645f,color:#b8b8b4
    style BUILD fill:#101214,stroke:#64645f,color:#b8b8b4
    style MOVE fill:#101214,stroke:#64645f,color:#b8b8b4
    linkStyle default stroke:#858580,stroke-width:1.5px`;

export const leafboatIterationFlow = `flowchart TD
    A["第三轮试玩<br/>玩家连续连接叶片，直接走向目的地"]
    B["发现的问题<br/>叶片持续刷新、分布稳定<br/>航行的必要性降低"]
    C["希望保留的体验<br/>玩家用连接规则创造新的移动方式"]
    D["后续调整思路<br/>让不同区域具有不同的叶片分布"]
    E["叶片密集区<br/>连接叶片，搭建基地"]
    F["叶片稀疏区<br/>拆出部分叶舟，航行穿越"]

    A --> B
    A --> C
    B --> D
    C --> D
    D --> E
    D --> F`;
