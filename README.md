# Singularix Web-BLE-client

## Intro

This is simple client for my smart-home control serivce.

## General

Right now this service implements conrol of room Led-light.


## How to build and run?
1. Make sure you have [Node.js](https://nodejs.org/en) installed on your machine and it is modern. Like > 20.0.0
2. Clone this repo
3. Install dependencies:  `npm i`
4. Run in dev mode: `npm run dev`
5. Build static files: `npm run build`

## How to deliver files to RaspberryPI

I'm using `scp` pattern for delivery. So you can check `.vscode/tasks.json` I think it can give you a clue how it works.


## Tech Stack

This project is built with a modern, type-safe, and highly composable frontend stack, optimized for performance and developer experience.

### Core
- **[React 19](https://react.dev/)** — Latest React with concurrent rendering and modern APIs  
- **[React DOM](https://react.dev/reference/react-dom)** — DOM renderer for React
- **[TypeScript](https://www.typescriptlang.org/)** — End-to-end type safety

### Routing
- **[React Router v7](https://reactrouter.com/)** — Declarative, nested routing for React applications

### UI & Styling
- **[Mantine](https://mantine.dev/)** — Fully featured React UI kit with theming, dark mode, and accessibility
  - [`@mantine/core`](https://mantine.dev/core/getting-started/)
  - [`@mantine/hooks`](https://mantine.dev/hooks/use-disclosure/)
  - [`@mantine/notifications`](https://mantine.dev/notifications/)
- **[Emotion](https://emotion.sh/docs/introduction)** — CSS-in-JS engine used by Mantine
- **[Tabler Icons](https://tabler.io/icons)** — Beautiful, consistent SVG icon set for UI actions

### State Management
- **[Effector](https://effector.dev/)** — Reactive, event-driven state manager designed for scalability and predictability

### Build & Tooling
- **[Rsbuild](https://rsbuild.dev/)** — High-performance build tool powered by Rspack
- **[Rspack](https://www.rspack.dev/)** — Rust-based bundler for fast builds and HMR
- **[`@rsbuild/plugin-react`](https://rsbuild.dev/plugins/react)** — Optimized React support for Rsbuild
