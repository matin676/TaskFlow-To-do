# ⚡ TaskFlow Pro

A premium, high-performance task management application for the modern web. Redesigned with a **Zen Minimalist** aesthetic and a robust **Feature-Sliced Architecture**.

![Zen Minimalist](https://img.shields.io/badge/Design-Zen%20Minimalist-4f46e5)
![FSD Architecture](https://img.shields.io/badge/Architecture-Feature--Sliced-green)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

## 🚀 Key Features

### ✨ Zen Minimalist UI

- **Glassmorphism Layout:** A centered, distraction-free interface with subtle background gradients and blur effects.
- **Animations:** Powered by **Framer Motion** for smooth list transitions, hover effects, and micro-interactions.
- **Zinc + Indigo Theme:** A professional, monochrome base (Zinc neutral grays) with Indigo accents for focus.

### 🛠️ Pro Architecture

- **Async Redux Thunks:** Data operations are handled asynchronously, keeping the UI responsive (Optimistic Updates).
- **Zod Validation:** All data entering the application is strictly validated against schemas.
- **Feature-Sliced Design (Lite):**
  - `src/app/`: Global configuration (Store, Styles).
  - `src/features/`: Domain logic (e.g., `todo`).
  - `src/shared/`: Reusable UI components and utilities.

### ⚡ Productivity Tools

- **Subtasks:** Break down complex tasks into manageable sub-steps.
- **Tags & Filtering:** Organize with custom tags and filter by Active/Completed status.
- **Smart Persistence:** Auto-saves to LocalStorage with robust error handling.

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite
- **State:** Redux Toolkit (EntityAdapter, createAsyncThunk)
- **Styling:** Tailwind CSS, PostCSS
- **Motion:** Framer Motion
- **Icons:** Lucide React
- **Validation:** Zod
- **Utils:** clsx, tailwind-merge

## 📦 Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/matin676/TaskFlow-To-do.git
    cd TaskFlow-To-do
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

## 🏗️ Project Structure

```bash
src/
├── app/                  # Global app setup
│   ├── store.js          # Redux store configuration
│   └── styles/           # Global CSS (Theme variables)
├── features/             # Feature-based modules
│   └── todo/
│       ├── api/          # Async Service Layer (Zod + LocalStorage)
│       ├── model/        # Redux Slices & Thunks
│       └── ui/           # Feature-specific components (TodoList, Item, Forms)
├── shared/               # Reusable code
│   ├── layouts/          # Page layouts (MainLayout)
│   ├── lib/              # Utilities (cn.js)
│   └── ui/               # Atomic components (Button, Input)
└── main.jsx              # Entry point
```

## 🧪 Verification

This project maintains code quality through ESLint.

```bash
npm run lint
```

---

_Focus on what matters most._
