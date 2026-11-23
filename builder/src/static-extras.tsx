import { Download, MessageSquare } from 'lucide-react';

const original = 'https://portfolio-2026.alene-lin.chatgpt.site';

export function StaticDemo() {
  return <div className="demo-download-panel" id="download-demo">
    <div><p className="material-kicker">可下载试玩 · Windows 64 位</p><h3>《叶舟》月岛远航 Demo</h3><p>当前压缩包未包含约 291 MB 的 Windows 安装文件。可前往原站下载。</p><span className="demo-build-meta">EXE · 约 291 MB · 试玩版</span></div>
    <div className="demo-download-actions"><div className="material-actions"><a className="primary-download" href={`${original}/media/demos/LeafboatMoonVoyageDemo-windows-x86_64.exe`} target="_blank" rel="noreferrer"><Download aria-hidden="true" />前往原站下载</a><a href="#demo-feedback"><MessageSquare aria-hidden="true" />留下试玩建议</a></div></div>
  </div>;
}

export function StaticFeedback() {
  return <section className="case-section feedback-section" id="demo-feedback">
    <div className="case-section-label"><p>试玩留言</p></div>
    <div className="evidence-content"><p className="material-kicker">反馈与建议</p><h2>试玩留言</h2><p className="case-lead">欢迎告诉我哪一步没看懂、哪个操作不顺手，或你希望增加的玩法。留言在原站公开展示。</p><a className="case-external-demo" href={`${original}/work/leafboat#demo-feedback`} target="_blank" rel="noreferrer"><MessageSquare aria-hidden="true" />打开留言板</a></div>
  </section>;
}
