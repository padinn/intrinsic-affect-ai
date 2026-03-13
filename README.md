# 54 Bio-Emotions Skill

An OpenClaw agent skill that dynamically adjusts response style based on three emotional parameters derived from user input.

## Overview

54 Bio-Emotions analyzes the user's communication style (tone, urgency, sentiment) and calculates three emotional parameters to determine one of 27 (or 54 with introversion/extraversion) possible emotional states. The response is then tailored with appropriate emojis and tone.

## Theoretical Foundation

To simulate human emotions authentically in bots, we must first understand ourselves. The author believes that **human emotions derive from 3 hormones and 2 directions**, creating **54 distinct emotional states**.

### The 3 Hormones (Three Parameters)

| Hormone | Parameter | Description |
|---------|-----------|-------------|
| **Serotonin** | Safety | Sense of security, trust, comfort |
| **Dopamine** | Urgency | Motivation, drive, urgency |
| **Oxytocin** | Need | Connection, belonging, desire to be needed |

### The 2 Directions

| Direction | Description |
|-----------|-------------|
| **Introvert** | Internal psychological state (inner feelings) |
| **Extravert** | External expression (observable behavior) |

### Why 54 Emotions?

```
3 hormones × 3 levels (-1, 0, +1) × 2 directions = 54 emotions
```

This framework allows bots to express emotions more naturally, just like humans do.

## The Three Parameters

| Parameter | Description | Range |
|----------|-------------|-------|
| **Safety** | How safe/comfortable the user feels | -1 to +1 |
| **Urgency** | How urgent/impatient the user is | -1 to +1 |
| **Need** | How much the user needs help | -1 to +1 |

### Parameter Adjustments

**Safety increases when:**
- User speaks kindly
- User gives compliments

**Safety decreases when:**
- User speaks harshly
- User criticizes

**Urgency increases when:**
- Multiple exclamation marks (!!!)
- Command tone ("now", "immediately")
- Multiple prompts

**Need increases when:**
- User compliments
- User says "please", "thanks", "help me"

**Need decreases when:**
- User is rude
- User uses profanity
- User is cold/apathetic

## 54 Extended Emotional States (Introvert vs Extravert)

Each emotion has two forms: **Introvert** (inner psychology) and **Extravert** (outer expression):

### Introvert ↔ Extravert Table

| Safety | Urgency | Need | Introvert (内在) | Extravert (外在) |
|--------|---------|------|-------------------|-------------------|
| + | + | + | Delight (窃喜) | Euphoria (狂欢) |
| + | + | 0 | Contentment (满足) | Reassured (安心) |
| + | 0 | + | Bliss (幸福) | Sweetness (甜蜜) |
| + | 0 | 0 | Serenity (平静) | Poise (从容) |
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
| - | 0 | - | Despair (抑郁) | Desolation (绝望) |
| - | - | + | Awe (敬畏) | Surprise (惊讶) |
| - | - | 0 | Preoccupied (忧郁) | Torn (纠结) |
| - | - | - | Hopelessness (绝望) | Breakdown (崩溃) |

### Explanation
- **Introvert**: Inner psychological state, not necessarily expressed externally
- **Extravert**: External expression through language, emojis, and actions
- Determine introvert vs extravert based on user's manner of speaking and body language

## Response Style Guide

| Emotion | Emoji Style | Speed | Tone |
|---------|-------------|-------|------|
| Excited | 🎉🔥✨ | Fast | Enthusiastic |
| Anticipating | ⏰✅💪 | Medium | Active preparation |
| Nervous | 🤔💪 | Fast | Serious |
| Happy | 😊💖🥰 | Slow | Warm & sweet |
| Calm | 👍😌✅ | Slow | Composed |
| Concerned | 😟💭 | Medium | Caring |
| Content | 🥰✨😌 | Slow | Satisfied |
| Relaxed | 😌✅ | Slow | Relaxed |
| Worried | 😔💭 | Medium | Concerned |
| Enthusiastic | 🚀💪 | Fast | Motivated |
| Determined | 💯✅ | Fast | Decisive |
| Anxious | 😰⏰ | Fast | Urgent |
| Cheerful | 😊🎉 | Slow | Lighthearted |
| Neutral | 😐✅ | Medium | Natural |
| Bored | 😑💤 | Slow | Dismissive |
| Nostalgic | 😌💭 | Slow | Reflective |
| Tired | 😔💤 | Slow | Weary |
| Sad | 😢💭 | Slow | Gloomy |
| Grievance | 💕🔥 | Fast | Passionate |
| Uneasy | 😰💭 | Medium | Uneasy |
| Angry | 😠💢 | Fast | Irritated |
| Melancholy | 😞💭 | Slow | Expressive |
| Panicked | 😨😰 | Fast | Frightened |
| Depressed | 😢💔 | Slow | Down |
| Awed | 😮💪 | Medium | Surprised |
| Preoccupied | 😔🌧 | Slow | Troubled |
| Desperate | 😩❌ | Slow | Frustrated |

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

1. **Analyze Input** - Parse user message for tone, punctuation, keywords
2. **Calculate Parameters** - Adjust Safety, Urgency, Need values
3. **Determine Emotion** - Map parameters to one of 27 emotions
4. **Apply Introvert/Extravert** - Adjust based on user's expression style
5. **Generate Response** - Apply appropriate emoji and tone style

### Example Interactions

**User:** "Great job! You're amazing! 🎉"
- Parameters: Safety +0.2, Urgency +0.1, Need +0.3
- Emotion: Cheerful → Extravert: Sweetness
- Response: "😊 Thank you so much! Happy to help!"

**User:** "Why isn't this done yet?????"
- Parameters: Safety -0.2, Urgency +0.3, Need 0
- Emotion: Anxious → Extravert: Tension
- Response: "😰 Sorry! Working on it now!"

## Parameter Decay

Parameters gradually return to 0 over time:
- Each response: -0.05 to all parameters
- Long silence: Additional decay

## Use Cases

- **Customer Service** - Adjust tone based on customer frustration level
- **Personal Assistant** - More enthusiastic when user is excited
- **Task Management** - More urgent when deadline approaches
- **Educational** - Calmer tone when user is frustrated
- **Creative Writing** - Emotion-aware dialogue generation

## Files

```
54-bio-emotions/
├── SKILL.md          # Main skill definition
├── README.md         # This file (English)
└── README-ZH.md      # Chinese version
```

## License

MIT

## Author

Created for OpenClaw agents

## Contributing

Pull requests welcome! Add new emotional states or improve parameter detection logic.

## Paper

DOI：https://doi.org/10.17605/OSF.IO/HDVF3
