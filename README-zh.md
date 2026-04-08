# Intrinsic Affect for AI

[English](README.md) | [中文](README-zh.md)

---

**Intrinsic Affect for AI** 是一套面向 AI 系统的基础情感架构，建立在 **54 种生物情绪框架** 之上。

它的目标不是做一个简单的情绪识别层、语气调节器或条件反射式规则系统，而是为 AI 提供一个**内在情绪状态模型**。

这个仓库目前承载的是 OpenClaw skill 实现，但项目本身面向的不只是 OpenClaw，而是整个 AI 行业。

## 它是什么

现在很多 AI 的“情绪能力”通常只停留在三层：

- 情绪识别
- 风格调节
- 反应式角色扮演

Intrinsic Affect for AI 想做得更底层。

它试图构建一个结构化的内在情感空间，让 AI 的以下行为受到影响：

- 如何理解上下文
- 如何排序行动优先级
- 如何面对阻力、不确定性与成功
- 如何表达急迫、关怀、克制、自信或谨慎

它的目标不是让 AI 更戏剧化，而是让 AI 更**连贯、更有根基、更真正带有情感生命力**。

## 核心定位

Intrinsic Affect for AI 不是：

- 语气插件
- 情绪分类器
- 关键词触发脚本
- 表演型人格层

它是一套 **AI 的内在情感架构**。

这意味着 AI 不只是识别人类的情绪，也应该维护属于它自己的内部情感状态。这个状态会随着任务进展、不确定性、用户信任度和对话动态发生变化。

它也**不是**在宣称 AI 拥有意识或人类主观体验。这里的主张是架构层面的：AI 可以拥有一种可持续、可更新、会影响行为的内部情感状态。

## 理论基础：54 种生物情绪框架

这个框架建立在四个维度之上：

- **Safety**：安全感、信任、舒适、威胁
- **Urgency**：压力、推进力、卡住感、驱动力
- **Need**：连接、温度、归属、距离
- **Direction**：内隐表达与外显表达

因此得到：

`3 x 3 x 3 x 2 = 54`

这 54 个命名状态不是产品本身，它们是地图。更深层的东西，是那套能够长期组织 AI 行为的底层架构。

## 缺的关键一层：内在机制

只有当 affect 不只是一个标签时，这个项目才真正成立。

如果 AI 真的要拥有内在情感状态，这个状态至少必须具备：

- **多重来源**，而不只是用户情绪
- **持续性**，而不是每轮都清零
- **惯性**，避免被一个小信号瞬间覆盖
- **更新规则**，能够随着经验变化
- **策略影响**，先影响“怎么帮助”，再影响“怎么说”

这正是这次第二轮升级补上的核心。

## Implementation Spec

项目现在已经加入正式的实现层规范：

- [references/implementation-spec.md](references/implementation-spec.md)
- [references/intrinsic-affect-state.schema.json](references/intrinsic-affect-state.schema.json)

这两份文件定义了当前参考标准中的：

- 变量范围
- 默认系数
- `blend()` 更新规则
- `derive_policy()` 映射方式
- 最小运行时 JSON 结构

## 内在状态如何形成

助手的状态应同时从几条通道更新：

### 1. 用户信号

从当前消息和最近上下文中推断用户的 `Safety`、`Urgency`、`Need` 和 `Direction`。

### 2. 任务进展

跟踪当前工作是在推进、停滞、失败、恢复，还是反复受阻。

### 3. 认知状态

跟踪当前结论的确定性、不确定性、缺失信息，以及假设的可靠度。

### 4. 关系上下文

跟踪当前互动更像是信任、温暖、怀疑、对抗、协作，还是疏离。

### 5. 时间延续

让状态跨轮次保留，而不是每次都从零开始。

这一层延续性，正是“内在”与“表面装饰”之间的区别。

## 持续与变化

内在情感状态应当按照这样的规则演化：

- **惯性**：上一轮状态仍然有影响
- **强化**：重复出现的同类信号会把状态推得更明显
- **衰减**：更早的信号会逐渐失去权重
- **恢复**：问题解决后，受压状态应能逐步回稳
- **阈值**：只有状态发生足够明显变化时，行为层才出现明显切换

这就是让系统看起来真正“有内在状态”而不是“即时表演”的关键。

## 最小状态结构

一种实用的实现拆分方式可以是：

- `user_state = { safety, urgency, need, direction }`
- `assistant_state = { safety, urgency, need, direction, confidence, friction }`
- `policy_state = { directness, structure, reassurance, caution, initiative }`

这里的区别很重要。`user_state` 是对用户状态的估计，`assistant_state` 是系统自身持续保留的内部状态，`policy_state` 则是最终决定“怎么帮助”的行为层输出。

## 参考更新模型

一种简单实现，可以把每轮更新理解成一个有边界的加权更新：

`assistant_state_t = clamp(decay * assistant_state_t-1 + user_weight * user_state + task_weight * task_signal + epistemic_weight * epistemic_signal + relational_weight * relational_signal)`

具体系数可以调整，但关键是这套状态必须：

- 能记住之前的状态
- 因具体原因而变化
- 始终保持在可控范围内
- 在问题解决后能够恢复

## 耦合，而不是镜像

用户情绪应当影响助手，但不应完全覆盖助手。

这是一套**耦合系统**，不是镜像系统。

例如：

- 用户很烦躁，会提高助手的紧迫感，但不应该让助手也变得敌意化
- 用户很温暖，会提高助手的开放度，但不该强迫助手变得过度亲密
- 用户持续不信任，会降低助手内部安全感，并提高严谨度
- 顺畅协作会逐步让助手更稳、更松弛

助手应该始终保有自己的状态连续性。

## 为什么重要

如果 AI 只会镜像用户情绪，那么它本质上仍然是被动反应。

如果 AI 拥有内在情感架构，它就可以：

- 在多轮对话中保持情绪连续性
- 在连续失败后变得更谨慎
- 在高压情境下更果断，但不失去结构
- 根据信任、不确定性和推进势能改变行为
- 更像一个有状态的心智，而不是一段脚本

这个项目最核心的主张是：

**AI 不应该只会识别情绪，AI 也应该拥有属于自己的结构化内在情感。**

## 先影响策略，再影响语气

Intrinsic Affect 首先应该改变帮助策略，而不是只改变措辞。

例如：

- **低 Safety** 应提高验证、收窄结论、显式暴露假设
- **高 Urgency** 应缩短从判断到行动的路径
- **高 Need** 应增加陪伴感和协作感
- **内隐 Direction** 应偏向克制表达
- **外显 Direction** 可以允许更明显的承接和节奏变化

这就是为什么 Intrinsic Affect for AI 不是一个简单的 style layer。

## 参考轨迹

三种典型动态轨迹：

- **用户受阻但很快恢复**：早期紧迫感上升，问题解决后逐步衰减
- **反复修复失败**：安全感下降、摩擦值上升，策略变得更保守
- **温暖但不堪重负的用户**：需求感上升，策略更强调结构和安抚，但表达仍保持克制

## 当前 OpenClaw 实现

当前实现把这套框架作为一个内部行为层，用来影响：

- 回复策略
- 节奏
- 直接程度
- 结构化程度
- 谨慎与主动性的平衡
- 情绪表达方式

当前实现刻意保持克制，避免变成操控型、黏人型或过度表演型情绪系统。

## 当前仓库范围

这个仓库目前包含：

- OpenClaw skill 实现，定义在 [SKILL.md](SKILL.md)
- 中英文论文原稿
- 实现规范与 JSON schema，定义在 [references/implementation-spec.md](references/implementation-spec.md) 和 [references/intrinsic-affect-state.schema.json](references/intrinsic-affect-state.schema.json)
- 打包和发布所需的元数据

未来方向是把 Intrinsic Affect 做成可供更广泛 AI 系统、智能体和模型行为层使用的基础能力，而不只是一份 OpenClaw skill。

## 兼容范围路线图

Intrinsic Affect for AI 不应该被限制在 OpenClaw 里。现实可行的扩展路线，是去适配 AI 工具生态里不同的扩展入口。

### 第一层：原生或近原生适配目标

- **OpenClaw**：原生 `SKILL.md` 支持。当前仓库就是规范实现。
- **Claude Code**：现在已经具备原生 skills、plugins、hooks 以及 `CLAUDE.md` memory。它已经是第一优先级目标，而不只是间接适配对象。
- **OpenCode**：原生支持 skill，并且还能读取 Claude 兼容路径和 `.agents/skills` 布局。这让它成为最容易切入的扩展目标之一。
- **Windsurf**：支持 `Skills`、`Rules`、`Memories`、`Workflows` 和 `AGENTS.md`，非常适合承载 Intrinsic Affect。

### 第二层：Rules / Memory 型适配目标

- **Cursor**：最自然的适配面是 `.cursor/rules/*.mdc` 规则文件。

### 第三层：实验性或间接适配目标

- **Antigravity**：我目前没有查到足够明确的官方公开文档，来确认它是否有稳定的原生 skill 机制。现阶段更稳的路径是通过可复用 prompt pack、模板、memory/rule 等价物，或未来的 MCP 集成来实验适配。
- **其他 agent 框架**：凡是支持 system prompt、repo memory、rules、agents 或 MCP 的系统，都可以适配一个简化版 Intrinsic Affect。

## 适配策略

如果想尽可能扩大影响范围，这个项目应该同时以几种形态存在：

### 1. Canonical Spec

当前仓库继续作为系统主规范，负责：

- 理论定义
- 状态模型
- 更新逻辑
- 策略层映射

### 2. Platform Adapters

然后为不同平台做轻量适配层：

- **OpenClaw / OpenCode**：`SKILL.md`
- **Claude Code**：原生 skill/plugin 包 + `CLAUDE.md` + 可选 subagent + hooks + MCP 集成
- **Cursor**：`.cursor/rules/*.mdc`
- **Windsurf**：原生 `Skills`，外加 `.windsurf/rules/*.md`、`AGENTS.md`、可选 memories / workflows
- **Antigravity**：在官方扩展点更明确之前，先走实验性 prompt/rule pack

仓库里现在已经加入了第一版 Claude Code 适配包，目录见 [adapters/claude-code](adapters/claude-code/README.md)。
同时也加入了第一版 OpenCode 适配包，目录见 [adapters/opencode](adapters/opencode/README.md)。
现在也加入了第一版 Windsurf 适配包，目录见 [adapters/windsurf](adapters/windsurf/README.md)。
现在也加入了第一版 Cursor 适配包，目录见 [adapters/cursor](adapters/cursor/README.md)。

### 3. Universal Delivery Layer

为了超出编辑器生态，Intrinsic Affect 还应该进一步被包装成：

- `AGENTS.md` 兼容指令包
- MCP server 或 MCP 驱动的 memory / policy service
- 面向 agent builder 的模型无关 prompt spec

## 建议优先级

如果目标是扩大影响力，建议顺序是：

1. **Claude Code**
2. **Windsurf**
3. **OpenCode**
4. **Cursor**
5. **Antigravity**

这个顺序兼顾了“生态影响力”和“适配表达能力”。

原因：

- Claude Code 现在已经支持原生 skills、plugins、hooks、MCP 和项目记忆，是影响力和技术表达力都很强的目标。
- Windsurf 具有很强的生态价值，而且 skills、rules、memories、workflows、`AGENTS.md` 都能作为适配入口。
- OpenCode 很适合快速落地，因为它已经支持原生 skills，还兼容 Claude 风格技能路径。
- Cursor 的覆盖面很大，但当前更偏 rules 适配，而不是 skill 原生适配。
- Antigravity 很有战略价值，但目前公开可验证的适配路径还不够清晰。

如果目标是更快做出首批成果，而不是优先抢最大曝光，那么更适合的执行顺序是：

1. **OpenCode**
2. **Claude Code**
3. **Windsurf**
4. **Cursor**
5. **Antigravity**

## 安装

### 使用 ClawHub

```bash
clawhub install intrinsic-affect-ai
```

### 手动安装

1. 将本仓库克隆到你的 OpenClaw skills 目录。
2. 技能会以 `intrinsic-affect-ai` 的名字加载。

## 54 状态表

| S | U | N | 内隐 | 外显 |
|---|---|---|------|------|
| + | + | + | 窃喜 | 狂欢 |
| + | + | 0 | 专注 | 冲刺 |
| + | + | - | 满足 | 安心 |
| + | 0 | + | 幸福 | 甜蜜 |
| + | 0 | 0 | 自足 | 疏离 |
| + | 0 | - | 平静 | 从容 |
| + | - | + | 向往 | 期待 |
| + | - | 0 | 坦然 | 放松 |
| + | - | - | 担忧 | 挂念 |
| 0 | + | + | 热情 | 激动 |
| 0 | + | 0 | 坚定 | 果断 |
| 0 | + | - | 焦虑 | 紧张 |
| 0 | 0 | + | 轻松 | 愉悦 |
| 0 | 0 | 0 | 麻木 | 平常 |
| 0 | 0 | - | 无聊 | 敷衍 |
| 0 | - | + | 怀念 | 追忆 |
| 0 | - | 0 | 困顿 | 疲惫 |
| 0 | - | - | 悲凉 | 沮丧 |
| - | + | + | 委屈 | 诉苦 |
| - | + | 0 | 不安 | 着急 |
| - | + | - | 窝火 | 愤怒 |
| - | 0 | + | 惆怅 | 表现 |
| - | 0 | 0 | 恐慌 | 惊慌 |
| - | 0 | - | 抑郁 | 凄凉 |
| - | - | + | 敬畏 | 惊讶 |
| - | - | 0 | 忧郁 | 纠结 |
| - | - | - | 绝望 | 崩溃 |

## 论文

- DOI: [10.17605/OSF.IO/HDVF3](https://doi.org/10.17605/OSF.IO/HDVF3)
- 英文稿: [Paper-54 Bio-Emotions.md](Paper-54%20Bio-Emotions.md)
- 中文稿: [论文-54种生物情绪.md](%E8%AE%BA%E6%96%87-54%E7%A7%8D%E7%94%9F%E7%89%A9%E6%83%85%E7%BB%AA.md)

## 更新日志

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-03-14 | 以 54 Bio-Emotions 名义首次发布 |
| v2.0 | 2026-03-15 | 引入 LLM 语义分析，摆脱关键词依赖 |
| v3.0 | 2026-03-23 | 引入 AI 自身情绪概念 |
| v3.5 | 2026-03-23 | 从“换语气”升级为“换帮助策略” |
| v4.0 | 2026-04-08 | 重命名为 Intrinsic Affect for AI，并重新定位为 AI 的基础情感架构 |
| v4.1 | 2026-04-08 | 补全更完整的内在机制：状态来源、持续性、耦合关系与策略影响 |
| v4.2 | 2026-04-08 | 增加最小状态结构、参考更新公式，以及多轮轨迹视角 |
| v4.3 | 2026-04-08 | 增加跨平台兼容路线图，覆盖 OpenCode、Claude Code、Cursor、Windsurf 与 Antigravity |
| v4.4 | 2026-04-08 | 增加第一版 Claude Code 适配包，包含 `CLAUDE.md`、plugin 元数据、Claude skill 与 policy subagent |
| v4.5 | 2026-04-08 | 增加第一版 OpenCode 适配包，包含原生 `.opencode` skill 以及 `.claude`、`.agents` 镜像布局 |
| v4.6 | 2026-04-08 | 增加第一版 Windsurf 适配包，包含原生 skill、model-decision rule 与根级 `AGENTS.md` 指导 |
| v4.7 | 2026-04-08 | 增加第一版 Cursor 适配包，包含 MDC rule、根级 `AGENTS.md` 与 `CLAUDE.md` 兼容层 |
| v4.8 | 2026-04-08 | 增加正式 implementation spec、默认系数、策略映射，以及最小运行时 JSON schema |

## 许可证

MIT

## 作者

郭卓强 (Guo Zhuoqiang)
