## Why

当前的 `index.html` 是静态硬编码的，当 skills 目录中的 SKILL.md 文件新增、修改或删除时，索引页面不会自动同步。需要手动维护，容易导致不一致。

## What Changes

- 新增 `scripts/generate-skill-index.mjs` 脚本
- 脚本读取 `.trae/skills/*/SKILL.md` 文件，解析 frontmatter 中的 name 和 description
- 自动生成 `.trae/skills/index.html`
- 在 package.json 中添加 `generate:skill-index` 脚本
- 修改现有的 static index.html 为模板驱动的生成模式

## Capabilities

### New Capabilities
- `skill-index-generator`: 提供一个 Node.js 脚本，根据实际 SKILL.md 文件自动生成索引页面

### Modified Capabilities
- `skill-index-html`: 更新为模板化生成模式，非手写静态内容

## Impact

- 新增文件：`scripts/generate-skill-index.mjs`
- 修改文件：`.trae/skills/index.html`（由脚本生成）、`package.json`（添加 generate 脚本）
- 依赖：Node.js 原生模块（fs, path），无需额外安装包
