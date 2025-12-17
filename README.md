# Pocket Model

Pocket Model is a fully local-first AI companion that delivers state-of-the-art small language model (SLM) experiences directly on your iOS or Android device. Interact with curated or custom models, run benchmarking suites, and explore offline workflows—without ever sending your prompts or transcripts to external servers.

> **Privacy first:** Only two optional actions ever leave your phone—benchmark submissions (for the public leaderboard) and voluntary product feedback. Everything else remains sandboxed on-device.

---

## Table of Contents
- [Pocket Model](#pocket-model)
  - [Table of Contents](#table-of-contents)
  - [Product Snapshot](#product-snapshot)
  - [Feature Highlights](#feature-highlights)
  - [Architecture at a Glance](#architecture-at-a-glance)
  - [Getting Started](#getting-started)
  - [Everyday Workflows](#everyday-workflows)
    - [Model Download & Management](#model-download--management)
    - [Model Loading & Switching](#model-loading--switching)
    - [Chat Experience](#chat-experience)
    - [Clipboard & Editing Tools](#clipboard--editing-tools)
    - [Benchmarking](#benchmarking)
    - [Hugging Face Token Setup](#hugging-face-token-setup)
    - [Feedback Portal](#feedback-portal)
  - [Developer Environment](#developer-environment)
    - [Prerequisites](#prerequisites)
    - [Local Setup](#local-setup)
    - [Scripts & Tooling](#scripts--tooling)
    - [Project Structure](#project-structure)
  - [License](#license)

---

## Product Snapshot

| Capability | Details |
| --- | --- |
| **Use case** | Local-first AI assistant powered by configurable SLMs |
| **Platforms** | Native iOS & Android (React Native) |
| **Networking** | Optional; only needed for asset download, benchmarking shares, or feedback |
| **Models** | Works with Danube 2/3, Phi, Gemma 2, Qwen, and any compatible GGUF |
| **Storage** | Encrypted on-device stores for chats, downloads, and benchmark data |
| **Localization** | English, Japanese, Chinese, Hindi (more coming) |

---

## Feature Highlights

- **Offline sessions** – run the full chat stack without connectivity.
- **Hugging Face Hub integration** – browse, bookmark, and download models directly in-app.
- **Inference sandbox** – tune temperature, system prompts, chat templates, BOS tokens, and more.
- **Benchmarks** – run repeatable device benchmarks, analyze token/sec, and share results.
- **Deep iOS support** – App Shortcuts, Siri intents, background downloads, landscape iPad layouts.
- **Android niceties** – WorkManager downloads, notification progress, foreground services, and edge-to-edge layouts.
- **Accessibility** – large tap targets, dynamic type-ready typography, modular theme engine.

---

## Architecture at a Glance

```
┌───────────────────────────┐
│   React Native App Shell  │
├───────────┬───────────────┤
│ MobX      │ React Navigation
├───────────┴───────────────┤
│ llama.rn bindings (SLMs)  │ ← @pocketpalai/llama.rn
├───────────┬───────────────┤
│ Platform Services         │
│ • iOS App Intents         │
│ • Android WorkManager     │
│ • Secure storage & FS     │
└───────────────────────────┘
```

---

## Getting Started

1. **Install the app** from the App Store or Google Play.
2. **Pick a model** from the curated list or connect to Hugging Face.
3. **Load & chat** – once a model sits in memory, Pocket Model works 100% offline.
4. **Benchmark** your device, compare with others, and share if you’d like.

---

## Everyday Workflows

### Model Download & Management
1. Tap the **Menu** icon → **Models**.
2. Browse local recommendations or tap **+** to add models from Hugging Face or disk.
3. Choose your quantization (Q4, Q5, Q8, etc.) based on device memory.
4. Downloads run in the background (especially on iOS with background tasks).

### Model Loading & Switching
- Hit **Load** next to any downloaded model.
- Quickly swap models straight from the chat screen via the left chevron picker.

### Chat Experience
1. Go to **Chat**.
2. Start talking to your loaded model; the screen remains awake during inference to surface live token speeds.
3. Long-press messages to edit, retry, or re-run with different models.

### Clipboard & Editing Tools
- Copy full replies via the bubble icon.
- Copy individual paragraphs via long press.
- Retry button regenerates with the same prompt for quick comparison.

### Benchmarking
1. Open **Benchmark** from the drawer.
2. Select a model + preset and run the automated suite.
3. Review tokens/sec, ms/token, and device telemetry.
4. Optionally submit to the public leaderboard.

### Hugging Face Token Setup
1. Generate a token inside your HF account ([docs](https://huggingface.co/docs/hub/en/security-tokens)).
2. In Pocket Model → **Settings** → **Set Token** → paste + save.

### Feedback Portal
1. Go to **App Info** → **Share your thoughts**.
2. Send feature requests, issues, or general feedback directly from the device.

---

## Developer Environment

### Prerequisites
- Node.js ≥ 18
- Yarn
- React Native CLI
- Xcode (iOS)
- Android Studio (Android)

### Local Setup
```bash
git clone https://github.com/mekaushikranjan/pocketmodel
cd pocketmodel
yarn install

# iOS pods
cd ios && pod install && cd ..
```

Run targets:
```bash
yarn ios     # iOS simulator
yarn android # Android emulator
```

### Scripts & Tooling

| Command | Purpose |
| --- | --- |
| `yarn start` | Metro bundler |
| `yarn ios` / `yarn android` | Platform launchers |
| `yarn clean` | Purge build artifacts |
| `yarn lint` | ESLint |
| `yarn typecheck` | TypeScript validations |
| `yarn test` | Jest suite |

### Project Structure

```
├── App.tsx                     # Navigation shell & theme providers
├── app.json                    # App name + bundle metadata
├── src/
│   ├── components/             # Shared UI
│   ├── screens/                # Feature screens (Chat, Models, etc.)
│   ├── store/                  # MobX stores
│   ├── utils/                  # L10n, huggingface helpers, export utils
│   └── database/               # Persistence layer
├── ios/                        # Native iOS proj
```
