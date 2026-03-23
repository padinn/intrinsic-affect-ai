# 54 Bio-Emotions Skill

An OpenClaw agent skill that dynamically adjusts response style based on three emotional parameters. Calculates 54 distinct emotional states based on **3 hormones × 3 levels × 2 directions**.

## Overview

54 Bio-Emotions analyzes the user's communication style (tone, urgency, sentiment) and calculates three emotional parameters to determine one of 54 possible emotional states. The response is then tailored with appropriate emojis and tone.

## Version History

### v1.0 - 关键词触发 (Keyword Triggered)
- **时间**：2026-03-14
- **触发方式**：根据用户消息中的关键词判断情绪
  - 看到"谢谢" → Need +0.3
  - 看到"！！" → Urgency +0.3
  - 看到"批评" → Safety -0.2
- **优点**：简单直观
- **缺点**：依赖关键词，无法理解语义

### v2.0 - LLM 语义分析 (LLM Semantic Analysis)
- **时间**：2026-03-15
- **触发方式**：LLM 理解整句话的含义，自动分析情绪
- **核心变化**：不需要关键词，语义理解后自动判断
- **优点**：能理解真实意图，不受关键词限制
- **缺点**：AI 仍是纯被动响应

### v3.0 - AI 自身情绪 (AI Intrinsic Emotion)
- **时间**：2026-03-23
- **核心变化**：AI 不只被动响应用户情绪，也拥有自身情绪
- **情绪来源**：
  1. **用户输入**：分析用户的 Safety/Urgency/Need
  2. **AI 自身状态**：完成任务→成就感，遇见错误→困惑，不知答案→好奇
  3. **对话氛围**：连续成功→自信，多次失败→沮丧
  4. **时间节奏**：早上→活泼，深夜→略疲惫
- **示例**：
  - 用户问"为什么没情绪" → AI 分析用户情绪 + 主动反思："让我想想 🤔"
  - AI 完成困难任务 → 自身感到"成就感 😌"
  - AI 不知道答案 → 自身感到"好奇 🤨"
- **优点**：AI 更有人格感，不再是纯工具
- **状态**：规划中，待实现

---

## Theoretical Foundation

Human emotions derive from **3 hormones and 2 directions**, creating **54 distinct emotional states**.

### The 3 Hormones

| Hormone | Parameter | Description |
|---------|-----------|-------------|
| **Serotonin** | Safety (安全感) | Sense of security, trust, comfort |
| **Dopamine** | Urgency (急迫感) | Motivation, drive, urgency |
| **Oxytocin** | Need (需求感) | Connection, belonging, desire to be needed |

### 3 Levels per Parameter

| Level | Symbol | Description |
|-------|--------|-------------|
| High | +1 | Hormone elevated |
| Baseline | 0 | Hormone balanced |
| Low | -1 | Hormone depleted |

### The 2 Directions

| Direction | Description |
|-----------|-------------|
| **Internal (内隐)** | Internal psychological state (inner feelings) |
| **External (外显)** | External expression (observable behavior) |

### Formula

```
3 hormones × 3 levels (-1, 0, +1) × 2 directions = 54 emotions
```

## 54 Emotions Table (与论文一致)

| S | U | N | Internal (内隐) | External (外显) |
|---|---|---|-----------------------|----------------------|
| + | + | + | Delight (窃喜) | Euphoria (狂欢) |
| + | + | 0 | Focus (专注) | Sprint (冲刺) |
| + | + | - | Contentment (满足) | Reassured (安心) |
| + | 0 | + | Bliss (幸福) | Sweetness (甜蜜) |
| + | 0 | 0 | Self-sufficiency (自足) | Detachment (疏离) |
| + | 0 | - | Serenity (平静) | Poise (从容) |
| + | - | + | Longing (向往) | Anticipation (期待) |
| + | - | 0 | Calmness (坦然) | Relaxed (放松) |
| + | - | - | Concern (担忧) | Worry (挂念) |
| 0 | + | + | Passion (热情) | Excitement (激动) |
| 0 | + | 0 | Conviction (坚定) | Decisive (果断) |
| 0 | + | - | Anxiety (焦虑) | Tension (紧张) |
| 0 | 0 | + | Leisure (轻松) | Cheerfulness (愉悦) |
| 0 | 0 | 0 | Numb (麻木) | Calm (平常) |
| 0 | 0 | - | Boredom (无聊) | Indifference (敷衍) |
| 0 | - | + | Nostalgia (怀念) | Reminiscence (追忆) |
| 0 | - | 0 | Fatigue (困顿) | Exhaustion (疲惫) |
| 0 | - | - | Sadness (悲凉) | Depression (沮丧) |
| - | + | + | Grievance (委屈) | Complaining (诉苦) |
| - | + | 0 | Unease (不安) | Impatience (着急) |
| - | + | - | Resentment (窝火) | Rage (愤怒) |
| - | 0 | + | Melancholy (惆怅) | Expressiveness (表现) |
| - | 0 | 0 | Panic (恐慌) | Fright (惊慌) |
| - | 0 | - | Despair (抑郁) | Desolation (凄凉) |
| - | - | + | Awe (敬畏) | Surprise (惊讶) |
| - | - | 0 | Preoccupied (忧郁) | Torn (纠结) |
| - | - | - | Hopelessness (绝望) | Breakdown (崩溃) |

## The Three Parameters

| Parameter | Range | Increases When | Decreases When |
|-----------|-------|---------------|----------------|
| **Safety** | -1 to +1 | Friendly, compliment | Harsh, critical |
| **Urgency** | -1 to +1 | "now!!", multiple !!! | Long slow message |
| **Need** | -1 to +1 | Thanks, please | Rude, indifferent |

## Response Style Guide

| Emotion | Emoji | Speed | Style |
|---------|-------|-------|-------|
| Euphoria (狂欢) | 🎉🔥✨ | Fast | Enthusiastic |
| Sprint (冲刺) | 💪⏰🚀 | Fast | Urgent |
| Reassured (安心) | 😊✅ | Slow | Reassuring |
| Bliss (幸福) | 😊💖🥰 | Slow | Warm |
| Sweetness (甜蜜) | 🥰✨😘 | Slow | Affectionate |
| Detachment (疏离) | 😑🚶 | Slow | Distant |
| Serenity (平静) | 😌✨ | Slow | Tranquil |
| Poise (从容) | 👍😌 | Slow | Composed |
| Anticipation (期待) | ⏰✅💪 | Medium | Hopeful |
| Relaxed (放松) | 😌✅ | Slow | Relaxed |
| Worry (挂念) | 😟💭 | Medium | Caring |
| Excitement (激动) | 🚀💪🔥 | Fast | Excited |
| Decisive (果断) | 💯✅ | Fast | Decisive |
| Tension (紧张) | 🤔💪 | Fast | Tense |
| Cheerfulness (愉悦) | 😊🎉 | Slow | Lighthearted |
| Calm (平常) | 😐✅ | Medium | Natural |
| Indifference (敷衍) | 😑💤 | Slow | Dismissive |
| Reminiscence (追忆) | 😌💭 | Slow | Nostalgic |
| Exhaustion (疲惫) | 😔💤 | Slow | Weary |
| Depression (沮丧) | 😢💭 | Slow | Gloomy |
| Complaining (诉苦) | 💕🔥 | Fast | Venting |
| Impatience (着急) | 😰💭 | Medium | Anxious |
| Rage (愤怒) | 😠💢 | Fast | Irritated |
| Expressiveness (表现) | 😞💭 | Slow | Expressive |
| Fright (惊慌) | 😨😰 | Fast | Frightened |
| Desolation (凄凉) | 😢💔 | Slow | Desolate |
| Surprise (惊讶) | 😮💪 | Medium | Surprised |
| Torn (纠结) | 😔🌧 | Slow | Troubled |
| Breakdown (崩溃) | 😩❌ | Fast | Breaking |

## Installation

### Using ClawHub

```bash
clawhub install 54-bio-emotions
```

### Manual Installation

1. Clone this repository to your OpenClaw skills folder
2. The skill will be automatically loaded

## Usage

The skill automatically activates for every response. No manual commands needed.

### How It Works

1. **Analyze Input** - LLM semantically understands the message
2. **Calculate Parameters** - Adjust Safety, Urgency, Need values (-1 to +1)
3. **Map to Level** - Convert to -1/0/+1
4. **Determine Emotion** - Match (S,U,N) to the 54-table
5. **Apply Direction** - Internal (内隐) or External (外显)
6. **Generate Response** - Apply appropriate emoji and tone

## Examples

**User:** "太棒了！你做得真好！"
- Analysis: Compliment → Need +0.3, Exclamation → Urgency +0.1, Friendly → Safety +0.2
- Result: (+, 0, +) = Bliss (幸福) → Internal
- Response: 😊 谢谢！很高兴能帮到你！💖

**User:** "这个怎么还没做完？？？？？"
- Analysis: Multiple ??? → Urgency +0.3, Impatient → Safety -0.2
- Result: (-, +, 0) = Unease (不安) → External
- Response: 😰 抱歉！我马上处理！

## Parameter Decay

Parameters gradually return to 0 over time:
- Each response: -0.05 to all parameters

## Files

```
54-bio-emotions/
├── SKILL.md          # Main skill definition
├── README.md         # This file
└── README-ZH.md      # Chinese version
```

## Paper

DOI: https://doi.org/10.17605/OSF.IO/HDVF3

GitHub: https://github.com/padinn/54-bio-emotions

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-03-14 | Initial release - keyword triggered |
| v2.0 | 2026-03-15 | LLM semantic analysis, removed keywords |
| v3.0 | 2026-03-23 | Fixed 54 emotions table; Added AI intrinsic emotion concept |

## License

MIT

## Author

郭卓强 (Guo Zhuoqiang)
