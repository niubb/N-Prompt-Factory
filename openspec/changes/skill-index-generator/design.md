## Context

现有的 `.trae/skills/index.html` 是静态手写的，当 skill 增删或描述变更时需要手动同步。目标是用构建脚本自动生成，保持与文件系统同步。

## Goals / Non-Goals

**Goals:**
- Node.js 脚本读取 `.trae/skills/*/SKILL.md`
- 解析 frontmatter（name, description）
- 生成静态 HTML 文件到 `.trae/skills/index.html`
- 保持输出样式与现有 index 一致
- 零依赖，使用 Node.js 原生模块

**Non-Goals:**
- 不做运行时动态加载（需要服务器）
- 不生成其他格式（只生成 HTML）
- 不做 hot reload

## Decisions

### 1. 使用原生 Node.js 而非第三方库
采用 `fs.readdirSync` + `fs.readFileSync` 读取文件，正则解析 frontmatter。

**Alternatives considered:**
- gray-matter 库：需要 npm install，增加依赖
- js-yaml 库：同上

### 2. frontmatter 解析简单实现
每个 SKILL.md 开头格式固定：
```yaml
---
name: "skill-name"
description: "description text"
---
```

使用正则 `^---\n([\s\S]*?)\n---` 提取 frontmatter 块，再用 `name: "(.*)"` 和 `description: "(.*)"` 提取字段。

**Alternatives considered:**
- 完整 YAML 解析器：过度工程化，格式简单不需要

### 3. HTML 模板内联在脚本中
将现有 index.html 的 CSS 和 HTML 结构作为模板字符串放在脚本中，动态填充 skills 数据。

**Alternatives considered:**
- 独立模板文件：增加文件复杂度
- Handlebars/EJS：增加模板引擎依赖

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| frontmatter 格式不标准导致解析失败 | 脚本添加错误处理，跳过格式错误的文件并 warn |
| 生成的 HTML 与手写版本有差异 | 基于现有 index.html 的样式，确保一致 |

## Migration Plan

1. 创建 `scripts/generate-skill-index.mjs`
2. 在 package.json 添加 `"generate:skill-index": "node scripts/generate-skill-index.mjs"`
3. 运行脚本生成新的 index.html
4. 验证输出与预期一致
5. 后续添加/修改 skill 后运行 `npm run generate:skill-index`
