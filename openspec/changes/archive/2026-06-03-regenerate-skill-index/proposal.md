## Why

当 skills 目录中的内容发生变化时（新增、修改、删除 skill），需要重新生成 `.trae/skills/index.html` 索引页面。创建一个 dedicated skill 可以让这个操作更便捷，通过 Trae IDE 直接触发。

## What Changes

- 在 `.trae/skills/regenerate-skill-index/` 目录下创建 `SKILL.md`
- Skill 触发时执行 `npm run generate:skill-index` 命令
- 读取所有 `SKILL.md` 文件的 frontmatter，重新生成索引 HTML

## Capabilities

### New Capabilities
- `regenerate-skill-index`: 提供一个 skill 用于重新生成 skills 索引页面

### Modified Capabilities
<!-- 暂无 -->

## Impact

- 新增文件：`.trae/skills/regenerate-skill-index/SKILL.md`
- 依赖已存在的 `scripts/generate-skill-index.mjs` 和 `package.json`
