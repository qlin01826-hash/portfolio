import { Download, Layers3, MessageSquare, Play, ListChecks } from "lucide-react";

export function LeafboatActions() {
  return <nav className="material-actions" aria-label="叶舟项目材料">
    <a href="#download-demo"><Download aria-hidden="true" />下载 Windows Demo</a>
    <a href="#project-demo"><Play aria-hidden="true" />观看实机演示</a>
    <a href="#system-design"><Layers3 aria-hidden="true" />系统与规则</a>
    <a href="#player-feedback"><ListChecks aria-hidden="true" />三轮试玩迭代</a>
    <a href="#demo-feedback"><MessageSquare aria-hidden="true" />试玩留言</a>
  </nav>;
}
