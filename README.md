# ⚡ TaskFlow - Modern Todo App

A premium, high-performance task management application built with React, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

- **Smart Persistence**: Data is saved to LocalStorage with Zod schema validation to prevent corruption.
- **Feature-Sliced Architecture**: Modular, scalable codebase structure.
- **High Performance**: Normalized Redux state (O(1) lookups) and memoized selectors.
- **Premium UX**: Smooth Framer Motion animations and a responsive design system.
- **Advanced Features**:
  - Inline Editing (Double-click to edit)
  - Task Filtering (All / Active / Completed)
  - Progress Analytics

## 🛠️ Tech Stack

- **Core**: React 18, Vite
- **State**: Redux Toolkit (EntityAdapter + Custom Thunks)
- **Styling**: Tailwind CSS, clsx, tailwind-merge
- **Icons**: Lucide React
- **Validation**: Zod
- **Animation**: Framer Motion

## 📦 Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

## 🏗️ Deployment

This project is optimized for **Netlify** or **Vercel**.

### Netlify

A `netlify.toml` is included for zero-config deployment.

1. Connect repo to Netlify.
2. Build settings should auto-detect:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
