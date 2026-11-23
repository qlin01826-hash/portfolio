# 李琬欣 · 作品集静态版

首页和六个完整案例均为静态页面。直接双击 `index.html` 即可打开；部署在 GitHub Pages 时，从仓库根目录发布 `main` 分支。

首页项目目录跳转到对应项目；“查看完整案例”在同一个静态页面中打开详细案例。叶舟保留原始系统关系图、规则联动图和三轮试玩记录；怪兽养殖场保留六张完整流程图及实机证据。视频文件随仓库提供。玛雅演示是外部 YouTube 链接。

Windows Demo 安装包约 291 MB，未包含在此仓库；试玩留言使用原作品集网站的留言板，两个入口会跳往原站。

## 修改和重建

项目源码位于 `builder/`，资源位于仓库根目录的 `media/`。本地重建：

```sh
cd builder
npm ci
mkdir -p public
cp -a ../media public/media
npm run build
cp -a dist/. ../
```

构建输出使用经典脚本，可从 `file://` 打开；GitHub Pages 不需要服务器端运行环境。
