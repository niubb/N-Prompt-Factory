## Context

已经存在 `scripts/generate-skill-index.mjs` 脚本和 `npm run generate:skill-index` 命令。用户希望通过 Trae IDE 的 skill 机制更便捷地触发这个操作。

## Goals / Non-Goals

**Goals:**
- 创建一个 Trae IDE skill，触发时执行 `npm run generate:skill-index`
- Skill 文件放在 `.trae/skills/regenerate-skill-index/SKILL.md`
- 按照 Trae skill 的标准格式编写

**Non-Goals:**
- 不修改现有的 generator 脚本
- 不添加新的 npm 依赖

## Decisions

### 1. 直接调用 npm script
Skill 直接执行 `npm run generate:skill-index`，而不是直接调用 Node 脚本。

**Alternatives considered:**
- 直接调用 `node scripts/generate-skill-index.mjs`：增加耦合，不够灵活

### 2. Skill 放在 skills 目录下
按照 Trae skill 的标准目录结构放置。

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| npm script 执行失败 | generator 脚本已有错误处理，npm 层面失败会报错 |

## Migration Plan

1. 创建 `.trae/skills/regenerate-skill-index/` 目录
2. 创建 `SKILL.md` 文件，包含 name, description, trigger phrase
3. 实现部分直接调用 `npm run generate:skill-index`
