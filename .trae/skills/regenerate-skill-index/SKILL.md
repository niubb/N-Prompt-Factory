---
name: "regenerate-skill-index"
description: "重新生成 skills 索引页面。当 skills 目录中的内容发生变化后，用于更新 .trae/skills/index.html。"
---

# Regenerate Skill Index

当 skills 目录中的 skill 增删或描述变更后，运行此 skill 重新生成索引页面。

## 执行方式

运行 `npm run generate:skill-index` 命令，该脚本会：

1. 扫描 `.trae/skills/*/SKILL.md` 文件
2. 解析每个文件的 frontmatter（name, description）
3. 生成新的 `.trae/skills/index.html`

## 触发词

- "重新生成 skill 索引"
- "更新 skills index"
- " regenerate skill index"
