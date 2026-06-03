# 提示词添加技能 - 实现计划

## 一、需求分析

### 项目背景

本项目是一个提示词管理系统，用于存储和管理各种提示词（Prompt）。

### 技能需求

创建一个供 Agent 使用的技能（Skill），功能是：

1. **添加新提示词**：接收提示词名称和内容，将其保存到 `prompts` 文件夹
2. **支持多种格式**：默认使用 Markdown 格式（.md），也支持纯文本（.txt）
3. **自动创建目录**：确保 `prompts` 目录存在

### 核心功能

* 接收提示词名称（作为文件名）

* 接收提示词内容

* 将提示词保存到 `prompts/{name}.md` 文件中

## 二、文件结构规划

```
prompts/                          # 提示词存储目录
└── {prompt_name}.md              # 提示词文件（由技能创建）

skills/
└── prompt-adder/                 # 提示词添加技能
    ├── __init__.py
    ├── main.py                   # 技能主入口
    └── skill.json                # 技能配置文件
```

## 三、实现步骤

### 步骤 1: 创建技能目录

* 创建 `skills/prompt-adder/` 目录

### 步骤 2: 创建技能配置文件

* 创建 `skills/prompt-adder/skill.json`

* 定义技能元数据和参数（提示词名称、内容、格式）

### 步骤 3: 创建技能主入口

* 创建 `skills/prompt-adder/main.py`

* 实现提示词添加逻辑：

  * 解析命令行参数

  * 确保 `prompts` 目录存在

  * 创建提示词文件

  * 返回成功消息

### 步骤 4: 创建模块初始化文件

* 创建 `skills/prompt-adder/__init__.py`

## 四、技能配置设计

### skill.json 内容

```json
{
    "name": "prompt-adder",
    "description": "在项目中添加新的提示词，保存到 prompts 文件夹",
    "version": "1.0.0",
    "author": "System",
    "type": "tool",
    "entry": "main.py",
    "parameters": {
        "name": {
            "type": "string",
            "description": "提示词名称（将作为文件名）",
            "required": true
        },
        "content": {
            "type": "string",
            "description": "提示词内容",
            "required": true
        },
        "format": {
            "type": "string",
            "description": "文件格式：md（Markdown）或 txt（纯文本）",
            "required": false,
            "default": "md"
        }
    },
    "tags": ["提示词", "添加", "管理"]
}
```

## 五、技能逻辑设计

### main.py 功能

1. **参数解析**：解析 name（名称）、content（内容）、format（格式）参数
2. **目录检查**：确保 `prompts/` 目录存在，不存在则创建
3. **文件创建**：根据名称和格式创建提示词文件
4. **内容写入**：将提示词内容写入文件
5. **结果返回**：输出成功消息和文件路径

## 六、输出文件格式

### Markdown 格式（.md）

```markdown
# {prompt_name}

{content}
```

### 纯文本格式（.txt）

```
{content}
```

## 七、使用示例

```bash
# 添加一个名为 "greeting" 的提示词
python skills/prompt-adder/main.py --name greeting --content "你好！我是一个AI助手。"

# 添加纯文本格式的提示词
python skills/prompt-adder/main.py --name welcome --content "欢迎使用提示词管理系统" --format txt

# 简写形式
python skills/prompt-adder/main.py -n greeting -c "你好！"
```

## 八、注意事项

1. 提示词名称应使用小写字母和连字符，避免空格和特殊字符
2. 如果文件已存在，应提示用户确认是否覆盖
3. 确保文件名符合操作系统命名规范

## 九、风险处理

* **文件已存在**: 提示用户并询问是否覆盖

* **权限不足**: 捕获异常并给出友好提示

* **无效参数**: 提供清晰的错误信息和使用帮助

* **特殊字符**: 过滤文件名中的非法字符

