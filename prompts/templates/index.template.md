# 提示词索引

> 最后更新：{{last_updated}}

## 索引表

| 名称 | 类型 | 描述 | 文件路径 |
|------|------|------|----------|
{{#each prompts}}
| {{name}} | {{type}} | {{description}} | [{{file_path}}](./{{file_path}}) |
{{/each}}

## 按类型分类

{{#each type_groups}}
### {{type_name}}

{{#each prompts}}
- **{{name}}**：{{description}} - [查看](./{{file_path}})
{{/each}}

{{/each}}