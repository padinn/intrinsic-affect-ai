# TypeScript Reference Runtime

This directory contains the minimal TypeScript reference runtime for **Intrinsic Affect for AI**.

It is intentionally small and dependency-free.

## Included

- `intrinsic-affect.ts`
  Reference implementation of:
  - `clamp`
  - `normalizeAxis`
  - `blendAssistantState`
  - `derivePolicyState`
  - `updateIntrinsicAffect`
  - default coefficient constants
  - core TypeScript types

## Goal

This runtime is not meant to be the only implementation.

It exists to:

- turn the implementation spec into working code
- give adopters a stable reference point
- reduce ambiguity around the standard behavior

Canonical references:

- [../../references/implementation-spec.md](../../references/implementation-spec.md)
- [../../references/intrinsic-affect-state.schema.json](../../references/intrinsic-affect-state.schema.json)
- [../../references/conformance-vectors.json](../../references/conformance-vectors.json)
