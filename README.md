<div align="center">

```
   ███╗   ██╗ ██████╗ ██╗  ██╗██╗ █████╗
   ████╗  ██║██╔═══██╗██║ ██╔╝██║██╔══██╗
   ██╔██╗ ██║██║   ██║█████╔╝ ██║███████║
   ██║╚██╗██║██║   ██║██╔═██╗ ██║██╔══██║
   ██║ ╚████║╚██████╔╝██║  ██╗██║██║  ██║
   ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
        ███████╗███╗   ██╗ █████╗ ██╗  ██╗███████╗
        ██╔════╝████╗  ██║██╔══██╗██║ ██╔╝██╔════╝
        ███████╗██╔██╗ ██║███████║█████╔╝ █████╗
        ╚════██║██║╚██╗██║██╔══██║██╔═██╗ ██╔══╝
        ███████║██║ ╚████║██║  ██║██║  ██╗███████╗
        ╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
```

### A pixel-perfect tribute to the 1997 classic — rebuilt with modern JS, zero dependencies in production, and 24 tests guarding the gameplay.

![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=fff)
![Vitest](https://img.shields.io/badge/Vitest-2.x-6E9F18?style=for-the-badge&logo=vitest&logoColor=fff)
![No Deps](https://img.shields.io/badge/Runtime_Deps-0-success?style=for-the-badge)
![Tests](https://img.shields.io/badge/Tests-24%20✓-brightgreen?style=for-the-badge)

</div>

---

## 🎮 Play

```
   ┌────────────────────────────────────────┐
   │                                        │
   │                                        │
   │          ░░░░░░░░░░░                   │
   │                    ●                   │
   │                                        │
   │                                        │
   │                                        │
   └────────────────────────────────────────┘
        SCORE  035          HI-SCORE  150
```

```bash
nvm use 20      # Node 18+ required
npm install
npm run dev     # → http://localhost:5173
```

### Controls

```
   ┌──────────────────────────┬─────────────────────────┐
   │  ⬆ ⬇ ⬅ ➡  or  W A S D    │   Move                  │
   │  ␣ Space                 │   Resume                │
   │  ⎋ Esc  /  P             │   Pause / Toggle        │
   │  👆 Tap                  │   Pause                 │
   │  👉 Swipe                │   Move                  │
   └──────────────────────────┴─────────────────────────┘
```

---

## 📜 The Story of Snake

```
   1976 ─── 1997 ─── 2000 ─── 2008 ─── Today
    │        │        │        │         │
    │        │        │        │         └── Played 1B+ times worldwide.
    │        │        │        │             Re-released for Facebook Messenger
    │        │        │        │             on Nokia's anniversary.
    │        │        │        │
    │        │        │        └── Snake III appears on the Nokia E-series.
    │        │        │             Maze levels, multiplayer over Bluetooth.
    │        │        │
    │        │        └── Snake II ships on the Nokia 3310.
    │        │             Adds wrap-around walls, mazes, "fast forward".
    │        │
    │        └── Taneli Armanto, an engineer at Nokia, ports Snake to
    │             the Nokia 6110. It is preloaded on the phone.
    │             Suddenly, ~350 million people have a game in their pocket.
    │
    └── "Blockade", an arcade cabinet by Gremlin, debuts the two-player
         snake-trail concept. Surgeon-General warning: highly addictive.
```

**Snake** predates Nokia by two decades — its bones are in *Blockade* (1976), an arcade game where two players raced trailing walls that grew behind them. The genre lived in BBC Micros, TRS-80s, and Apple II ports throughout the '80s as **Worm**, **Nibbles**, and **Surround**. But what made Snake *Snake*-shaped in cultural memory wasn't an arcade — it was a phone.

### Why Nokia chose Snake

In 1997, Nokia engineer **Taneli Armanto** was asked to ship a game on the upcoming **Nokia 6110**. The constraints were brutal:

```
   ╔══════════════════════════════════════════════╗
   ║  Display .................... 84 × 48 px     ║
   ║  Colors ..................... 1-bit (mono)   ║
   ║  CPU ........................ ~13 MHz        ║
   ║  RAM available to games ..... a few KB       ║
   ║  Input ...................... 4 arrow-ish    ║
   ║                                buttons       ║
   ╚══════════════════════════════════════════════╝
```

Snake was the rare game that *fit*. No graphics to speak of — just dots. Logic compact enough to live in kilobytes. One-handed input. And, crucially: **infinite replay value**. You couldn't beat Snake. You could only beat *yourself*.

### The Nokia 3310 era

```
       ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
      █                  █
      █   ┌──────────┐   █
      █   │ ░░░░░░░░ │   █     Released   2000
      █   │ ░░ ●  ░░ │   █     Sold       126 000 000 units
      █   │ ░░░░░░░░ │   █     Weight     133 g
      █   └──────────┘   █     Battery    up to 260 hr standby
      █                  █     Indestructible (citation: every meme)
      █   ┌──────────┐   █
      █   │  NOKIA   │   █
      █   └──────────┘   █
      █                  █
      █    ① ② ③         █
      █    ④ ⑤ ⑥         █
      █    ⑦ ⑧ ⑨         █
      █    ✱ ⓿ #         █
      ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
```

The 3310 wasn't the first phone to carry Snake — but it was the one that made it a generation-defining meme. Shipped with **Snake II**, which added:

- Walls you could pass *through* (warp mode)
- Pre-built mazes (the "labyrinth")
- A bonus apple worth more points if you grabbed it fast
- A "fast-forward" key — hold ⑤ to speed up while moving

The 3310 sold **126 million units**. By 2002, Snake was the most-played video game in history by raw player-count, not because it was the best, but because it was already *there*, on the device people kept in their pocket every minute of every day.

### Why Snake still works in 2025

Snake is the platonic ideal of a game loop:

```
   ┌─ INPUT ────────► STATE ────────► RENDER ──┐
   │                    │                       │
   │                    ▼                       │
   │              GROW · DIE · SCORE             │
   └─────────────────────────────────────────────┘
```

That's it. One verb (turn), one resource (length), one fail-state (yourself). Every "vampire survivors"-style autobattler today is downstream of this idea: small input, compounding consequences, the *snake* getting in its own way.

---

## ✨ What this remake adds

This is not a 1:1 port. It's an **infinite Snake** in the visual language of the 3310, rebuilt as a clean modular codebase.

```
   ╔═══════════════╦══════════════════╦═════════════════════╗
   ║   FEATURE     ║   ORIGINAL 3310  ║   THIS REMAKE       ║
   ╠═══════════════╬══════════════════╬═════════════════════╣
   ║  Wrap walls   ║      ✓           ║      ✓              ║
   ║  Self-die     ║      ✓           ║      ✓              ║
   ║  Speed-up     ║   manual (hold)  ║   auto, per-apple   ║
   ║  Apple-safe   ║      ─           ║   ✓ never on snake  ║
   ║  Touch swipe  ║      ─           ║      ✓              ║
   ║  WASD         ║      ─           ║      ✓              ║
   ║  Auto-pause   ║      ─           ║   ✓ on tab blur     ║
   ║  Hi-score     ║   in firmware    ║   localStorage      ║
   ║  Deterministic║      ─           ║   ✓ seeded RNG      ║
   ╚═══════════════╩══════════════════╩═════════════════════╝
```

---

## 🏗 Architecture

```
                     ┌────────────────┐
                     │   index.html   │
                     └────────┬───────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │                main.js                  │
        │       (rAF loop · accumulator)          │
        └────┬──────────┬──────────┬──────────────┘
             │          │          │
             ▼          ▼          ▼
        ┌────────┐ ┌────────┐ ┌─────────┐
        │ state  │ │ input  │ │ render  │
        │ (pure) │ │ (DOM)  │ │ (DOM    │
        │        │ │        │ │  pool)  │
        └────┬───┘ └────────┘ └─────────┘
             │
             ▼
        ┌────────┐
        │  rng   │  ← seeded Mulberry32
        └────────┘
```

| Module | Lines | Role |
|--------|-------|------|
| `src/state.js` | ~120 | Pure game logic. `tick(state) → state`. No DOM. |
| `src/render.js` | ~70  | DOM-node pool, grid placement, score sync. |
| `src/input.js` | ~65  | Keyboard / touch / swipe / visibility. |
| `src/rng.js`   | ~15  | Deterministic seedable PRNG (Mulberry32). |
| `src/main.js`  | ~55  | `requestAnimationFrame` loop, glue. |

### The game loop

```
   ┌─────────────────────────────────────────────────────┐
   │  every animation frame                              │
   │    dt = now − last                                  │
   │    accumulator += dt                                │
   │                                                     │
   │    while accumulator >= tickMs                      │
   │      ┌──────────────────────────────────────┐       │
   │      │   apply pendingDirection             │       │
   │      │   step head                          │       │
   │      │   check self-collision (Set, O(1))   │       │
   │      │   if apple → grow, +score, respawn   │       │
   │      │   else      → shift tail             │       │
   │      └──────────────────────────────────────┘       │
   │      accumulator -= tickMs                          │
   │                                                     │
   │    render(state)        ← pool diff, no rebuild     │
   └─────────────────────────────────────────────────────┘
```

`tickMs` shrinks as the snake grows — capped at `minTickMs` so it stays playable.

---

## 🧪 Testing

```
   tests/state.test.js          ──── 14 unit ────────► move, warp, turns,
                                                       eat, score, collision
   tests/state.property.test.js ────  4 property ────► fast-check invariants
   tests/input.test.js          ────  6 integration ─► keys, touch, blur
   ─────────────────────────────────────────────────
                                     24 / 24 ✓
```

Properties checked (via `fast-check`):

1. Head **always** inside the field after any sequence of moves.
2. `body.length ≤ logical length` at every tick.
3. Apple is **never** on the snake while it exists.
4. Identical seed + inputs → identical outcome (replays / regressions).

```bash
npm test          # one-shot
npm run test:watch
```

---

## 🚀 Build & Deploy

```bash
npm run build     # → dist/
npm run preview   # local preview of the dist
```

Production bundle:

```
   index.html               1.0 KB
   index.css                3.1 KB  (gzip 1.2 KB)
   index.js                 5.5 KB  (gzip 2.4 KB)
   nokian11.ttf            89.9 KB
   ─────────────────────────────────
   total (gzipped JS+CSS)   3.6 KB
```

Drop the `dist/` folder on any static host. No server, no API, no cookies, no telemetry.

---

## 🔭 Roadmap

```
   ◐  Done            ○  Maybe one day
   ──────────────────────────────────────
   ◐  Modular ESM rewrite
   ◐  Test coverage on logic + properties
   ◐  Touch / swipe controls
   ◐  Speed ramp
   ○  Mazes & obstacles (Snake II "labyrinth")
   ○  Bonus apple with timer
   ○  Local 2-player split-screen
   ○  Replay file from RNG seed + input log
   ○  Canvas renderer toggle (for stress-tests)
```

---

## 📚 Further reading

- *The Long, Strange Story of Snake* — The Verge (2017)
- Taneli Armanto interview, Helsingin Sanomat (2010)
- "Blockade" (Gremlin, 1976) — MAME archive
- Nokia 3310 service manual — phonedb.net

---

<div align="center">

```
              ●
           ▓▓▓
        ▓▓▓
     ▓▓▓
  ▓▓▓ ─ ─ ─ ─ ─
```

*Built with no frameworks, no trackers, and a lot of nostalgia.*

</div>
