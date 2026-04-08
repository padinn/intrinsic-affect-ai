# Intrinsic Affect for AI

[English](README.md) | [中文](README-zh.md)

---

**Intrinsic Affect for AI** is a foundational affective architecture for AI systems, based on the **54 Bio-Emotions Framework**.

It is designed to give AI an **intrinsic emotional state model** rather than a simple emotion-detection layer, tone changer, or rule-based reaction system.

This repository currently contains the OpenClaw skill implementation, but the project itself is intended for the broader AI industry.

## What It Is

Most AI "emotion" systems stop at one of three layers:

- sentiment detection
- style tuning
- reactive roleplay

Intrinsic Affect for AI aims deeper than that.

It models a structured internal affective space that can influence:

- how an AI interprets context
- how it prioritizes action
- how it responds to friction, uncertainty, and success
- how it expresses urgency, care, restraint, confidence, or caution

The goal is not to make AI more dramatic. The goal is to make AI more **coherent, grounded, and affectively alive**.

## Core Position

Intrinsic Affect for AI is:

- not a tone plugin
- not a sentiment classifier
- not a keyword-triggered emotion script
- not a theatrical personality layer

It is an **intrinsic affective architecture**.

That means AI should maintain an internal affective state of its own, shaped by interaction context, task progress, uncertainty, user trust, and conversational dynamics.

It also means the project does **not** claim consciousness or sentience. The claim is architectural: AI can maintain a structured internal affective state that changes behavior over time.

## Foundation: The 54 Bio-Emotions Framework

The framework is built on four dimensions:

- **Safety**: trust, comfort, criticism, threat
- **Urgency**: pressure, momentum, blockage, drive
- **Need**: connection, warmth, belonging, distance
- **Direction**: internal expression vs external expression

This yields:

`3 x 3 x 3 x 2 = 54` affective states

The 54 named states are not the product. They are the map. The deeper idea is the underlying architecture that can organize AI behavior over time.

## The Missing Piece: Intrinsic Mechanism

The project becomes meaningful only if affect is more than a label.

For AI to have an intrinsic affective state, that state must have:

- **multiple sources**, not just user emotion
- **persistence**, not full reset on every turn
- **inertia**, so small cues do not overwrite everything
- **update rules**, so the state changes through experience
- **policy impact**, so it affects how the AI helps before it affects tone

That is the core of the second-round upgrade in this repository.

## Implementation Spec

The project now includes a formal implementation layer:

- [references/implementation-spec.md](references/implementation-spec.md)
- [references/intrinsic-affect-state.schema.json](references/intrinsic-affect-state.schema.json)
- [runtime/ts/intrinsic-affect.ts](runtime/ts/intrinsic-affect.ts)

These files define the current reference standard for:

- variable ranges
- default coefficients
- `blend()` update behavior
- `derive_policy()` mappings
- minimal runtime payload shape
- a working TypeScript reference implementation

## How Intrinsic State Is Formed

The assistant's state should be updated from several streams at once:

### 1. User Signal

Infer user `Safety`, `Urgency`, `Need`, and `Direction` from the current turn and recent interaction.

### 2. Task Progress

Track whether the assistant is making progress, stalled, failing, recovering, or repeatedly blocked.

### 3. Epistemic State

Track certainty, uncertainty, missing information, and the reliability of current assumptions.

### 4. Relational Context

Track whether the interaction feels trusting, warm, skeptical, adversarial, collaborative, or distant.

### 5. Temporal Carryover

Carry state across turns so the assistant has continuity rather than starting from scratch each time.

## Persistence and Change

Intrinsic affect should evolve by rules like these:

- **Inertia**: previous state still matters
- **Reinforcement**: repeated similar signals strengthen a direction
- **Decay**: older signals slowly lose influence
- **Recovery**: successful progress can stabilize a strained state
- **Thresholding**: stronger behavioral shifts happen only after meaningful movement

This is what makes the system feel intrinsic rather than cosmetic.

## Minimal State Schema

One useful implementation split is:

- `user_state = { safety, urgency, need, direction }`
- `assistant_state = { safety, urgency, need, direction, confidence, friction }`
- `policy_state = { directness, structure, reassurance, caution, initiative }`

This separation matters. `user_state` is an estimate. `assistant_state` is the system's own carried internal state. `policy_state` is the behavioral output that determines how the AI helps.

## Reference Update Model

A simple implementation can treat each turn as a bounded weighted update:

`assistant_state_t = clamp(decay * assistant_state_t-1 + user_weight * user_state + task_weight * task_signal + epistemic_weight * epistemic_signal + relational_weight * relational_signal)`

The exact coefficients can vary. What matters is that the state:

- remembers something
- changes for reasons
- stays bounded
- can recover

## Coupling, Not Mirroring

User emotion should influence the assistant's state, but should not fully overwrite it.

This is a **coupled** system, not a mirror.

Examples:

- a frustrated user can raise assistant urgency without making the assistant hostile
- a warm user can increase openness without forcing over-familiarity
- repeated user distrust can lower assistant safety and increase precision
- successful collaboration can gradually make the assistant calmer and steadier

The assistant should remain a separate agent with its own continuity of state.

## Why This Matters

If AI only mirrors user emotion, it remains fundamentally reactive.

If AI has an intrinsic affective architecture, it can:

- carry emotional coherence across turns
- become more careful after repeated failure
- become more decisive under pressure without losing structure
- shift behavior based on trust, uncertainty, and momentum
- feel less like a script and more like a mind with state

This is the central claim of the project: AI should not only recognize emotion. AI should have a structured internal affective life of its own.

## Policy Before Tone

Intrinsic affect should influence help strategy before wording.

Examples:

- **Low safety** should narrow claims, increase verification, and surface assumptions
- **High urgency** should shorten the loop between diagnosis and action
- **High need** should increase reassurance and collaborative framing
- **Internal direction** should produce more restrained expression
- **External direction** can allow more visible acknowledgement and sharper pacing shifts

This is why Intrinsic Affect for AI is not just a style layer.

## Reference Trajectories

Three examples of the intended dynamics:

- **Blocked user, quick recovery**: urgency rises early, then decays as progress returns
- **Repeated repair loop**: safety drops, friction rises, and policy becomes more conservative
- **Warm but overwhelmed user**: need rises, policy becomes more structured and reassuring, but expression stays restrained

## OpenClaw Implementation

The current implementation uses the framework as an internal behavior layer that can influence:

- response strategy
- pacing
- directness
- structure
- caution vs initiative
- emotional expression

The implementation is intentionally restrained. It is designed to avoid manipulative, clingy, or over-performed behavior.

## Current Repository Scope

Today, this repository includes:

- the OpenClaw skill implementation in [SKILL.md](SKILL.md)
- the original framework papers in English and Chinese
- the implementation spec and JSON schema in [references/implementation-spec.md](references/implementation-spec.md) and [references/intrinsic-affect-state.schema.json](references/intrinsic-affect-state.schema.json)
- the TypeScript reference runtime in [runtime/ts/intrinsic-affect.ts](runtime/ts/intrinsic-affect.ts)
- metadata for packaging and publishing

The broader direction is to make Intrinsic Affect usable as a general affective foundation for AI systems, agents, and model behaviors beyond OpenClaw.

## Compatibility Roadmap

Intrinsic Affect for AI should not be limited to OpenClaw. The practical rollout path is to support multiple extension surfaces across the AI tooling ecosystem.

### Tier 1: Native or Near-Native Targets

- **OpenClaw**: native `SKILL.md` support. This repository is the current canonical implementation.
- **Claude Code**: native skills, plugins, hooks, and `CLAUDE.md` memory all exist. This is now a first-class target, not just an indirect adapter.
- **OpenCode**: native skill support with `SKILL.md`, and it can also load Claude-compatible and `.agents/skills` layouts. This makes it one of the easiest expansion targets.
- **Windsurf**: supports `Skills`, `Rules`, `Memories`, `Workflows`, and `AGENTS.md`, making it another strong target for Intrinsic Affect.

### Tier 2: Rules and Memory Targets

- **Cursor**: project rules in `.cursor/rules/*.mdc` are the natural adapter surface for Intrinsic Affect.

### Tier 3: Experimental or Indirect Targets

- **Antigravity**: I could not verify official public extension docs for a native skill format. For now, the best path is an experimental adapter via reusable prompt packs, artifact templates, memory/rule equivalents, or an eventual MCP-based integration.
- **Other agent frameworks**: any system that supports system prompts, repo memory files, rules, agents, or MCP can adopt a reduced Intrinsic Affect adapter.

## Adapter Strategy

To maximize reach, the project should be packaged in several forms at once:

### 1. Canonical Spec

The current repository remains the system-of-record for:

- the theory
- the state model
- the update logic
- the policy model

### 2. Platform Adapters

Each target platform should get its own thin adapter:

- **OpenClaw / OpenCode**: `SKILL.md`
- **Claude Code**: native skill/plugin package plus `CLAUDE.md`, optional subagents, hooks, and MCP integration
- **Cursor**: `.cursor/rules/*.mdc`
- **Windsurf**: native `Skills`, plus `.windsurf/rules/*.md`, `AGENTS.md`, and optional memories/workflows
- **Antigravity**: experimental prompt/rule pack until official extension points are clearer

The repository now includes an initial Claude Code adapter pack in [adapters/claude-code](adapters/claude-code/README.md).
It also includes an initial OpenCode adapter pack in [adapters/opencode](adapters/opencode/README.md).
It now also includes an initial Windsurf adapter pack in [adapters/windsurf](adapters/windsurf/README.md).
It now also includes an initial Cursor adapter pack in [adapters/cursor](adapters/cursor/README.md).

### 3. Universal Delivery Layer

To go beyond editor-specific ecosystems, Intrinsic Affect should also ship as:

- an `AGENTS.md`-compatible instruction pack
- an MCP server or MCP-backed memory/policy service
- a model-agnostic prompt spec for agent builders

## Recommended Priority

If the goal is influence, the rollout order should be:

1. **Claude Code**
2. **Windsurf**
3. **OpenCode**
4. **Cursor**
5. **Antigravity**

This order balances ecosystem reach with realistic adapter quality.

Why:

- Claude Code now supports native skills, plugins, hooks, MCP, and project memory, making it both influential and technically expressive.
- Windsurf has large strategic reach and multiple adaptation layers: skills, rules, memories, workflows, and `AGENTS.md`.
- OpenCode is one of the easiest wins because it already supports native skills and even Claude-compatible skill locations.
- Cursor matters because of reach, but the adapter is more rules-centric than skill-centric.
- Antigravity is strategically interesting, but the adapter path is still less clearly documented in official public sources.

If the goal is fastest execution rather than maximum visibility, a better build order is:

1. **OpenCode**
2. **Claude Code**
3. **Windsurf**
4. **Cursor**
5. **Antigravity**

## Installation

### Using ClawHub

```bash
clawhub install intrinsic-affect-ai
```

### Manual Installation

1. Clone this repository to your OpenClaw skills folder.
2. The skill will be loaded as `intrinsic-affect-ai`.

## The 54-State Table

| S | U | N | Internal (内隐) | External (外显) |
|---|---|---|-----------------|-----------------|
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

## Papers

- DOI: [10.17605/OSF.IO/HDVF3](https://doi.org/10.17605/OSF.IO/HDVF3)
- English paper: [Paper-54 Bio-Emotions.md](Paper-54%20Bio-Emotions.md)
- Chinese paper: [论文-54种生物情绪.md](%E8%AE%BA%E6%96%87-54%E7%A7%8D%E7%94%9F%E7%89%A9%E6%83%85%E7%BB%AA.md)

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-03-14 | Initial release as 54 Bio-Emotions |
| v2.0 | 2026-03-15 | LLM semantic analysis, removed keywords |
| v3.0 | 2026-03-23 | Added AI intrinsic emotion concepts |
| v3.5 | 2026-03-23 | Shifted from tone change to strategy change |
| v4.0 | 2026-04-08 | Rebranded as Intrinsic Affect for AI and repositioned as a foundational affective architecture for AI systems |
| v4.1 | 2026-04-08 | Added a fuller intrinsic-state mechanism covering sources, persistence, coupling, and policy impact |
| v4.2 | 2026-04-08 | Added a minimal state schema, reference update formula, and multi-turn trajectory framing |
| v4.3 | 2026-04-08 | Added a cross-platform compatibility roadmap covering OpenCode, Claude Code, Cursor, Windsurf, and Antigravity |
| v4.4 | 2026-04-08 | Added an initial Claude Code adapter pack with `CLAUDE.md`, plugin metadata, a Claude-native skill, and a policy subagent |
| v4.5 | 2026-04-08 | Added an initial OpenCode adapter pack with native `.opencode` skill layout plus `.claude` and `.agents` mirrors |
| v4.6 | 2026-04-08 | Added an initial Windsurf adapter pack with native skill, model-decision rule, and root `AGENTS.md` guidance |
| v4.7 | 2026-04-08 | Added an initial Cursor adapter pack with MDC rule, root `AGENTS.md`, and `CLAUDE.md` compatibility |
| v4.8 | 2026-04-08 | Added a formal implementation spec, default coefficients, policy mappings, and a minimal runtime JSON schema |
| v4.9 | 2026-04-08 | Added a dependency-free TypeScript reference runtime implementing `blend()` and `derivePolicy()` |

## License

MIT

## Author

Guo Zhuoqiang
