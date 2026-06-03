---
name: "add-prompt"
description: "在 prompts 文件夹中添加新的提示词。支持分类管理，基于模板自动创建 .header.md 元数据文件，并更新索引文件。"
---

# 添加提示词技能

## 技能描述
本技能用于在提示词管理项目中添加新的提示词，支持分类管理、模板化元数据生成和索引自动更新。

## 核心特性
- **模板化生成**：基于模板文件生成 header 文件，实现格式与逻辑解耦
- **自动索引更新**：添加提示词时自动更新集中索引文件
- **元数据提取**：自动从提示词内容提取名称和描述信息

## 使用说明

### 执行步骤
1. 确定提示词名称（建议使用小写字母和连字符，如 `greeting-prompt`）
2. 选择分类（从 `prompt-types.md` 读取可用分类）
3. 编写提示词内容（第一行应为 `# 提示词名称`）
4. 将提示词保存到对应分类文件夹（如 `04-analysis/`）
5. 从提示词文件提取元数据（名称、描述）
6. 读取 header 模板文件（`prompts/templates/header.template.md`）
7. 基于模板生成 `.header.md` 元数据文件
8. 更新集中索引文件（`prompts/index.md`）

### 文件命名规范
- 使用小写字母、数字和连字符
- 避免空格和特殊字符
- 文件扩展名：`.md`（推荐）

### 分类规范
- 分类从 `prompts/prompt-types.md` 文件读取
- 分类格式：`01-education`、`02-creative`、`03-productivity`、`04-analysis`
- 提示词保存到对应分类文件夹下

### 元数据文件
每个提示词自动生成同名的 `.header.md` 文件，基于模板生成，包含以下信息：
```markdown
| 属性 | 值 |
|------|----|
| 名称 | {提示词名称} |
| 类型 | {分类标识} |
| 描述 | {提示词描述} |
| 文件 | [{文件相对路径}](./{文件名}) |
| 创建时间 | {创建日期} |
```

#### 模板文件位置
- Header 模板：`prompts/templates/header.template.md`
- 索引模板：`prompts/templates/index.template.md`

#### 元数据提取规则
- **名称提取**：从提示词文件第一行 `# 标题` 提取，去掉 `# ` 前缀
- **描述提取**：从提示词文件的角色描述部分提取，或使用默认描述"暂无描述"
- **文件路径**：相对于 `prompts` 目录的路径（如 `04-analysis/health-analyst.md`）
- **创建时间**：使用 ISO 8601 格式（YYYY-MM-DD）

### 索引文件
集中索引文件 `prompts/index.md` 包含所有提示词的信息，按类型分组组织：
- 索引表：列出所有提示词的基本信息
- 类型分组：按分类组织提示词，便于浏览
- 自动更新：添加新提示词时自动更新索引

### 输出格式

#### Markdown 格式
```markdown
# 提示词名称

提示词内容...
```

## 示例

### 示例 1：创建分析类提示词
文件名：`prompts/04-analysis/data-analysis.md`
```markdown
# 数据分析提示词

请帮我分析以下数据...
```

自动生成：`prompts/04-analysis/data-analysis.header.md`
```markdown
| 属性 | 值 |
|------|----|
| 名称 | 数据分析提示词 |
| 类型 | 04-analysis |
| 描述 | 请帮我分析以下数据... |
| 文件 | [04-analysis/data-analysis.md](./data-analysis.md) |
| 创建时间 | 2026-06-03 |
```

自动更新索引：`prompts/index.md`
- 在索引表中添加新行
- 在 04-analysis 分组中添加条目
- 更新最后更新时间

### 示例 2：创建教育类提示词
文件名：`prompts/01-education/learning-guide.md`
```markdown
# 学习指导提示词

请帮我制定一个学习计划...
```

自动生成：`prompts/01-education/learning-guide.header.md`
```markdown
| 属性 | 值 |
|------|----|
| 名称 | 学习指导提示词 |
| 类型 | 01-education |
| 描述 | 请帮我制定一个学习计划... |
| 文件 | [01-education/learning-guide.md](./learning-guide.md) |
| 创建时间 | 2026-06-03 |
```

自动更新索引：`prompts/index.md`
- 在索引表中添加新行
- 在 01-education 分组中添加条目（如果分组不存在则创建）
- 更新最后更新时间

## 注意事项
1. 确保文件名唯一，避免覆盖现有提示词
2. 提示词内容应清晰、明确，第一行必须为 `# 标题` 格式
3. 可以使用 Markdown 格式增强可读性
4. 分类必须从 `prompt-types.md` 中选择，确保一致性
5. 模板文件必须存在于 `prompts/templates/` 目录下
6. 索引文件必须存在，否则需要手动创建
7. 如果修改模板格式，所有后续生成的 header 文件将使用新格式
8. 现有的 header 文件不会自动更新，需要手动迁移

## 模板化优势
- **解耦设计**：header 格式变更只需修改模板，无需修改技能逻辑
- **易于维护**：模板文件清晰易懂，非技术人员也能修改
- **灵活扩展**：未来可以轻松添加新的元数据字段
- **一致性保证**：所有 header 文件使用统一格式