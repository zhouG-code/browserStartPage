# 极简起始页

一个干净、流畅、高度可定制的浏览器起始页，融合现代设计语言与动态视频背景。

## ✨ 功能特点

- **动态视频背景**：支持 MP4 格式，自动循环播放，打造沉浸式体验。
- **实时时钟**：支持数码与 Pixel 风格模拟时钟，一键切换。
- **智能搜索**：集成 Google 搜索，输入关键词后点击按钮或按回车即可跳转。
- **快捷链接**：预设常用网站，可自由增删修改。
- **实时天气**：根据 IP 自动定位，显示当前天气与温度。
- **名言展示**：可自定义励志文字与字体。
- **毛玻璃效果**：半透明卡片 + 背景模糊，提升视觉层次。
- **完全响应式**：适配各种屏幕尺寸，居中布局，横竖屏均可正常显示。

## 🛠️ 技术栈

- HTML5
- CSS3 (Flexbox, 毛玻璃效果, 自定义字体)
- JavaScript (ES6, Canvas, fetch API)
- 天气数据：[Open-Meteo](https://open-meteo.com/) 免费 API

## 📁 项目结构

.
├── page.html # 主页面
├── style.css # 样式文件
├── script.js # 交互逻辑
├── bg.mp4 # 背景视频（需自行添加）
├── font/ # 自定义字体文件夹
│ └── 15906.ttf
└── README.md
text


## 🚀 快速开始

1. **克隆仓库**
   ```bash
   git clone https://github.com/zhouG-code/browserStartPage.git
   cd browserStartPage

    打开项目
    直接用浏览器打开 page.html 即可使用。

    自定义

        替换 bg.mp4 为你喜欢的视频背景。

        修改 page.html 中的快捷链接和名言内容。

        在 style.css 中调整配色、字体、毛玻璃透明度等样式。

⚙️ 自定义配置
更换背景视频

将你的 .mp4 文件命名为 bg.mp4 并放在根目录，或在 page.html 中修改 <source> 标签的 src 属性。
修改快捷链接

编辑 page.html 中 class="links-area" 的 <div> 部分：
html

<a href="你的网址" class="link-item" target="_blank">链接名称</a>

调整毛玻璃透明度

在 style.css 中找到 .main-container 规则，修改 background-color 的 rgba 最后一个参数（0.05 为透明度）：
css

background-color: rgba(255, 255, 255, 0.05);

更换搜索引擎

在 script.js 中将 https://www.google.com/search?q= 替换为其他搜索引擎的搜索 URL（如百度：https://www.baidu.com/s?wd=）。
自定义字体

将字体文件放入 font/ 文件夹，并在 style.css 的 @font-face 中修改路径和字体名称。
📄 许可证

本项目采用 MIT License 开源协议，你可以自由使用、修改和分发。