# 提示词管理系统重构计划

## 一、需求概述

### 当前状态

* 每个提示词有两个文件：

  * `{name}.md`：提示词内容文件

  * `{name}.header.md`：元数据文件（目前只包含类型信息）

* header 文件格式简单，只包含类型属性

* add-prompt 技能硬编码了 header 文件的生成逻辑

### 重构目标

1. **增强 header 文件**：添加提示词文件的相对路径引用、名称和描述信息
2. **创建集中索引**：创建一个集中的索引文件（`prompts/index.md`），管理所有提示词
3. **模板化解耦**：创建 header 模板，使 add-prompt 技能基于模板生成文件，实现解耦

## 二、当前状态分析

### 文件结构

```
prompts/
├── 04-analysis/
│   ├── health-analyst.md              # 提示词内容
│   ├── health-analyst.header.md       # 元数据（仅类型）
│   ├── prompt-reverse-engineering.md
│   └── prompt-reverse-engineering.header.md
└── prompt-types.md                     # 分类定义
```

### 当前 header 文件格式

```markdown
| 属性 | 值 |
|------|----|
| 类型 | 04-analysis |
```

### 当前 add-prompt 技能

* 定义在 `.trae/skills/add-prompt/SKILL.md`

* 硬编码了 header 文件的生成格式

* 缺少模板化机制

## 三、重构方案

### 3.1 创建模板文件

#### 文件：`prompts/templates/header.template.md`

**用途**：定义 header 文件的模板格式

**内容**：

```markdown
| 属性 | 值 |
|------|----|
| 名称 | {{name}} |
| 类型 | {{type}} |
| 描述 | {{description}} |
| 文件 | {{file_path}} |
| 创建时间 | {{created_at}} |
```

**说明**：

* `{{name}}`：提示词名称（从提示词文件的第一行 # 标题提取）

* `{{type}}`：提示词类型（如 04-analysis）

* `{{description}}`：提示词描述（从提示词文件中提取或由用户提供）

* `{{file_path}}`：提示词文件的相对路径（相对于 prompts 目录）

* `{{created_at}}`：创建时间

#### 文件：`prompts/templates/index.template.md`

**用途**：定义索引文件的模板格式

**内容**：

```markdown
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
```

### 3.2 创建索引文件

#### 文件：`prompts/index.md`

**用途**：集中管理所有提示词的索引

**生成方式**：

* 初始时手动创建，包含现有提示词

* 后续由 add-prompt 技能自动更新

### 3.3 修改 add-prompt 技能

#### 修改文件：`.trae/skills/add-prompt/SKILL.md`

**主要变更**：

1. **添加模板读取逻辑**

   * 读取 `prompts/templates/header.template.md`

   * 使用模板变量替换生成 header 文件

2. **添加索引更新逻辑**

   * 读取 `prompts/index.md`

   * 在索引中添加新提示词的条目

   * 更新最后更新时间

3. **增强元数据提取**

   * 从提示词文件第一行提取名称（# 标题）

   * 从提示词文件中提取描述（可选）

   * 记录创建时间

4. **更新技能文档**

   * 说明模板化机制

   * 更新示例和注意事项

### 3.4 迁移现有提示词

#### 任务：

1. 为现有提示词生成新的 header 文件

   * health-analyst.md

   * prompt-reverse-engineering.md

2. 创建初始索引文件

   * 包含所有现有提示词

## 四、实施步骤

### 步骤 1：创建模板文件

* 创建 `prompts/templates/` 目录

* 创建 `header.template.md`

* 创建 `index.template.md`

### 步骤 2：创建索引文件

* 创建 `prompts/index.md`

* 手动添加现有提示词的索引信息

### 步骤 3：迁移现有 header 文件

* 更新 `health-analyst.header.md`

* 更新 `prompt-reverse-engineering.header.md`

### 步骤 4：修改 add-prompt 技能

* 更新 `.trae/skills/add-prompt/SKILL.md`

* 添加模板读取和变量替换逻辑

* 添加索引更新逻辑

### 步骤 5：测试验证

* 测试添加新提示词的流程

* 验证 header 文件生成正确

* 验证索引文件更新正确

## 五、文件清单

### 新增文件

1. `prompts/templates/header.template.md` - header 文件模板
2. `prompts/templates/index.template.md` - 索引文件模板
3. `prompts/index.md` - 提示词索引文件

### 修改文件

1. `prompts/04-analysis/health-analyst.header.md` - 更新格式
2. `prompts/04-analysis/prompt-reverse-engineering.header.md` - 更新格式
3. `.trae/skills/add-prompt/SKILL.md` - 添加模板化逻辑

## 六、技术细节

### 模板变量替换

使用简单的字符串替换：

* `{{name}}` → 提示词名称

* `{{type}}` → 提示词类型

* `{{description}}` → 提示词描述

* `{{file_path}}` → 文件相对路径

* `{{created_at}}` → 创建时间

### 名称提取规则

从提示词文件的第一行提取：

* 格式：`# 提示词名称`

* 提取：去掉 `# `  前缀，得到名称

### 描述提取规则（可选）

从提示词文件的第二段提取：

* 如果有 `## 角色 (Role)` 或类似标题，提取其内容

* 否则使用默认描述："暂无描述"

### 索引更新规则

* 新增提示词时，在索引表中添加新行

* 按类型分组，在对应分组中添加条目

* 更新最后更新时间

## 七、优势分析

### 解耦优势

1. **模板独立**：header 格式变更只需修改模板，无需修改技能代码
2. **易于维护**：模板文件清晰易懂，非技术人员也能修改
3. **灵活扩展**：未来可以轻松添加新的元数据字段

### 索引优势

1. **集中管理**：所有提示词一目了然
2. **快速查找**：通过索引快速定位提示词
3. **类型分组**：按类型组织，便于浏览

## 八、注意事项

1. **向后兼容**：确保现有提示词文件不受影响
2. **模板路径**：技能需要正确读取模板文件路径
3. **编码格式**：所有文件使用 UTF-8 编码
4. **时间格式**：使用 ISO 8601 格式（YYYY-MM-DD）

## 九、验证标准

### 功能验证

* [ ] 模板文件创建成功

* [ ] 索引文件创建成功

* [ ] 现有 header 文件迁移成功

* [ ] add-prompt 技能更新成功

### 质量验证

* [ ] header 文件包含完整元数据

* [ ] 索引文件包含所有提示词

* [ ] 模板变量替换正确

* [ ] 文件路径引用正确

### 流程验证

* [ ] 添加新提示词时自动生成 header

* [ ] 添加新提示词时自动更新索引

* [ ] 名称和描述提取正确

* [ ] 时间记录正确

