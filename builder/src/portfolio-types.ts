export type ProjectCategory = "系统设计" | "玩法策划" | "关卡设计" | "叙事设计" | "交互工具" | "空间体验";
export type ProjectGroup = "游戏" | "严肃游戏" | "游戏化平台";

export type PortfolioProject = {
  id: string;
  title: string;
  tagline: string;
  group: ProjectGroup;
  category: ProjectCategory;
  year: string;
  summary: string;
  progress: string;
  demoDescription: string;
  demoDuration: string;
  role: string;
  tools: string;
  coverUrl: string;
  videoUrl: string;
  projectUrl: string;
  accent: string;
  layout: "wide" | "portrait";
};

export type PortfolioData = {
  name: string;
  intro: string;
  location: string;
  availability: string;
  email: string;
  projects: PortfolioProject[];
};
