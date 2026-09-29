<div align="center">


# FitLog

**Browse exercises. Build your daily plan. Track every rep.**

A responsive workout library and training planner built with Next.js and TypeScript.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

[Features](#-key-features) · [Tech Stack](#-tech-stack) · [Requirements](#-requirements) · [Getting Started](#-getting-started) · [Scripts](#-available-scripts)

</div>

---

## 📖 About

FitLog helps you plan smarter workouts. Browse a library of exercises, review the details that matter (equipment, difficulty, target muscles, duration, calories, ratings, and instructions), then organize them into a focused daily plan. Bookmark lifts you want to try later and see your session totals at a glance.

## ✨ Key Features

| | Feature | Description |
| --- | --- | --- |
| 🏋️ | **Workout library** | Browse exercises with images and key training information. |
| 🔍 | **Exercise details** | Review equipment, difficulty, target muscles, duration, calories, ratings, and instructions. |
| 📅 | **Daily workout plan** | Add exercises to a plan capped at **five lifts** and mark completed workouts. |
| 🔖 | **Saved exercises** | Bookmark exercises to revisit and add to a future plan. |
| 📊 | **Plan overview** | Sort exercises and see totals for exercise count, minutes, and calories. |

## 🧰 Tech Stack

| Technology | Version | Why it is used |
| --- | --- | --- |
| [Next.js](https://nextjs.org/) | 16 (App Router) | Routing, server rendering, and data fetching in one framework |
| [React](https://react.dev/) | 19 | Component-based UI and state for the plan and saved lists |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety for exercise data, props, and plan state |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Fast, consistent, responsive styling |
| [Lucide React](https://lucide.dev/) | latest | Clean, lightweight icons |
| FitLog exercise data API | — | Source of exercise data, images, and instructions |

## 📋 Requirements

Before you start, make sure you have the following installed.

### 1. Node.js and npm

Next.js 16 needs **Node.js 20.9 or newer**. npm comes bundled with Node.js.

```bash
# Check that Node.js is new enough for Next.js 16 (needs 20.9+)
node -v

# Check that npm is available to install dependencies
npm -v
```

### 2. Next.js

FitLog is a **Next.js** app using the **App Router**. Next.js provides file-based routing, server components, and the dev/build tooling, so you do not need a separate router or bundler. It is installed automatically with `npm install`.

### 3. TypeScript

FitLog is written in **TypeScript**, so all source files use `.ts` and `.tsx`. TypeScript catches mistakes early, such as a missing exercise field or a wrong prop type, before the app runs. It is also installed automatically with `npm install`, so no global install is needed.

> 💡 **New to these tools?** Learn the basics of [Next.js](https://nextjs.org/learn) and the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html) first, then FitLog will be much easier to follow.

## 🚀 Getting Started

From the `gym` directory, install dependencies and start the development server:

```bash
# Install every package listed in package.json (Next.js, React, TypeScript, Tailwind, Lucide)
npm install

# Start the dev server with hot reload so changes show up instantly while you build
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use FitLog.

## 🧪 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

```bash
# Build first, because "start" serves the optimized output created by "build"
npm run build

# Serve the production build to test how the app behaves for real users
npm run start
```

## 🗺️ Roadmap Ideas

- [ ] Weekly plans, not just daily
- [ ] Progress charts for minutes and calories
- [ ] Dark mode toggle
- [ ] Persist saved exercises across devices

---

<div align="center">

Made with 💪 using Next.js and TypeScript

</div>
