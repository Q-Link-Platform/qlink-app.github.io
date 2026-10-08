<div align="center">

# Q-Link v3.0 — Platform Documentation & Architectural Overview

[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Windows%20%7C%20PWA-06b6d4?style=for-the-badge&logo=electron&logoColor=white)](https://q-link-v3-0.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15%20App%20Router-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![AI Engine](https://img.shields.io/badge/Q--AI-SSE%20Streaming%20Copilot-8b5cf6?style=for-the-badge&logo=openai&logoColor=white)](https://q-link-platform.github.io/qlink-app.github.io/#qai)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

<p align="center">
  <strong>Next-Generation Real-Time Messaging, Ephemeral Social Platform & Neural AI Copilot Engine</strong>
</p>

[Live Web Application](https://q-link-v3-0.vercel.app/) • [Feature Documentation](https://q-link-platform.github.io/qlink-app.github.io/) • [Windows Setup (.exe)](https://q-link-v3-0.vercel.app/downloads/Q-Link-Setup.exe) • [llms.txt](https://q-link-v3-0.vercel.app/llms.txt)

---

</div>

## Executive Overview

**Q-Link v3.0** is an enterprise-grade, privacy-first communication platform engineered for high-concurrency real-time messaging, ephemeral media lifecycle governance, native operating system integration, and seamless intelligent AI assistance. 

Designed with modern glassmorphism aesthetics and hardware-accelerated 60fps UI pipelines, Q-Link solves common pain points in contemporary chat applications: runaway cloud storage bloat, jarring latency, and noisy notification feeds.

---

## Core Architectural Pillars

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Q-LINK ECOSYSTEM (v3.0)                           │
└─────────────────────────────────────────────────────────────────────────────┘
          │                                                  │
          ▼                                                  ▼
┌─────────────────────────────────┐        ┌──────────────────────────────────┐
│      CLIENT RUNTIMES            │        │        BACKEND & REAL-TIME       │
├─────────────────────────────────┤        ├──────────────────────────────────┤
│ • Next.js 15 PWA Client         │        │ • Edge API & Route Handlers      │
│ • Windows 10/11 Standalone App  │ ◄────► │ • Pusher / WebSocket Live Bus    │
│ • System Tray & Native Toasts   │        │ • Low-Latency SSE Streaming Bus  │
│ • GPU Switcher (60fps vs Eco)   │        │ • 24hr Ephemeral Storage Janitor │
└─────────────────────────────────┘        └──────────────────────────────────┘
                                             ▲
                                             │
                                   ┌───────────────────┐
                                   │   Q-AI COPILOT    │
                                   │  NEURAL ENGINE    │
                                   └───────────────────┘
```

### 1. Q-AI Neural Copilot & Streaming Assistant (`/api/qai`)
* **Sub-100ms First-Token Latency**: Employs Server-Sent Events (SSE) token dispatching for zero-latency streaming responses without thread blocking.
* **Contextual Thread Memory**: Automatically digests channel topic context, conversation thread state, and user intents with dynamic prompt grounding.
* **Client-Side Guardrails**: Features heuristic token filtering, automated markdown/code block formatting, and granular query rate limiting.
* **Zero-Leakage Privacy Policy**: Prompt payloads are transiently evaluated in memory and never persisted into permanent long-term storage caches.

### 2. High-Performance Real-Time Messaging Mesh
* **Dynamic Recency Contact Ranking**: Active conversations and peers bubble up dynamically based on real-time activity vectors.
* **Atomic Status Ticks**: Granular state transitions for messages: *Sent* (single tick), *Delivered* (double grey), and *Seen* (glowing double emerald).
* **Live Presence Waveforms**: Real-time typing waves and heartbeat presence monitoring.
* **Inline Waveform Voice Memos**: Native HTML5 Web Audio API waveform rendering with instantaneous playback scrubbing.

### 3. Ephemeral Media & Zero Cloud Bloat
* **24-Hour Self-Cleaning Protocol**: Photos, attachments, and ephemeral media assets automatically expire and wipe after 24 hours, guaranteeing clean disk footprints.
* **Granular Privacy Access Toggles**: Multi-level privacy switches for bio, handle directory discovery, online presence, and direct connection requests.

### 4. Native Windows Desktop Client (.exe)
* **Standalone Windows Executable**: Built with single-instance lock, custom frameless titlebar controls, and direct desktop tray minimization.
* **Hardware GPU Performance Switcher**: Toggle dynamically between *60fps Ultra Glassmorphism* and *Battery Saver Mode* for low-spec stations.

---

## Technical Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, Next.js 15 (App Router), TypeScript 5.x |
| **Styling & Design System** | Tailwind CSS 3.4, Cyber Glassmorphism, CSS Custom Properties |
| **State & Streaming** | React Server Components, Server-Sent Events (SSE), Web Audio API |
| **Desktop Runtime** | Electron / Win32 Shell Wrapper, Native System Tray API |
| **Deployment** | Vercel Edge Network, GitHub Pages Documentation Hub |

---

## Getting Started

### Prerequisites
* Node.js `>= 18.18.0`
* npm / pnpm / yarn
* Git

### Local Development Setup
```bash
# Clone the repository
git clone https://github.com/Q-Link-Platform/qlink-app.github.io.git
cd qlink-app.github.io

# Inspect landing portal locally
npx serve .
# Or open index.html directly in any modern browser
```

---

## Contributing & Pull Request Protocol

Contributions to the Q-Link ecosystem are welcome! Please follow our established engineering standard:

1. **Fork the repository** to your personal GitHub account.
2. **Create a descriptive feature branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Commit your changes** adhering to conventional commit standards:
   ```bash
   git commit -m "feat(module): brief description of enhancement"
   ```
4. **Submit a Pull Request** against `Q-Link-Platform/qlink-app.github.io:main` with a clear architectural summary.

---

## License & Attribution

Distributed under the **MIT License**. See `LICENSE` for more information.

* **Organization**: [Q-Link-Platform](https://github.com/Q-Link-Platform)
* **Core Documentation**: [qlink-app.github.io](https://q-link-platform.github.io/qlink-app.github.io/)
