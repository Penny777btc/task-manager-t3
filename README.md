# TaskFlow - Modern Task Manager

<div align="center">

![TaskFlow](https://img.shields.io/badge/TaskFlow-T3%20Stack-copper?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)
![tRPC](https://img.shields.io/badge/tRPC-11.0-398CCB?style=for-the-badge)
![Mantine](https://img.shields.io/badge/Mantine-8.3.10-339AF0?style=for-the-badge)

**A minimalist task management application with an industrial copper aesthetic**

[English](#english) | [中文](#中文)

</div>

---

<a id="english"></a>

## 🇬🇧 English

### 📖 About

TaskFlow is a modern, full-stack task management application built with the **T3 Stack** and **Mantine UI**. It features a unique industrial copper aesthetic design, providing a premium user experience for managing daily tasks.

This project demonstrates the integration of:
- **T3 Stack** for type-safe full-stack development
- **Mantine UI** for beautiful, accessible components
- **LocalStorage** for client-side data persistence (no database required)

### ✨ Features

| Feature | Description |
|---------|-------------|
| 📋 **Task Management** | Create, update, delete, and track tasks |
| 📅 **Date Picker** | Set due dates with Chinese locale support |
| 📊 **Statistics Dashboard** | Real-time task completion metrics |
| 🔍 **Search & Filter** | Find tasks by name or status |
| 📱 **Responsive Design** | Desktop table view + Mobile card view |
| 💾 **Local Storage** | Data persists in browser, no account needed |
| 🎨 **Industrial Theme** | Unique copper monolith aesthetic |
| 🌙 **Dark Mode** | Easy on the eyes |

### 🛠️ Tech Stack

#### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.2.3 | React full-stack framework with App Router |
| React | 19.0.0 | UI component library |
| TypeScript | 5.8.2 | Type-safe JavaScript |

#### T3 Stack
| Technology | Purpose |
|------------|---------|
| tRPC | End-to-end type-safe APIs |
| Tanstack React Query | Data fetching and caching |
| Zod | Schema validation |
| SuperJSON | Extended JSON serialization |

#### UI Library
| Technology | Purpose |
|------------|---------|
| @mantine/core | 50+ UI components |
| @mantine/dates | Date picker components |
| @mantine/form | Form state management |
| @mantine/hooks | Utility React hooks |
| TailwindCSS | Utility-first CSS |

### 📁 Project Structure

```
task-manager/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Landing page
│   │   ├── app/page.tsx        # Task management page
│   │   ├── layout.tsx          # Root layout with providers
│   │   └── api/trpc/           # tRPC API routes
│   ├── components/             # React components
│   │   ├── CreateTaskModal.tsx # Task creation modal
│   │   ├── TaskList.tsx        # Task table/cards
│   │   └── TaskStats.tsx       # Statistics cards
│   ├── hooks/
│   │   └── useLocalStorage.ts  # LocalStorage CRUD hook
│   ├── theme/
│   │   └── theme.ts            # Mantine theme config
│   ├── types/
│   │   └── task.ts             # TypeScript interfaces
│   ├── trpc/                   # tRPC client config
│   ├── server/                 # tRPC server config
│   └── styles/
│       └── globals.css         # Global CSS variables
├── package.json
├── tsconfig.json
└── postcss.config.js
```

### 🚀 Getting Started

#### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm

#### Installation

```bash
# Clone the repository
git clone https://github.com/Penny777btc/task-manager-t3.git
cd task-manager-t3

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run typecheck` | Run TypeScript type checking |

### 📸 Screenshots

#### Landing Page
- Hero section with product tagline
- Feature cards showcasing capabilities
- Statistics section
- Call-to-action buttons

#### Task Management Page
- Task creation modal with form validation
- Statistics dashboard (total, pending, in-progress, completion rate)
- Filterable task list (All / Pending / In Progress / Completed)
- Search functionality
- Responsive table (desktop) / cards (mobile) layout

### 🎨 Theme Customization

The app uses a custom **Copper Monolith Industrial** theme. You can customize it in `src/theme/theme.ts`:

```typescript
const copperPrimary: MantineColorsTuple = [
    '#fff4e6',
    '#ffe8cc',
    '#ffd8a8',
    '#ffc078',
    '#ffa94d',
    '#d48e4d',  // Primary shade
    '#c27c3e',
    '#a86932',
    '#8e5c2d',
    '#744d26',
];
```

### 📝 License

MIT License - feel free to use this project for learning or production.

---

<a id="中文"></a>

## 🇨🇳 中文

### 📖 关于项目

TaskFlow 是一个现代化的全栈任务管理应用，使用 **T3 Stack** 和 **Mantine UI** 构建。它采用独特的工业铜色美学设计，为日常任务管理提供高端用户体验。

此项目展示了以下技术的集成：
- **T3 Stack** 实现类型安全的全栈开发
- **Mantine UI** 提供美观、可访问的组件
- **LocalStorage** 实现客户端数据持久化（无需数据库）

### ✨ 功能特性

| 功能 | 描述 |
|------|------|
| 📋 **任务管理** | 创建、更新、删除和追踪任务 |
| 📅 **日期选择** | 支持中文本地化的截止日期设置 |
| 📊 **统计仪表板** | 实时任务完成度指标 |
| 🔍 **搜索与过滤** | 按名称或状态查找任务 |
| 📱 **响应式设计** | 桌面端表格视图 + 移动端卡片视图 |
| 💾 **本地存储** | 数据保存在浏览器中，无需注册账户 |
| 🎨 **工业风主题** | 独特的铜色巨石美学 |
| 🌙 **深色模式** | 护眼设计 |

### 🛠️ 技术栈

#### 核心框架
| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 15.2.3 | React 全栈框架，使用 App Router |
| React | 19.0.0 | UI 组件库 |
| TypeScript | 5.8.2 | 类型安全的 JavaScript |

#### T3 Stack
| 技术 | 用途 |
|------|------|
| tRPC | 端到端类型安全的 API |
| Tanstack React Query | 数据获取和缓存 |
| Zod | Schema 验证 |
| SuperJSON | 扩展 JSON 序列化 |

#### UI 组件库
| 技术 | 用途 |
|------|------|
| @mantine/core | 50+ UI 组件 |
| @mantine/dates | 日期选择器组件 |
| @mantine/form | 表单状态管理 |
| @mantine/hooks | 实用 React Hooks |
| TailwindCSS | 原子化 CSS |

### 📁 项目结构

```
task-manager/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # 产品介绍首页
│   │   ├── app/page.tsx        # 任务管理页面
│   │   ├── layout.tsx          # 根布局（含 Provider）
│   │   └── api/trpc/           # tRPC API 路由
│   ├── components/             # React 组件
│   │   ├── CreateTaskModal.tsx # 创建任务模态框
│   │   ├── TaskList.tsx        # 任务表格/卡片
│   │   └── TaskStats.tsx       # 统计卡片
│   ├── hooks/
│   │   └── useLocalStorage.ts  # LocalStorage CRUD Hook
│   ├── theme/
│   │   └── theme.ts            # Mantine 主题配置
│   ├── types/
│   │   └── task.ts             # TypeScript 接口定义
│   ├── trpc/                   # tRPC 客户端配置
│   ├── server/                 # tRPC 服务端配置
│   └── styles/
│       └── globals.css         # 全局 CSS 变量
├── package.json
├── tsconfig.json
└── postcss.config.js
```

### 🚀 快速开始

#### 环境要求
- Node.js 18.x 或更高版本
- npm、yarn 或 pnpm

#### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/Penny777btc/task-manager-t3.git
cd task-manager-t3

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

#### 可用命令

| 命令 | 描述 |
|------|------|
| `npm run dev` | 使用 Turbopack 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run start` | 启动生产服务器 |
| `npm run typecheck` | 运行 TypeScript 类型检查 |

### 📸 页面预览

#### 产品介绍页（Landing Page）
- 英雄区：产品标语展示
- 功能卡片：展示核心能力
- 统计数据区
- 行动召唤按钮

#### 任务管理页（App Page）
- 创建任务模态框（含表单验证）
- 统计仪表板（总数、待处理、进行中、完成率）
- 可过滤的任务列表（全部 / 待处理 / 进行中 / 已完成）
- 搜索功能
- 响应式布局（桌面端表格 / 移动端卡片）

### 🎨 主题定制

应用使用自定义的 **铜色工业风(Copper Monolith Industrial)** 主题。你可以在 `src/theme/theme.ts` 中进行修改：

```typescript
const copperPrimary: MantineColorsTuple = [
    '#fff4e6',
    '#ffe8cc',
    '#ffd8a8',
    '#ffc078',
    '#ffa94d',
    '#d48e4d',  // 主色调
    '#c27c3e',
    '#a86932',
    '#8e5c2d',
    '#744d26',
];
```

### 🔧 核心组件说明

#### useLocalStorage Hook
自定义 Hook，提供完整的任务 CRUD 操作：

```typescript
const {
    tasks,          // 任务列表
    isLoaded,       // 加载状态
    addTask,        // 添加任务
    updateTask,     // 更新任务
    deleteTask,     // 删除任务
    updateTaskStatus, // 更新状态
    clearAllTasks,  // 清空所有
    getTaskStats,   // 获取统计
} = useLocalStorage();
```

#### 任务数据结构

```typescript
interface Task {
    id: string;           // 唯一标识
    name: string;         // 任务名称
    dueDate: string | null; // 截止日期 (ISO 格式)
    status: 'pending' | 'in-progress' | 'completed'; // 状态
    createdAt: string;    // 创建时间
}
```

### 📝 开源协议

MIT License - 可自由用于学习或生产环境。

---

<div align="center">

**Built with ❤️ using T3 Stack + Mantine UI**

[⬆ Back to Top](#taskflow---modern-task-manager)

</div>
