---
name: "add-prompt"
description: "在 prompts 文件夹中添加新的提示词。支持分类管理，自动创建 .header.md 元数据文件。"
---

# 添加提示词技能

## 技能描述
本技能用于在提示词管理项目中添加新的提示词，支持分类管理和元数据自动生成。

## 使用说明

### 执行步骤
1. 确定提示词名称（建议使用小写字母和连字符，如 `greeting-prompt`）
2. 选择分类（从 `prompt-types.md` 读取可用分类）
3. 编写提示词内容
4. 将提示词保存到对应分类文件夹（如 `04-analysis/`）
5. 自动创建对应的 `.header.md` 元数据文件

### 文件命名规范
- 使用小写字母、数字和连字符
- 避免空格和特殊字符
- 文件扩展名：`.md`（推荐）

### 分类规范
- 分类从 `prompts/prompt-types.md` 文件读取
- 分类格式：`01-education`、`02-creative`、`03-productivity`、`04-analysis`
- 提示词保存到对应分类文件夹下

### 元数据文件
每个提示词自动生成同名的 `.header.md` 文件，包含类型信息：
```markdown
| 属性 | 值 |
|------|----|
| 类型 | {分类标识} |
```

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
| 类型 | 04-analysis |
```

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
| 类型 | 01-education |
```

## 注意事项
1. 确保文件名唯一，避免覆盖现有提示词
2. 提示词内容应清晰、明确
3. 可以使用 Markdown 格式增强可读性
4. 分类必须从 `prompt-types.md` 中选择，确保一致性