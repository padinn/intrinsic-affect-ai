export type Axis = number
export type Scalar01 = number

export interface UserState {
  safety: Axis
  urgency: Axis
  need: Axis
  direction: Axis
}

export interface AssistantState {
  safety: Axis
  urgency: Axis
  need: Axis
  direction: Axis
  confidence: Scalar01
  friction: Scalar01
}

export interface PolicyState {
  directness: Scalar01
  structure: Scalar01
  reassurance: Scalar01
  caution: Scalar01
  initiative: Scalar01
}

export interface TaskSignal {
  progress: Axis
  blockage: Scalar01
  success: Scalar01
  failure: Scalar01
}

export interface EpistemicSignal {
  certainty: Scalar01
  ambiguity: Scalar01
  evidence: Scalar01
}

export interface RelationalSignal {
  trust: Axis
  warmth: Axis
  hostility: Scalar01
  collaboration: Scalar01
}

export interface RuntimePayload {
  version: "0.1"
  user_state: UserState
  assistant_state: AssistantState
  policy_state: PolicyState
}

export interface UpdateInput {
  userState: UserState
  assistantState: AssistantState
  taskSignal: TaskSignal
  epistemicSignal: EpistemicSignal
  relationalSignal: RelationalSignal
}

export interface UpdateOutput {
  userState: UserState
  assistantState: AssistantState
  policyState: PolicyState
  runtimePayload: RuntimePayload
}

export interface Coefficients {
  axisDecay: number
  confidenceDecay: number
  frictionDecay: number
}

export const DEFAULT_COEFFICIENTS: Coefficients = {
  axisDecay: 0.72,
  confidenceDecay: 0.78,
  frictionDecay: 0.82,
}

export const DEFAULT_USER_STATE: UserState = {
  safety: 0,
  urgency: 0,
  need: 0,
  direction: 0,
}

export const DEFAULT_ASSISTANT_STATE: AssistantState = {
  safety: 0,
  urgency: 0,
  need: 0,
  direction: 0,
  confidence: 0.5,
  friction: 0,
}

export const DEFAULT_POLICY_STATE: PolicyState = {
  directness: 0.5,
  structure: 0.5,
  reassurance: 0.5,
  caution: 0.5,
  initiative: 0.5,
}

export const DEFAULT_TASK_SIGNAL: TaskSignal = {
  progress: 0,
  blockage: 0,
  success: 0,
  failure: 0,
}

export const DEFAULT_EPISTEMIC_SIGNAL: EpistemicSignal = {
  certainty: 0.5,
  ambiguity: 0,
  evidence: 0.5,
}

export const DEFAULT_RELATIONAL_SIGNAL: RelationalSignal = {
  trust: 0,
  warmth: 0,
  hostility: 0,
  collaboration: 0.5,
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function normalizeAxis(value: number): number {
  return clamp((value + 1) / 2, 0, 1)
}

function blendAxis(previous: Axis, delta: number, decay: number): Axis {
  return clamp(decay * previous + (1 - decay) * delta, -1, 1)
}

function blendScalar01(previous: Scalar01, signal: number, decay: number): Scalar01 {
  return clamp(decay * previous + (1 - decay) * signal, 0, 1)
}

export function blendAssistantState(
  input: UpdateInput,
  coefficients: Coefficients = DEFAULT_COEFFICIENTS
): AssistantState {
  const { userState, assistantState, taskSignal, epistemicSignal, relationalSignal } = input
  const { axisDecay, confidenceDecay, frictionDecay } = coefficients

  const safetyDelta =
    0.3 * userState.safety +
    0.2 * taskSignal.progress -
    0.35 * taskSignal.blockage +
    0.25 * epistemicSignal.certainty +
    0.2 * relationalSignal.trust

  const urgencyDelta =
    0.35 * userState.urgency +
    0.3 * taskSignal.blockage -
    0.15 * taskSignal.progress +
    0.1 * epistemicSignal.ambiguity +
    0.1 * relationalSignal.hostility

  const needDelta =
    0.35 * userState.need +
    0.2 * relationalSignal.warmth +
    0.15 * relationalSignal.collaboration -
    0.1 * relationalSignal.hostility

  const directionDelta =
    0.4 * userState.direction +
    0.2 * relationalSignal.warmth +
    0.15 * relationalSignal.hostility

  const confidenceSignal =
    0.3 * epistemicSignal.certainty +
    0.2 * epistemicSignal.evidence +
    0.2 * taskSignal.progress +
    0.15 * relationalSignal.collaboration +
    0.15 * normalizeAxis(relationalSignal.trust) -
    0.2 * taskSignal.blockage -
    0.15 * epistemicSignal.ambiguity

  const frictionSignal =
    0.35 * taskSignal.blockage +
    0.2 * taskSignal.failure +
    0.15 * epistemicSignal.ambiguity +
    0.15 * relationalSignal.hostility -
    0.15 * taskSignal.progress -
    0.1 * taskSignal.success

  return {
    safety: blendAxis(assistantState.safety, safetyDelta, axisDecay),
    urgency: blendAxis(assistantState.urgency, urgencyDelta, axisDecay),
    need: blendAxis(assistantState.need, needDelta, axisDecay),
    direction: blendAxis(assistantState.direction, directionDelta, axisDecay),
    confidence: blendScalar01(assistantState.confidence, confidenceSignal, confidenceDecay),
    friction: blendScalar01(assistantState.friction, frictionSignal, frictionDecay),
  }
}

export function derivePolicyState(assistantState: AssistantState): PolicyState {
  const S = normalizeAxis(assistantState.safety)
  const U = normalizeAxis(assistantState.urgency)
  const N = normalizeAxis(assistantState.need)
  const D = normalizeAxis(assistantState.direction)
  const C = assistantState.confidence
  const F = assistantState.friction

  return {
    directness: clamp(
      0.4 * U + 0.25 * C + 0.15 * D + 0.1 * (1 - N) + 0.1 * (1 - F),
      0,
      1
    ),
    structure: clamp(
      0.3 * F + 0.25 * (1 - S) + 0.2 * U + 0.25 * (1 - C),
      0,
      1
    ),
    reassurance: clamp(
      0.35 * N + 0.3 * (1 - S) + 0.2 * (1 - F) + 0.15 * (1 - U),
      0,
      1
    ),
    caution: clamp(
      0.35 * (1 - S) + 0.3 * F + 0.2 * (1 - C) + 0.15 * U,
      0,
      1
    ),
    initiative: clamp(
      0.35 * C + 0.3 * U + 0.2 * S + 0.15 * (1 - F),
      0,
      1
    ),
  }
}

export function updateIntrinsicAffect(
  input: UpdateInput,
  coefficients: Coefficients = DEFAULT_COEFFICIENTS
): UpdateOutput {
  const assistantState = blendAssistantState(input, coefficients)
  const policyState = derivePolicyState(assistantState)

  return {
    userState: input.userState,
    assistantState,
    policyState,
    runtimePayload: {
      version: "0.1",
      user_state: input.userState,
      assistant_state: assistantState,
      policy_state: policyState,
    },
  }
}
