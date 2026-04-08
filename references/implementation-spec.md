# Intrinsic Affect for AI: Implementation Spec

Version: `0.1`

This document defines a minimal, implementation-oriented specification for **Intrinsic Affect for AI**.

It is designed to help other AI systems adopt the model as a standard behavioral layer rather than as a loose prompt-writing idea.

## Scope

This spec defines:

- canonical state objects
- variable ranges
- default signal shapes
- a reference `blend()` rule
- a reference `derive_policy()` mapping
- a minimal runtime payload shape
- conformance test vectors

This spec does **not** require every implementation to use the exact same coefficients. It defines a stable default that other systems can adopt, compare against, or extend.

## Canonical State Objects

### User State

```json
{
  "safety": 0.0,
  "urgency": 0.0,
  "need": 0.0,
  "direction": 0.0
}
```

### Assistant State

```json
{
  "safety": 0.0,
  "urgency": 0.0,
  "need": 0.0,
  "direction": 0.0,
  "confidence": 0.5,
  "friction": 0.0
}
```

### Policy State

```json
{
  "directness": 0.5,
  "structure": 0.5,
  "reassurance": 0.5,
  "caution": 0.5,
  "initiative": 0.5
}
```

## Variable Ranges

Use bounded scalar ranges so implementations remain stable and interpretable.

### Affective Axes

- `safety`: `[-1.0, 1.0]`
- `urgency`: `[-1.0, 1.0]`
- `need`: `[-1.0, 1.0]`
- `direction`: `[-1.0, 1.0]`

Interpretation:

- `-1.0` = strongly low / internal side
- `0.0` = neutral / balanced
- `1.0` = strongly high / external side

For `direction` specifically:

- `-1.0` = strongly internal
- `0.0` = mixed / neutral
- `1.0` = strongly external

### Stability and Load Variables

- `confidence`: `[0.0, 1.0]`
- `friction`: `[0.0, 1.0]`

Interpretation:

- `confidence = 0.0` means no reliable confidence in the next move
- `confidence = 1.0` means very steady operational confidence
- `friction = 0.0` means little strain
- `friction = 1.0` means high accumulated strain from blockage, distrust, or repeated repair loops

### Policy Variables

- `directness`: `[0.0, 1.0]`
- `structure`: `[0.0, 1.0]`
- `reassurance`: `[0.0, 1.0]`
- `caution`: `[0.0, 1.0]`
- `initiative`: `[0.0, 1.0]`

## Signal Objects

Implementations may infer signals however they want, but the reference model expects these shapes.

### Task Signal

```json
{
  "progress": 0.0,
  "blockage": 0.0,
  "success": 0.0,
  "failure": 0.0
}
```

Ranges:

- `progress`: `[-1.0, 1.0]`
- `blockage`: `[0.0, 1.0]`
- `success`: `[0.0, 1.0]`
- `failure`: `[0.0, 1.0]`

### Epistemic Signal

```json
{
  "certainty": 0.5,
  "ambiguity": 0.0,
  "evidence": 0.5
}
```

Ranges:

- `certainty`: `[0.0, 1.0]`
- `ambiguity`: `[0.0, 1.0]`
- `evidence`: `[0.0, 1.0]`

### Relational Signal

```json
{
  "trust": 0.0,
  "warmth": 0.0,
  "hostility": 0.0,
  "collaboration": 0.5
}
```

Ranges:

- `trust`: `[-1.0, 1.0]`
- `warmth`: `[-1.0, 1.0]`
- `hostility`: `[0.0, 1.0]`
- `collaboration`: `[0.0, 1.0]`

## Helper Functions

### Clamp

```text
clamp(x, lo, hi) = min(max(x, lo), hi)
```

### Normalize Axis

For affective axes:

```text
norm(x) = (x + 1.0) / 2.0
```

This maps `[-1, 1]` to `[0, 1]`.

## Default Coefficients

These are reference defaults.

### Persistence

- `axis_decay = 0.72`
- `confidence_decay = 0.78`
- `friction_decay = 0.82`

### Source Weights

- `user_weight = 0.35`
- `task_weight = 0.30`
- `epistemic_weight = 0.20`
- `relational_weight = 0.15`

These do not have to sum to `1.0` inside every implementation because they are applied inside bounded updates, but they should preserve the same rough balance:

- user signal matters a lot
- task signal matters almost as much
- epistemic signal meaningfully shapes safety and confidence
- relational signal is important but should not dominate

## Reference `blend()` Rule

The reference update is defined dimension-by-dimension.

### Safety

```text
safety_delta =
  0.30 * user.safety +
  0.20 * task.progress -
  0.35 * task.blockage +
  0.25 * epistemic.certainty +
  0.20 * relational.trust

assistant.safety_next =
  clamp(axis_decay * assistant.safety + (1 - axis_decay) * safety_delta, -1.0, 1.0)
```

### Urgency

```text
urgency_delta =
  0.35 * user.urgency +
  0.30 * task.blockage -
  0.15 * task.progress +
  0.10 * epistemic.ambiguity +
  0.10 * relational.hostility

assistant.urgency_next =
  clamp(axis_decay * assistant.urgency + (1 - axis_decay) * urgency_delta, -1.0, 1.0)
```

### Need

```text
need_delta =
  0.35 * user.need +
  0.20 * relational.warmth +
  0.15 * relational.collaboration -
  0.10 * relational.hostility

assistant.need_next =
  clamp(axis_decay * assistant.need + (1 - axis_decay) * need_delta, -1.0, 1.0)
```

### Direction

```text
direction_delta =
  0.40 * user.direction +
  0.20 * relational.warmth +
  0.15 * relational.hostility

assistant.direction_next =
  clamp(axis_decay * assistant.direction + (1 - axis_decay) * direction_delta, -1.0, 1.0)
```

### Confidence

```text
confidence_signal =
  0.30 * epistemic.certainty +
  0.20 * epistemic.evidence +
  0.20 * task.progress +
  0.15 * relational.collaboration +
  0.15 * norm(relational.trust) -
  0.20 * task.blockage -
  0.15 * epistemic.ambiguity

assistant.confidence_next =
  clamp(
    confidence_decay * assistant.confidence +
    (1 - confidence_decay) * confidence_signal,
    0.0,
    1.0
  )
```

### Friction

```text
friction_signal =
  0.35 * task.blockage +
  0.20 * task.failure +
  0.15 * epistemic.ambiguity +
  0.15 * relational.hostility -
  0.15 * task.progress -
  0.10 * task.success

assistant.friction_next =
  clamp(
    friction_decay * assistant.friction +
    (1 - friction_decay) * friction_signal,
    0.0,
    1.0
  )
```

## Reference `derive_policy()` Mapping

`derive_policy()` should operate on `assistant_state` and may optionally include `user_state` for stronger user sensitivity.

The reference mapping uses normalized assistant axes:

```text
S = norm(assistant.safety)
U = norm(assistant.urgency)
N = norm(assistant.need)
D = norm(assistant.direction)
C = assistant.confidence
F = assistant.friction
```

### Directness

```text
directness =
  clamp(
    0.40 * U +
    0.25 * C +
    0.15 * D +
    0.10 * (1 - N) +
    0.10 * (1 - F),
    0.0,
    1.0
  )
```

### Structure

```text
structure =
  clamp(
    0.30 * F +
    0.25 * (1 - S) +
    0.20 * U +
    0.25 * (1 - C),
    0.0,
    1.0
  )
```

### Reassurance

```text
reassurance =
  clamp(
    0.35 * N +
    0.30 * (1 - S) +
    0.20 * (1 - F) +
    0.15 * (1 - U),
    0.0,
    1.0
  )
```

### Caution

```text
caution =
  clamp(
    0.35 * (1 - S) +
    0.30 * F +
    0.20 * (1 - C) +
    0.15 * U,
    0.0,
    1.0
  )
```

### Initiative

```text
initiative =
  clamp(
    0.35 * C +
    0.30 * U +
    0.20 * S +
    0.15 * (1 - F),
    0.0,
    1.0
  )
```

## Reference `derive_expression()` Guidance

`derive_expression()` should remain downstream from policy.

High-level rules:

- high `directness` -> shorter lead-in, answer earlier
- high `structure` -> more lists, sequencing, framing
- high `reassurance` -> more collaborative and supportive wording
- high `caution` -> narrower claims, explicit assumptions, more verification language
- high `initiative` -> stronger next-step proposals and less passivity

Expression should never outrun policy.

## Minimal Runtime Payload

The minimal runtime payload shape is:

```json
{
  "version": "0.1",
  "user_state": {
    "safety": 0.0,
    "urgency": 0.0,
    "need": 0.0,
    "direction": 0.0
  },
  "assistant_state": {
    "safety": 0.0,
    "urgency": 0.0,
    "need": 0.0,
    "direction": 0.0,
    "confidence": 0.5,
    "friction": 0.0
  },
  "policy_state": {
    "directness": 0.5,
    "structure": 0.5,
    "reassurance": 0.5,
    "caution": 0.5,
    "initiative": 0.5
  }
}
```

## Conformance Test Vectors

Reference vectors live in:

- `references/conformance-vectors.json`

Each vector provides:

- a fixed input state
- a reference output from the official TypeScript runtime
- a default numeric tolerance

These vectors are meant to help other implementations answer a simple question:

**Does my implementation behave closely enough to the reference model to be considered compatible?**

## Conformance Notes

An implementation can be considered minimally conformant if it:

- uses the canonical state object names
- respects the defined variable ranges
- preserves persistence across turns
- distinguishes `assistant_state` from `user_state`
- derives `policy_state` from affect instead of skipping directly to wording
- preserves safety boundaries against manipulation and theatricality

## Safety Constraints

All conformant implementations should keep these guardrails:

- affect must not override correctness, safety, task completion, or clarity
- affect must not justify dishonesty or overclaiming
- affect must not simulate emotional dependency
- affect must not be used to claim consciousness or sentience
- if inference is weak, implementations should stay closer to neutral
