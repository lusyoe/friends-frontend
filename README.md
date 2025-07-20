# Friends 前端项目

本项目是基于 [Next.js](https://nextjs.org) 构建的前端应用，主要用于展示“朋友动态”——聚合展示各个站点的最新文章和信息。

# 相关项目
- [Friends 后端接口](https://github.com/lusyoe/friends-api)
- [Friends 定时任务](https://github.com/lusyoe/friends-rss-fetch)

[博客地址-青萍叙事](https://blog.lusyoe.com)

## 功能简介

- 聚合展示多个站点的最新文章，按时间轴分组显示。
- 支持响应式设计，移动端和桌面端均有良好体验。
- 通过接口实时获取站点及文章数据。
- 使用 [Geist](https://vercel.com/font) 字体，界面美观现代。
- 支持 Docker 一键部署，内置 Nginx 静态服务。

## 目录结构

- `app/`：页面与全局样式
  - `page.tsx`：主页面，动态渲染站点与文章
  - `layout.tsx`：全局布局
  - `globals.css`：全局样式
- `components/`：可复用组件
  - `ThemeProvider.tsx`：主题切换支持
- `public/`：静态资源（SVG 图标等）
- `Dockerfile`、`nginx.conf`：Docker/Nginx 部署相关文件

## 环境变量配置

项目支持通过环境变量自定义接口地址等参数。请在项目根目录下创建 `.env` 文件，内容示例如下：

```env
NEXT_PUBLIC_API_BASE_URL=http://friends.luhome.com
```

- `NEXT_PUBLIC_API_BASE_URL`：前端请求 API 的基础地址，需与后端服务地址保持一致。该变量以 `NEXT_PUBLIC_` 开头，表示会暴露到浏览器端，供前端代码使用。

如需修改接口地址，请根据实际部署环境调整该变量。

## 快速开始

### 本地开发

1. 安装依赖

   ```bash
   yarn install
   # 或
   npm install
   ```

2. 启动开发服务器

   ```bash
   yarn dev
   # 或
   npm run dev
   ```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建与生产部署

```bash
yarn build
yarn start
# 或
npm run build
npm start
```

### Docker 部署

1. 构建静态文件

   ```bash
   yarn build
   yarn export
   # 或
   npm run build
   npm run export
   ```

2. 构建并运行 Docker 镜像

   ```bash
   docker build -t friends-frontend .
   docker run -d -p 80:80 friends-frontend
   ```

Docker 镜像基于自定义 Nginx，静态文件位于 `/usr/share/nginx/html/`，端口为 80。

## 依赖技术

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [dayjs](https://day.js.org/)（日期处理）
- [Tailwind CSS 4](https://tailwindcss.com/)（原子化 CSS）
- TypeScript

## 接口说明

主页面通过 `http://<NEXT_PUBLIC_API_BASE_URL>/api/sites` 获取站点及文章数据，需后端支持对应 API。

## 其他

- 如需自定义 Nginx 配置，请修改 `nginx.conf`。
- 静态资源请放置于 `public/` 目录。
