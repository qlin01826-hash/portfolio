import type { PortfolioData } from "./portfolio-types";
export const defaultPortfolio: PortfolioData = {
  name: "李琬欣",
  intro: "让一切自然发生！",
  location: "",
  availability: "游戏系统策划 · 2027 届硕士",
  email: "wli083@connect.hkust-gz.edu.cn",
  projects: [
    { id: "leafboat", title: "叶舟", tagline: "水上生存建造冒险游戏", group: "游戏", category: "系统设计", year: "2026", summary: "《叶舟》是一款水上生存建造冒险游戏。玩家操纵蜘蛛收放蛛丝、调整锚点，并借助牵引改变船只航向；探索中获得的资源用于维持补给与扩建叶舟。系统设计重点是让“连接”同时作用于移动、采集与建造，使几个循环自然衔接。", progress: "独立完成可玩原型，持续补充生态与建造内容", demoDescription: "展示蛛丝牵引、船体移动、水上探索与资源获取的完整玩法流程。", demoDuration: "03:55", role: "系统策划 · 独立开发", tools: "Godot", coverUrl: "./media/media/covers/leafboat.jpg", videoUrl: "./media/media/videos/leafboat.mp4", projectUrl: "", accent: "#f2f2f0", layout: "wide" },
    { id: "maya", title: "探寻玛雅", tagline: "虚拟现实遗迹探索与解谜", group: "游戏", category: "玩法策划", year: "2025", summary: "第一章在遗迹室内设置阵列、壁画、三层密码门和金币柜子。玩家触发阵列、拼合图腾、读取壁画密码后开门；后续章节进入雨林与神殿，围绕棺椁、祖灵、供品和祭坛设计探索路线。", progress: "完成三章关卡、地图与解密点设计；提供外部演示", demoDescription: "外部视频展示遗迹探索与场景交互；页面包含地图和关卡方案。", demoDuration: "外部视频", role: "玩法策划 · 关卡设计", tools: "Unity", coverUrl: "./media/media/covers/maya.jpg", videoUrl: "", projectUrl: "https://www.youtube.com/watch?v=iSy3k8JeMlQ&t=74s", accent: "#f2f2f0", layout: "portrait" },
    { id: "academy-mist", title: "学院迷雾", tagline: "水墨风格 RPG 互动叙事", group: "游戏", category: "玩法策划", year: "2024", summary: "第一幕可玩演示包含学院委托、接受或暂不接受任务、竹林相遇与角色对话。原章节表继续规划人物回应等选择节点，以任务、人物和已知信息组织后续剧情；页面明确区分实机与长线方案。", progress: "完成第一幕可玩演示；后续多线结构为策划方案", demoDescription: "展示任务选择、竹林对话与场景切换。", demoDuration: "02:21", role: "叙事策划 · 玩法设计", tools: "Unity", coverUrl: "./media/media/covers/academy-cover.jpg", videoUrl: "./media/media/videos/academy-mist.mp4", projectUrl: "", accent: "#f2f2f0", layout: "wide" },
    { id: "monster-ranch", title: "怪兽养殖建造", tagline: "怪物养殖与园区经营 · 建造系统", group: "游戏", category: "系统设计", year: "2026", summary: "玩家从地基、围栏、门和设施等构件出发，自行组织怪物栏舍与工作空间，再划定用途、安排员工与物资流转。我在四人团队中负责建造系统的策划与功能实现，梳理规划、施工和区域划分的规则，让建造结果支撑后续养殖与自动化经营。", progress: "研发中 · 建造目录与区域操作已有实机画面", demoDescription: "当前页面展示建造系统方案与实机画面。", demoDuration: "", role: "建造系统策划与开发 · 腾讯光子实习", tools: "Godot · 系统规则 · 功能实现", coverUrl: "./media/media/covers/monster-ranch-cover.png", videoUrl: "", projectUrl: "", accent: "#f2f2f0", layout: "portrait" },
    { id: "bamiyan", title: "巴米扬虚拟现实体验", tagline: "洞窟复原与关卡引导", group: "严肃游戏", category: "空间体验", year: "2025", summary: "基于测绘、影像和历史资料重建东大佛周边洞窟。玩家沿高差前进，通过通道宽窄、采光、可见目标与烛火交互寻找路线；每个节点对应具体的引导线索、行动和反馈。", progress: "完成空间复原与关卡体验设计", demoDescription: "暂无公开演示；页面展示空间复原、关卡路线与体验画面。", demoDuration: "暂无", role: "空间研究 · 关卡引导与虚拟现实体验设计", tools: "Unity", coverUrl: "./media/media/covers/bamiyan.jpg", videoUrl: "", projectUrl: "", accent: "#f2f2f0", layout: "portrait" },
    { id: "archeditor", title: "ArchEditor", tagline: "三维体块约束的 AI 建筑创作工具", group: "游戏化平台", category: "交互工具", year: "2024", summary: "使用者在 Unity 中编辑场地和三维体块，输出选定视角的深度图并交给生成端。ControlNet 以深度图约束空间结构，Stable Diffusion 结合文字提示生成方案图；生成结果再与体块轮廓和位置对照。", progress: "完成体块编辑原型与深度约束生成链路", demoDescription: "现有演示视频展示 Unity 编辑端：场地边界、体块放置、参数调整与局部变形。", demoDuration: "01:04", role: "系统设计 · 交互设计 · 开发", tools: "Unity · C# · Stable Diffusion · ControlNet", coverUrl: "./media/media/covers/archeditor-cover.jpg", videoUrl: "./media/media/videos/archeditor.mp4", projectUrl: "", accent: "#f2f2f0", layout: "wide" },
  ],
};

