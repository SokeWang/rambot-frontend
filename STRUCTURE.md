# 项目代码结构说明

## 📁 目录结构

```
src/
├── components/           # React 组件
│   ├── ui/              # 通用 UI 组件
│   │   ├── Button.tsx   # 按钮组件
│   │   ├── Modal.tsx    # 模态框组件
│   │   ├── Input.tsx    # 输入框组件
│   │   └── index.ts     # UI 组件导出
│   ├── Navigation.tsx   # 导航栏组件
│   ├── HomePage.tsx     # 主页组件
│   ├── ChatPage.tsx     # 聊天页面组件
│   ├── AboutPage.tsx    # 关于页面组件
│   └── index.ts         # 组件导出索引
├── hooks/               # 自定义 React Hooks
│   ├── useMessages.ts   # 消息管理 Hook
│   ├── useTools.ts      # 工具管理 Hook
│   ├── useUserInfo.ts   # 用户信息 Hook
│   ├── useApi.ts        # API 调用 Hook
│   ├── useLocalStorage.ts # 本地存储 Hook
│   ├── useDebounce.ts   # 防抖 Hook
│   ├── useTheme.ts      # 主题管理 Hook
│   └── index.ts         # Hooks 导出索引
├── services/            # 服务层
│   └── api.ts           # API 服务
├── types/               # TypeScript 类型定义
│   └── index.ts         # 类型定义文件
├── utils/               # 工具函数
│   ├── format.ts        # 格式化工具
│   ├── dom.ts          # DOM 操作工具
│   ├── storage.ts      # 存储工具
│   ├── validation.ts   # 验证工具
│   └── index.ts        # 工具函数导出
├── config/              # 配置文件
│   └── index.ts        # 应用配置
├── constants/           # 常量定义
│   └── index.ts        # 应用常量
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 🏗️ 架构设计

### 1. 分层架构 (Layered Architecture)

#### 表现层 (Presentation Layer)
- **Components**: React 组件，负责 UI 渲染和用户交互
- **UI Components**: 可复用的通用 UI 组件
- **Pages**: 页面级组件，组合多个子组件

#### 业务逻辑层 (Business Logic Layer)
- **Hooks**: 自定义 React Hooks，封装业务逻辑和状态管理
- **Services**: 服务层，处理 API 调用和外部数据交互

#### 数据层 (Data Layer)
- **Utils**: 工具函数，处理数据转换、验证、格式化等
- **Types**: TypeScript 类型定义，确保类型安全
- **Config**: 配置文件，管理应用配置和常量

### 2. 组件设计原则

#### 单一职责原则
- 每个组件只负责一个功能
- UI 组件与业务逻辑分离
- 页面组件与通用组件分离

#### 可复用性
- 通用 UI 组件可在多个地方使用
- 自定义 Hooks 封装可复用的逻辑
- 工具函数提供通用的数据处理能力

### 3. 状态管理

#### 本地状态 (Local State)
- 使用 React useState 管理组件内部状态
- 使用自定义 Hooks 封装复杂状态逻辑

#### 持久化状态 (Persistent State)
- 使用 localStorage 存储用户偏好
- 通过 useLocalStorage Hook 管理持久化状态

### 4. 类型安全

#### 完整的 TypeScript 支持
- 所有组件、函数、变量都有类型注解
- 接口定义清晰，便于维护和扩展
- 泛型支持，提高代码复用性

### 5. 错误处理

#### 统一的错误处理机制
- API 错误通过 ApiError 类统一处理
- 组件错误边界处理 UI 错误
- 用户友好的错误提示

## 🎯 架构优势

### 1. 可维护性
- **模块化设计**: 每个模块职责清晰，便于理解和修改
- **代码分离**: UI、业务逻辑、数据层分离，降低耦合度
- **类型安全**: TypeScript 提供编译时类型检查

### 2. 可扩展性
- **组件化**: 新功能可以轻松添加新组件
- **Hook 复用**: 业务逻辑通过 Hooks 封装，便于复用
- **配置化**: 通过配置文件管理应用设置

### 3. 可测试性
- **单元测试**: 每个模块都可以独立测试
- **Mock 支持**: 服务层可以轻松 Mock
- **类型检查**: TypeScript 提供额外的测试保障

### 4. 性能优化
- **代码分割**: 按需加载组件和模块
- **防抖处理**: 优化用户输入和 API 调用
- **缓存机制**: 本地存储减少重复请求

## 🚀 使用方式

### 导入组件
```typescript
// 页面组件
import { Navigation, HomePage, ChatPage, AboutPage } from './components';

// UI 组件
import { Button, Modal, Input } from './components';
```

### 导入 Hooks
```typescript
import { 
  useMessages, 
  useTools, 
  useApi, 
  useLocalStorage,
  useDebounce,
  useTheme 
} from './hooks';
```

### 导入类型
```typescript
import { 
  Message, 
  Tool, 
  Page, 
  ApiError,
  AppState,
  ChatState 
} from './types';
```

### 导入工具函数
```typescript
import { 
  formatTime, 
  scrollToBottom, 
  getOrCreateUserId,
  isValidEmail 
} from './utils';
```

### 导入配置
```typescript
import { API_CONFIG, STORAGE_KEYS, APP_CONFIG } from './config';
```

## 📋 开发规范

### 1. 文件命名
- 组件文件使用 PascalCase: `Button.tsx`
- Hook 文件使用 camelCase: `useMessages.ts`
- 工具文件使用 camelCase: `format.ts`

### 2. 导入顺序
1. React 相关导入
2. 第三方库导入
3. 内部模块导入（按层级顺序）
4. 类型导入

### 3. 组件结构
1. 导入语句
2. 类型定义
3. 组件实现
4. 导出语句

### 4. 注释规范
- 文件顶部添加功能说明
- 复杂函数添加 JSDoc 注释
- 重要逻辑添加行内注释

这种结构化的代码组织方式使得项目更加清晰、易于维护和扩展，同时提供了良好的开发体验和代码质量保障。
