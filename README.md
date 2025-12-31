# 期末考试复习系统

一个基于HTML+CSS+JavaScript的简易期末考试复习系统，支持多种题型和学习模式。

## 功能特点

### 1. 科目选择
- 首页可选择复习科目
- 当前支持：自然语言处理(NLP)
- 可扩展添加更多科目

### 2. 学习模式
- **复习模式**：答题后立即显示正确答案，适合学习和巩固知识
- **考试模式**：全部答完后统一批阅，适合自我测评

### 3. 灵活配置
- **题目数量**：可选择10题、20题、30题、50题或全部题目
- **题目顺序**：支持随机乱序和按序排列
- **题目类型**：支持单选题、多选题、填空题的任意组合

### 4. 答题功能
- 清晰的题目导航
- 实时进度显示
- 复习模式下即时反馈
- 考试模式下统一提交

### 5. 成绩分析
- 显示正确率和详细统计
- 展示所有题目及正确答案
- 支持筛选查看：全部题目、错题、正确题
- 错题重做功能

## 文件结构

```
Final exam/
├── index.html              # 首页 - 科目选择
├── mode-select.html        # 模式选择页面
├── practice.html           # 答题页面
├── result.html             # 结果页面
├── styles/                 # 样式文件夹
│   ├── common.css         # 通用样式
│   ├── index.css          # 首页样式
│   ├── mode-select.css    # 模式选择样式
│   ├── practice.css       # 答题页面样式
│   └── result.css         # 结果页面样式
├── scripts/               # 脚本文件夹
│   ├── index.js          # 首页脚本
│   ├── mode-select.js    # 模式选择脚本
│   ├── practice.js       # 答题逻辑
│   ├── result.js         # 结果分析脚本
│   ├── questions-data.js      # 单选题题库
│   ├── questions-multiple.js  # 多选题题库
│   └── questions-blank.js     # 填空题题库
├── data/                  # 题库文件夹（JSON格式）
│   └── nlp.json          # 自然语言处理题库
└── README.md             # 说明文档
```

## 使用方法

### 1. 启动系统
直接在浏览器中打开 `index.html` 文件即可。

### 2. 选择科目
在首页点击"自然语言处理"卡片进入模式选择页面。

### 3. 配置参数
- 选择学习模式（复习模式或考试模式）
- 设置题目数量
- 选择题目顺序
- 勾选需要练习的题目类型
- 点击"开始练习"按钮

### 4. 开始答题
- 在答题页面回答每道题目
- 复习模式：选择答案后立即显示正确与否
- 考试模式：答完所有题后点击"提交答案"

### 5. 查看结果
- 查看正确率和详细统计
- 浏览所有题目和答案
- 使用筛选功能查看错题
- 点击"错题重做"进行针对性练习

## 题库格式

题库文件为JSON格式，放在 `data/` 文件夹中。格式示例：

```json
[
    {
        "type": "single",
        "question": "题目内容",
        "options": ["选项A", "选项B", "选项C", "选项D"],
        "answer": 0,
        "explanation": "解析内容（可选）"
    },
    {
        "type": "multiple",
        "question": "多选题题目",
        "options": ["选项A", "选项B", "选项C", "选项D"],
        "answer": [0, 2],
        "explanation": "解析内容（可选）"
    },
    {
        "type": "blank",
        "question": "填空题题目____",
        "answer": "正确答案",
        "explanation": "解析内容（可选）"
    }
]
```

### 题型说明
- **single**: 单选题，answer为数字索引（0表示第一个选项）
- **multiple**: 多选题，answer为数组索引
- **blank**: 填空题，answer为字符串

## 添加新科目

1. 在 `scripts/` 文件夹中创建对应的题库文件：
   - `questions-data-科目名.js` (单选题)
   - `questions-multiple-科目名.js` (多选题)
   - `questions-blank-科目名.js` (填空题)
2. 在 `index.html` 中添加新的科目卡片
3. 在 `index.js` 和 `mode-select.js` 中更新科目名称映射
4. 在 `practice.html` 中引入新的题库文件

## 添加新题目

### 方法一：使用转换器（推荐）
1. 打开 `converter.html` 转换器页面
2. 按格式输入题目文本
3. 点击"转换"生成JSON格式
4. 将JSON内容添加到对应的题库文件中：
   - 单选题 → `scripts/questions-data.js` 的 `singleChoiceQuestions` 数组
   - 多选题 → `scripts/questions-multiple.js` 的 `multipleChoiceQuestions` 数组
   - 填空题 → `scripts/questions-blank.js` 的 `blankQuestions` 数组

### 方法二：手动编辑
直接编辑对应的 `.js` 文件，按照现有格式添加题目对象。

## 技术特点

- 纯前端实现，无需服务器
- 响应式设计，支持移动端
- 使用localStorage保存答题进度
- 流畅的动画效果
- 清晰的视觉反馈

## 浏览器兼容性

支持现代浏览器：
- Chrome/Edge (推荐)
- Firefox
- Safari

## 注意事项

- 请在本地服务器或支持file协议的浏览器中运行
- 如遇跨域问题，建议使用本地HTTP服务器（如Live Server）
- 数据保存在浏览器localStorage中，清除浏览器数据会丢失进度

## 未来改进方向

- [ ] 添加更多科目题库
- [ ] 支持题目收藏功能
- [ ] 添加学习统计图表
- [ ] 支持题目导入导出
- [ ] 添加夜间模式
- [ ] 支持多语言

## 开发者

期末考试复习系统 v1.0

祝你考试顺利！📚✨
