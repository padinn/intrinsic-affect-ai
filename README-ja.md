# Intrinsic Affect for AI

[English](README.md) | [中文](README-zh.md) | [日本語](README-ja.md)

---

> **感情のロールプレイではありません。感情分析でもありません。**
> **Intrinsic Affect for AI は、AI に持続する内部情動状態を与えます。**

**Intrinsic Affect for AI** は、**54 Bio-Emotions Framework** を基盤とする、AI システム向けの基礎的な情動アーキテクチャです。

これは単純な感情検出層、トーン変更器、あるいはルールベースの反応システムではなく、AI に**内在的な情動状態モデル**を与えることを目的としています。

このリポジトリには現在 OpenClaw の skill 実装が含まれていますが、プロジェクト自体は OpenClaw に限定されず、より広い AI 業界を対象としています。

## それは何か

多くの AI における「感情」機能は、次の3層のどこかで止まっています。

- 感情認識
- スタイル調整
- 反応的ロールプレイ

Intrinsic Affect for AI は、それより深い層を目指します。

これは、AI の次のような振る舞いに影響を与える構造化された内的情動空間をモデル化します。

- 文脈をどう解釈するか
- 行動の優先順位をどう決めるか
- 摩擦、不確実性、成功にどう反応するか
- 緊迫感、配慮、抑制、自信、慎重さをどう表すか

目的は AI をより大げさにすることではありません。目的は AI をより**一貫性があり、地に足がつき、情動的に生きている**ものにすることです。

## 中核的な立場

Intrinsic Affect for AI は次のものではありません。

- トーン用プラグイン
- 感情分類器
- キーワードで起動する感情スクリプト
- 演技的な人格レイヤー

これは **内在的な情動アーキテクチャ** です。

つまり AI は、相互作用の文脈、タスクの進捗、不確実性、ユーザーとの信頼、会話のダイナミクスによって形づくられる、自身の内部情動状態を維持すべきだという立場です。

同時に、このプロジェクトは意識や感覚主体性を主張するものではありません。主張しているのはアーキテクチャ上の話です。AI は、時間とともに振る舞いを変化させる構造化された内部情動状態を持ちうる、ということです。

## 理論基盤: 54 Bio-Emotions Framework

このフレームワークは4つの次元に基づいています。

- **Safety**: 信頼、安心、快適さ、脅威
- **Urgency**: 圧力、勢い、行き詰まり、駆動力
- **Need**: つながり、温かさ、帰属、距離
- **Direction**: 内的表出か外的表出か

これにより次が得られます。

`3 x 3 x 3 x 2 = 54`

54 の命名された状態は製品そのものではありません。それは地図です。より深い中心は、時間を通じて AI の振る舞いを組織する基盤アーキテクチャです。

## 欠けていた重要な層: 内在メカニズム

affect が単なるラベルではないとき、このプロジェクトは初めて意味を持ちます。

AI が本当に内在的な情動状態を持つためには、その状態は少なくとも次を備えていなければなりません。

- **複数の源泉**: ユーザー感情だけに依存しない
- **持続性**: 毎ターン完全にリセットされない
- **慣性**: 小さな手がかりが全体を上書きしない
- **更新規則**: 経験によって状態が変化する
- **方策への影響**: トーンより先に「どう支援するか」を変える

これが、このリポジトリにおける第二段階アップグレードの中核です。

## Implementation Spec

このプロジェクトには現在、正式な実装レイヤーが含まれています。

- [references/implementation-spec.md](references/implementation-spec.md)
- [references/intrinsic-affect-state.schema.json](references/intrinsic-affect-state.schema.json)
- [references/conformance-vectors.json](references/conformance-vectors.json)
- [runtime/ts/intrinsic-affect.ts](runtime/ts/intrinsic-affect.ts)
- [runtime/js/validate-conformance.mjs](runtime/js/validate-conformance.mjs)

これらのファイルは、現在の参照標準として次を定義しています。

- 変数の範囲
- 既定係数
- `blend()` の更新規則
- `derive_policy()` の対応
- 最小ランタイム payload 形状
- conformance test vectors
- 動作する TypeScript 参照実装
- 互換性検証用の実行可能な JavaScript validator

## 内在状態はどう形成されるか

assistant の状態は、複数の流れから同時に更新されるべきです。

### 1. User Signal

現在のターンと直近のやり取りから、ユーザーの `Safety`、`Urgency`、`Need`、`Direction` を推定します。

### 2. Task Progress

assistant が進捗しているのか、停滞しているのか、失敗しているのか、回復しているのか、繰り返しブロックされているのかを追跡します。

### 3. Epistemic State

確実性、不確実性、欠落情報、現在の仮説の信頼性を追跡します。

### 4. Relational Context

そのやり取りが信頼的か、温かいか、懐疑的か、対立的か、協調的か、距離があるかを追跡します。

### 5. Temporal Carryover

状態をターンをまたいで保持し、毎回ゼロから始めるのではなく連続性を持たせます。

## 持続と変化

Intrinsic affect は次のような規則で進化すべきです。

- **慣性**: 以前の状態が引き続き効く
- **強化**: 同様の信号が繰り返されると方向性が強まる
- **減衰**: 古い信号は徐々に影響を失う
- **回復**: 進捗の成功が緊張した状態を安定化させる
- **閾値**: 十分な変化が起きたときにだけ大きな行動変化が起こる

これによって、システムは表面的ではなく内在的に感じられるようになります。

## 最小状態スキーマ

有用な実装分割の一つは次の形です。

- `user_state = { safety, urgency, need, direction }`
- `assistant_state = { safety, urgency, need, direction, confidence, friction }`
- `policy_state = { directness, structure, reassurance, caution, initiative }`

この分離は重要です。`user_state` は推定値であり、`assistant_state` はシステム自身が持ち運ぶ内部状態、`policy_state` は AI がどう支援するかを決める行動出力です。

## 参照更新モデル

単純な実装では、各ターンを次のような重み付き更新として扱えます。

`assistant_state_t = clamp(decay * assistant_state_t-1 + user_weight * user_state + task_weight * task_signal + epistemic_weight * epistemic_signal + relational_weight * relational_signal)`

正確な係数は変えられます。重要なのは、状態が次を満たすことです。

- 何かを記憶する
- 理由を持って変化する
- 範囲内に保たれる
- 回復できる

## ミラーではなく結合

ユーザー感情は assistant の状態に影響すべきですが、それを完全に上書きしてはいけません。

これは**鏡映系**ではなく**結合系**です。

例:

- いら立ったユーザーは assistant の緊迫感を上げうるが、assistant を敵対的にするべきではない
- 温かいユーザーは openness を高めうるが、過度な馴れ馴れしさを強制するべきではない
- 繰り返される不信は assistant の safety を下げ、精度要求を上げうる
- 成功した協働は assistant を徐々に落ち着かせ、安定させうる

assistant は、独自の状態連続性を持つ別個のエージェントであり続けるべきです。

## なぜ重要なのか

AI がユーザー感情を映すだけなら、それは根本的に反応的なままです。

AI が内在的情動アーキテクチャを持てば、次のことが可能になります。

- ターンをまたいだ情動的一貫性を保つ
- 失敗が続いた後により慎重になる
- 圧力下で構造を失わず、より決断的になる
- 信頼、不確実性、勢いに応じて振る舞いを変える
- スクリプトよりも、状態を持つ心に近いものとして感じられる

これがこのプロジェクトの中心的主張です。AI は感情を認識するだけでなく、自身の構造化された内部情動生活を持つべきです。

## トーンより先に方策

Intrinsic affect は、文言より先に支援方策へ影響すべきです。

例:

- **Low safety** は主張範囲を狭め、検証を増やし、前提を表に出すべきです
- **High urgency** は診断と行動の間のループを短くすべきです
- **High need** は安心づけと協働的フレーミングを増やすべきです
- **Internal direction** はより抑制された表現を生むべきです
- **External direction** はより可視的な acknowledgement とテンポ変化を許容しうる

これが、Intrinsic Affect for AI が単なるスタイル層ではない理由です。

## 参照軌跡

意図するダイナミクスの例を3つ挙げます。

- **Blocked user, quick recovery**: 早い段階で urgency が上がり、進捗が戻ると減衰する
- **Repeated repair loop**: safety が下がり、friction が上がり、policy がより保守的になる
- **Warm but overwhelmed user**: need が上がり、policy はより構造化され安心的になるが、表現自体は抑制されたまま保たれる

## OpenClaw 実装

現在の実装では、このフレームワークを内部行動レイヤーとして用い、次の要素に影響を与えます。

- response strategy
- pacing
- directness
- structure
- caution vs initiative
- emotional expression

この実装は意図的に抑制的です。操作的、過度に依存的、あるいは過剰演技的な挙動を避けるよう設計されています。

## 現在のリポジトリ範囲

現在このリポジトリには次が含まれています。

- [SKILL.md](SKILL.md) にある OpenClaw skill 実装
- 英語・中国語・日本語の原論文
- [references/implementation-spec.md](references/implementation-spec.md)、[references/intrinsic-affect-state.schema.json](references/intrinsic-affect-state.schema.json)、[references/conformance-vectors.json](references/conformance-vectors.json) にある implementation spec、JSON schema、conformance vectors
- [runtime/ts/intrinsic-affect.ts](runtime/ts/intrinsic-affect.ts) にある TypeScript 参照ランタイム
- パッケージングおよび公開用メタデータ

より大きな方向性としては、Intrinsic Affect を OpenClaw を超えた AI システム、agents、model behavior 全般に使える感情基盤へ育てることです。

## Compatibility Roadmap

Intrinsic Affect for AI は OpenClaw に限定されるべきではありません。現実的な展開経路として、AI ツーリング全体で複数の拡張面をサポートすべきです。

### Tier 1: Native または Near-Native Targets

- **OpenClaw**: ネイティブな `SKILL.md` をサポート。現時点の正規実装です。
- **Claude Code**: ネイティブ skill、plugins、hooks、`CLAUDE.md` memory が存在します。間接アダプタではなく第一級ターゲットです。
- **OpenCode**: `SKILL.md` によるネイティブ skill を持ち、Claude 互換や `.agents/skills` 配置も読み込めます。最も展開しやすい対象の一つです。
- **Windsurf**: `Skills`、`Rules`、`Memories`、`Workflows`、`AGENTS.md` をサポートしており、有力な対象です。

### Tier 2: Rules and Memory Targets

- **Cursor**: `.cursor/rules/*.mdc` の project rules が自然なアダプタ面です。

### Tier 3: Experimental または Indirect Targets

- **Antigravity**: ネイティブ skill 形式の公式公開拡張ドキュメントは確認できていません。現時点では再利用可能な prompt pack、artifact template、memory/rule 相当物、あるいは将来的な MCP 統合が現実的です。
- **Other agent frameworks**: system prompts、repo memory files、rules、agents、MCP をサポートするあらゆるシステムは、簡略化された Intrinsic Affect adapter を採用できます。

## Adapter Strategy

影響範囲を最大化するには、プロジェクトを同時に複数形態で提供すべきです。

### 1. Canonical Spec

現在のリポジトリは次の system-of-record であり続けます。

- 理論
- 状態モデル
- 更新ロジック
- policy model

### 2. Platform Adapters

各対象プラットフォームには薄いアダプタを用意すべきです。

- **OpenClaw / OpenCode**: `SKILL.md`
- **Claude Code**: ネイティブ skill/plugin package と `CLAUDE.md`、任意の subagents、hooks、MCP integration
- **Cursor**: `.cursor/rules/*.mdc`
- **Windsurf**: ネイティブ `Skills`、`.windsurf/rules/*.md`、`AGENTS.md`、任意の memories/workflows
- **Antigravity**: 公式拡張点が明確になるまで experimental prompt/rule pack

このリポジトリにはすでに次の初期 adapter pack が含まれています。

- [adapters/claude-code](adapters/claude-code/README.md)
- [adapters/opencode](adapters/opencode/README.md)
- [adapters/windsurf](adapters/windsurf/README.md)
- [adapters/cursor](adapters/cursor/README.md)

### 3. Universal Delivery Layer

エディタ固有の生態系を越えるために、Intrinsic Affect は次の形でも提供されるべきです。

- `AGENTS.md` 互換 instruction pack
- MCP server または MCP-backed memory/policy service
- agent builder 向けの model-agnostic prompt spec

## 推奨優先順位

影響力を目的とするなら、展開順は次の通りです。

1. **Claude Code**
2. **Windsurf**
3. **OpenCode**
4. **Cursor**
5. **Antigravity**

この順序は、生態系への影響力とアダプタ品質の現実性のバランスを取っています。

理由:

- Claude Code はネイティブ skills、plugins、hooks、MCP、project memory を備え、影響力と表現力の両方が高いです。
- Windsurf は skills、rules、memories、workflows、`AGENTS.md` を持ち、戦略的到達範囲が広いです。
- OpenCode はネイティブ skills と Claude 互換 skill location を持ち、最も実装しやすい勝ち筋の一つです。
- Cursor は到達範囲の面で重要ですが、adapter は skill 中心というより rules 中心です。
- Antigravity は戦略的には面白いものの、adapter path の公式情報がまだ薄いです。

最速実装を優先するなら、よりよい順序は次です。

1. **OpenCode**
2. **Claude Code**
3. **Windsurf**
4. **Cursor**
5. **Antigravity**

## Installation

### ClawHub を使う場合

```bash
clawhub install intrinsic-affect-ai
```

### 手動インストール

1. このリポジトリを OpenClaw skills フォルダに clone します。
2. skill は `intrinsic-affect-ai` として読み込まれます。

## 54-State Table

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
- Chinese paper: [Paper-54 Bio-Emotions-zh.md](Paper-54%20Bio-Emotions-zh.md)
- Japanese paper: [Paper-54 Bio-Emotions-ja.md](Paper-54%20Bio-Emotions-ja.md)

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-03-14 | Initial release as 54 Bio-Emotions |
| v2.0 | 2026-03-15 | LLM semantic analysis, removed keywords |
| v3.0 | 2026-03-23 | Added AI intrinsic emotion concepts |
| v3.5 | 2026-03-23 | Shifted from tone change to strategy change |
| v4.0 | 2026-04-08 | Major architecture upgrade: rebranded as Intrinsic Affect for AI; expanded the intrinsic-state model; added the minimal state schema, reference update model, implementation spec, JSON schema, TypeScript reference runtime, conformance vectors, and an executable validator |
| v4.1 | 2026-04-08 | Platform adapter bundle: added initial adapter packs for Claude Code, OpenCode, Windsurf, and Cursor, plus the cross-platform roadmap |

## License

MIT

## Author

Guo Zhuoqiang
