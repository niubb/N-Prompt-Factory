## Context

目前 `.trae/skills/` 目录下有 7 个独立的 skill 目录，每个都包含 `SKILL.md`。用户希望创建一个统一的 HTML 索引页面，方便浏览和发现所有 skills。

## Goals / Non-Goals

**Goals:**
- 创建单个 `index.html` 文件作为 skills 入口页面
- 展示所有 skills 的名称和描述
- 提供跳转到具体 skill 的链接
- 视觉上美观、现代化
- 响应式布局，适配桌面和移动端

**Non-Goals:**
- 不需要动态加载（skills 数量有限，可静态编写）
- 不需要后端服务
- 不修改现有 skill 内容

## Decisions

### 1. 单文件 HTML 方案
采用纯 HTML + 内联 CSS 的方式，所有样式内联在 `<style>` 标签中，便于部署和迁移。

**Alternatives considered:**
- 外部 CSS 文件：需要维护额外文件，增加复杂度
- React/Vue SPA：过度工程化

### 2. 网格布局
使用 CSS Grid 实现技能卡片的响应式布局。

**Alternatives considered:**
- Flexbox：Grid 更适合规则的双向布局
- 纯 CSS 框架（如 Tailwind）：增加依赖

### 3. 技能数据硬编码
由于 skills 数量有限且稳定，直接在 HTML 中硬编码技能列表。

**Alternatives considered:**
- JS 动态读取目录：需要额外工具或后端

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| 后续添加新 skill 需要手动更新 index | 维护成本低，可接受 |
| 样式可能与主项目不一致 | 参考现有 UI 风格设计 |

## Open Questions

- 是否需要搜索/过滤功能？（建议 v1 先不加，保持简单）
