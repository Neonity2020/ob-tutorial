---
title: "What’s New in Next.js 16"
source: "https://medium.com/@onix_react/whats-new-in-next-js-16-c0392cd391ba"
author:
  - "[[Onix React]]"
published: 2025-10-13
created: 2025-10-27
description: "What’s New in Next.js 16 The early release of Next.js 16 (Beta) is now available, signaling major architectural changes focused on raw performance, refined caching strategies, and tight integration …"
tags:
  - "clippings"
---
![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*oSpe2WwgT3d0PKqSXuPLqQ.jpeg)

The early release of Next.js 16 (Beta) is now available, signaling major architectural changes focused on raw performance, refined caching strategies, and tight integration with the latest React features. The most significant changes include Turbopack becoming the default bundler and the React Compiler moving to stable integration.  
Next.js 16 (Beta) 的早期发布现已可用，标志着专注于原始性能、精炼缓存策略以及与最新 React 功能紧密集成的重大架构变化。最显著的变化包括 Turbopack 成为默认的打包工具，以及 React 编译器迁移到稳定集成。

## Key Highlights in Next.js 16 Beta 🛠️Next.js 16 Beta 的主要亮点 🛠️

- **Turbopack (Stable):** Now the default bundler, offering 2–5x faster production builds and up to 10x faster Fast Refresh.  
	Turbopack (稳定版)：现已成为默认的打包工具，提供 2-5 倍更快的生产构建速度和高达 10 倍更快的 Fast Refresh 速度。
- **React Compiler Support (Stable):** Built-in support for automatic component memoization.  
	React 编译器支持（稳定版）：内置自动组件记忆功能支持。
- **Enhanced Routing:** Faster navigations with layout deduplication and incremental prefetching.  
	增强的路由功能：通过布局去重和增量预取实现更快的导航。
- **Improved Caching APIs:** New `updateTag()` for read-your-writes semantics and updated `revalidateTag()` with required `cacheLife` profiles.  
	改进的缓存 API：新增 `updateTag()` 用于读写一致性语义，并更新 `revalidateTag()` 配合必要的 `cacheLife` 配置。
- **React 19.2:** Includes new features like View Transitions and `useEffectEvent()`.  
	React 19.2：包含视图过渡等新功能，以及 `useEffectEvent()` 。
- **Turbopack File System Caching (Beta):** Even faster start-up and compile times on large apps.  
	Turbopack 文件系统缓存（Beta）：大型应用启动和编译时间更快。

## Developer Experience and Configuration ⚡开发者体验和配置 ⚡

### Turbopack Enhancements Turbopack 增强功能

Turbopack has reached stable status for both development and production builds and is now the default bundler for all new Next.js projects.  
Turbopack 已对开发和生产构建达到稳定状态，现已成为所有新 Next.js 项目的默认打包器。

**Performance Gains** — developers can expect significant speed improvements right away, with no configuration required:  
性能提升 — 开发者可以立即体验到显著的加速效果，无需任何配置：

- 2−5× faster production builds.  
	生产环境构建速度提升 2-5 倍。
- Up to 10× faster Fast Refresh.  
	Fast Refresh 速度提升高达 10 倍。

**Opting Out** — For existing apps with custom webpack setups, you can continue using webpack by explicitly running:  
选择性退出 — 对于具有自定义 webpack 设置的现有应用，您可以通过显式运行以下命令继续使用 webpack：

```c
next dev --webpack
next build --webpack
```

**Turbopack File System Caching (Beta)  
Turbopack 文件系统缓存（Beta）**

Next.js 16 introduces **filesystem caching** in development mode to speed up subsequent runs, especially in large projects. This feature stores compiler artifacts on disk between restarts, leading to significantly faster compile times.  
Next.js 16 在开发模式下引入了文件系统缓存，以加快后续运行速度，尤其是在大型项目中。此功能在重启之间将编译器工件存储在磁盘上，从而显著减少编译时间。

To enable filesystem caching, configure your `next.config.ts`:  
要启用文件系统缓存，请配置您的 `next.config.ts`:

```c
// next.config.ts
const nextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};
 
export default nextConfig;
```

### React Compiler Support (Stable)React 编译器支持（稳定）

Built-in support for the React Compiler is now stable following its 1.0 release. The compiler automatically memoizes components, effectively reducing unnecessary re-renders without requiring manual code changes.  
React 编译器现已支持内置，并在其 1.0 版本发布后变得稳定。编译器会自动对组件进行记忆化，有效减少不必要的重新渲染，而无需手动更改代码。

The `reactCompiler` configuration option has been promoted to stable, but is not enabled by default. To use it, you must:  
`reactCompiler` 配置选项现已提升至稳定状态，但默认情况下未启用。要使用它，你必须：

1. Install the latest compiler plugin: `npm install babel-plugin-react-compiler@latest`  
	安装最新的编译器插件： `npm install babel-plugin-react-compiler@latest`
2. Enable the option in your `next.config.ts`:  
	在你的 `next.config.ts` 中启用该选项：
```c
// next.config.ts
const nextConfig = {
  reactCompiler: true,
};
 
export default nextConfig;
```

***Note:*** *Enabling the compiler may slightly increase initial compile times, as it relies on Babel.*  
注意：启用编译器可能会略微增加初始编译时间，因为它依赖于 Babel。

### New APIs and Project Setup新的 API 和项目设置

**Simplified create-next-app  
简化的 create-next-app**

The boilerplate for new projects has been redesigned for a streamlined setup flow with modern defaults:  
新项目的脚手架已被重新设计，以实现现代化的默认设置和简化的设置流程：

- Includes the App Router by default.  
	默认包含 App 路由器。
- Uses a TypeScript-first configuration.  
	采用 TypeScript 优先配置。
- Integrates Tailwind CSS.集成 Tailwind CSS。
- Includes ESLint.包含 ESLint。

**Build Adapters API (Alpha)  
构建适配器 API (Alpha)**

The Build Adapters API allows deployment platforms and custom build integrations to modify the build process. You can create custom adapters that hook into the build to change configurations or process the final output.  
构建适配器 API 允许部署平台和自定义构建集成来修改构建过程。您可以创建自定义适配器，通过挂钩构建来更改配置或处理最终输出。

To integrate a custom adapter, specify its path in your `next.config.js`:  
要集成自定义适配器，请在您的 `next.config.js` 中指定其路径：

```c
// next.config.js
const nextConfig = {
  experimental: {
    adapterPath: require.resolve('./my-adapter.js'),
  },
};
 
module.exports = nextConfig;
```

## Mandatory Changes and Deprecations 🏗️强制变更和弃用 🏗️

### Enhanced Routing and Navigation增强路由和导航

The routing and navigation system has been completely overhauled to make page transitions faster and leaner, requiring no code changes in existing apps.  
路由和导航系统已完全革新，使页面转换更快更轻量，现有应用无需代码更改。

- Layout Deduplication: Reduces network transfer size by downloading shared layouts only once when prefetching multiple URLs (e.g., downloading a layout once for 50 product links instead of 50 times).  
	布局去重：在预取多个 URL 时（例如，为 50 个产品链接只下载一次布局而不是 50 次），通过仅下载共享布局来减少网络传输大小。
- Incremental Prefetching: The prefetch cache is smarter, only fetching parts of the page not already in the cache instead of entire pages. It intelligently cancels requests when links leave the viewport and re-prefetches upon data invalidation.  
	增量预取：预取缓存更智能，仅获取缓存中不存在的页面部分而不是整个页面。当链接离开视口时智能取消请求，并在数据失效时重新预取。

This trade-off may result in more individual prefetch requests but leads to a much lower total network transfer size overall.  
这种权衡可能导致更多的单个预取请求，但总体上显著降低了网络传输的总大小。

### Partial Pre-Rendering (PPR) and Cache Components部分预渲染（PPR）和缓存组件

The experimental Partial Pre-Rendering (PPR) flag and configuration options have been removed. PPR functionality is now being integrated into Cache Components.  
实验性的部分预渲染（PPR）标志和配置选项已被移除。PPR 功能现已被集成到缓存组件中。

- **Migration:** To opt into the new PPR model in Next.js 16, use the `experimental.cacheComponents` configuration option.  
	迁移：要在 Next.js 16 中启用新的 PPR 模型，请使用 `experimental.cacheComponents` 配置选项。
- **Warning:** If your application heavily relies on the old `experimental.ppr = true` configuration, it is recommended to stay on your current Next.js Canary version until a dedicated migration guide for Cache Components is released.  
	警告：如果你的应用程序严重依赖旧的 `experimental.ppr = true` 配置，建议继续使用当前的 Next.js Canary 版本，直到发布专门针对 Cache Components 的迁移指南。

### Improved Caching APIs 改进的缓存 API

Next.js 16 refines its caching APIs to give developers more explicit control over cache invalidation and revalidation behavior.  
Next.js 16 优化了其缓存 API，为开发者提供更明确的缓存失效和重新验证控制。

**1.**`revalidateTag()` **(Updated)** 1\. `revalidateTag()` (更新)

This function now requires a cacheLife profile as a second argument to enable Stale-While-Revalidate (SWR) behavior. It is designed for invalidating content that can tolerate eventual consistency, immediately serving cached data while a revalidation request runs in the background.  
这个函数现在需要一个名为 cacheLife 的配置文件作为第二个参数来启用 Stale-While-Revalidate (SWR) 行为。它用于使内容能够容忍最终一致性，在后台进行重新验证请求的同时立即提供缓存数据。

- `revalidateTag('tag', 'max')`: Recommended for most cases; enables SWR for long-lived content.  
	`revalidateTag('tag', 'max')`: 适用于大多数情况；为长生命周期内容启用 SWR。
- `revalidateTag('tag', 'hours')`: Uses a built-in profile for hourly revalidation.  
	`revalidateTag('tag', 'hours')`: 使用内置的每小时重新验证配置文件。
- `revalidateTag('tag', { revalidate: 3600 })`: Uses a custom inline object defining the revalidation time in seconds.  
	`revalidateTag('tag', { revalidate: 3600 })`: 使用自定义的行内对象定义重新验证时间（以秒为单位）。

**Migration:** You must add the second `cacheLife` argument to all existing calls, or switch to updateTag() for interactive content. The single-argument form (`revalidateTag('tag')`) is now deprecated.  
迁移：您必须向所有现有调用中添加第二个 `cacheLife` 参数，或切换到 updateTag() 以支持交互式内容。单参数形式（ `revalidateTag('tag')` ）现已弃用。

**2.**`updateTag()` **(New, Server Actions Only)**  
2\. `updateTag()` （新功能，仅限服务器操作）

This new API provides read-your-writes semantics and is only available within Server Actions. It simultaneously expires and immediately refreshes cached data within the same request, ensuring the user sees their changes instantly upon form submission or settings update.  
此新 API 提供读写语义，仅在服务器操作中可用。它同时使缓存数据过期并立即刷新，确保用户在表单提交或设置更新后立即看到他们的更改。

```c
'use server';
import { updateTag } from 'next/cache';
 
export async function updateUserProfile(userId: string, profile: Profile) {
  // ...update logic...
  updateTag(\`user-${userId}\`); // Expire and refresh immediately
}
```

**3.**`refresh()` **(New, Server Actions Only)**  
3\. `refresh()` （新功能，仅限服务器操作）

This Server Actions-only API is for refreshing uncached data only — it does not affect the cache. It complements the client-side `router.refresh()` by allowing developers to refresh dynamic data (like notification counts or status indicators) displayed elsewhere on the page after a Server Action, keeping the cached page shell fast.  
这个仅限服务器操作的 API 仅用于刷新未缓存的数据——它不会影响缓存。它通过允许开发者在服务器操作后刷新页面上其他位置显示的动态数据（如通知计数或状态指示器），补充了客户端的 `router.refresh()` ，从而保持缓存的页面外壳快速。

### React 19.2 and Canary FeaturesReact 19.2 和 Canary 特性

The App Router now uses the latest React Canary release, integrating features from the new React 19.2:  
应用路由器现在使用最新的 React Canary 版本，集成了新 React 19.2 的特性：

- **View Transitions:** Allows animating elements that update inside a Transition or navigation.  
	视图过渡：允许在 Transition 或导航中更新元素进行动画。
- **useEffectEvent:** Extracts non-reactive logic from Effects into reusable Effect Event functions.  
	useEffectEvent：将 Effect 中的非 reactive 逻辑提取为可重用的 Effect 事件函数。
- **Activity:** Renders “background activity” by hiding UI with display: none while maintaining state and cleaning up Effects.  
	Activity：通过使用 display: none 隐藏 UI 来渲染“后台活动”，同时保持状态并清理 Effects。

## Breaking Changes and Other Updates ⚙️重大变更和其他更新 ⚙️

Next.js 16 introduces several breaking changes, version requirement bumps, removals of deprecated features, and changes to default behaviors that developers must address when migrating.  
Next.js 16 引入了多项重大变更、版本要求提升、已弃用特性的移除以及默认行为的更改，开发者迁移时必须处理这些问题。

### Mandatory Version Updates强制版本更新

Next.js 16 requires developers to update their minimum supported software versions:  
Next.js 16 要求开发者更新其最低支持软件版本：

- **Node.js:** The minimum version is now 20.9.0 (LTS). Node.js 18 is no longer supported.  
	Node.js：最低版本现在是 20.9.0（LTS）。Node.js 18 已不再支持。
- **TypeScript:** The minimum version is now 5.1.0.  
	TypeScript：最低版本现在是 5.1.0。
- **Browsers:** Minimum supported versions are Chrome 111+, Edge 111+, Firefox 111+, and Safari 16.4+.  
	浏览器：最低支持版本为 Chrome 111+、Edge 111+、Firefox 111+ 和 Safari 16.4+。

### Breaking Changes and Removals重大变更和移除

Several previously deprecated features have been permanently removed, and access to key APIs has changed:  
一些先前已弃用的功能已被永久移除，对关键 API 的访问方式已更改：

**API Access Must Be Asynchronous  
API 访问必须异步**

Synchronous access to several Next.js data-fetching and cache APIs is now banned; you must use await:  
同步访问多个 Next.js 数据获取和缓存 API 现在已被禁止；你必须使用 await：

- `params`, `searchParams` props access: await params, await searchParams.  
	`params`, `searchParams` 属性访问：await params, await searchParams。
- `cookies()`, `headers()`, `draftMode()` access: await `cookies()`, await `headers()`, await `draftMode()`.  
	`cookies()`, `headers()`, `draftMode()` 属性访问：await `cookies()`, await `headers()`, await `draftMode()` 。

**Removed Features 已移除功能**

- **AMP Support (all APIs and configs):** No replacement; the feature has been retired.  
	AMP 支持（所有 API 和配置）：无替代方案；该功能已被弃用。
- **next lint command:** Use Biome or the ESLint CLI directly. (next build no longer runs linting.)  
	next lint 命令：直接使用 Biome 或 ESLint CLI。（next build 不再运行代码检查。）
- **Runtime Configs (serverRuntimeConfig, publicRuntimeConfig):** Use environment variables (.env files) instead.  
	运行时配置（serverRuntimeConfig, publicRuntimeConfig）：改用环境变量（.env 文件）。
- **Partial Pre-Rendering (PPR) Flags (experimental.ppr, export const experimental\_ppr):** PPR is evolving into the Cache Components model; opt-in using experimental.cacheComponents.  
	部分预渲染（PPR）标志（experimental.ppr, export const experimental\_ppr）：PPR 正在演变为缓存组件模型；使用 experimental.cacheComponents 进行选择加入。
- **scroll-behavior: smooth default:** Must opt back in by adding data-scroll-behavior=”smooth” to the HTML document.  
	滚动行为：平滑 默认：必须通过向 HTML 文档添加 data-scroll-behavior="smooth"来重新启用。
- **unstable\_rootParams():** An alternative API is planned for a future minor release.  
	unstable\_rootParams()：计划在未来的小版本发布中提供一个替代 API。

### Changed Default Behaviors已更改默认行为

Several defaults have been updated to align with modern performance and security standards:  
多个默认值已更新以符合现代性能和安全标准：

**Behavior Changes 行为变化**

- **Default Bundler:** Turbopack is now the default. Opt out with `next build --webpack`.  
	默认捆绑包：Turbopack 现在是默认的。使用 `next build --webpack` 退出。
- **Parallel Routes:** All parallel route slots now require an explicit `default.js` file. Builds will fail if this file is missing.  
	并行路由：所有并行路由插槽现在需要一个明确的 `default.js` 文件。如果缺少这个文件，构建将失败。
- **revalidateTag() Signature:** The function now requires a `cacheLife` profile as the second argument to enable SWR behavior.  
	revalidateTag() 签名：该函数现在需要将 `cacheLife` 配置文件作为第二个参数来启用 SWR 行为。

**Image Component Security and Caching  
图片组件安全性和缓存**

The defaults for the `next/image` component have been tightened and optimized:  
`next/image` 组件的默认设置已收紧和优化：

- **images.minimumCacheTTL:** 4 hours (14400s) (was 60s). Reduces revalidation cost for images missing `cache-control` headers.  
	images.minimumCacheTTL: 4 小时（14400 秒）（原为 60 秒）。减少缺少 `cache-control` 头部的图片重新验证成本。
- **images.maximumRedirects:** 3 redirects (was unlimited). Improves security; can be adjusted or set to `0` to disable.  
	images.maximumRedirects: 3 次重定向（原为无限制）。提高安全性；可调整或设置为 `0` 以禁用。
- **images.qualities:** \[75\] (was \[1..100\]). Improves consistency; the `quality` prop is now coerced to the closest value in the configured array.  
	images.qualities: \[75\]（原为\[1..100\]）。提高一致性； `quality` 属性现在被强制转换为配置数组中的最接近值。
- **Local IP Optimization:** Blocked by default. New security restriction (`images.dangerouslyAllowLocalIP` must be set to `true` for private networks).  
	本地 IP 优化：默认情况下被阻止。新的安全限制（ `images.dangerouslyAllowLocalIP` 必须设置为 `true` 用于私有网络）。
- **images.imageSizes:** Removed `16` from default sizes. Reduces the size of the generated `srcset` and API variations.  
	images.imageSizes: 从默认尺寸中移除了 `16` 。减少了生成的 `srcset` 和 API 变体的尺寸。

### Deprecations 弃用功能

These features are deprecated in Next.js 16 and will be removed in a future major version:  
这些功能在 Next.js 16 中已弃用，将在未来的主版本中移除：

- **middleware.ts filename:** Developers should rename this file to `proxy.ts` to clarify its role in network boundary and routing.  
	middleware.ts 文件名：开发者应将此文件重命名为 `proxy.ts` ，以明确其在网络边界和路由中的作用。
- **next/legacy/image component:** Use `next/image` instead.  
	next/legacy/image 组件：请使用 `next/image` 代替。
- **images.domains config:** Use `images.remotePatterns` instead for a more secure restriction of remote image sources.  
	images.domains 配置：请使用 `images.remotePatterns` 以更安全地限制远程图像源。
- **revalidateTag() single argument:** Replace with `revalidateTag(tag, profile)` for SWR, or `updateTag(tag)` in Server Actions for read-your-writes.  
	revalidateTag() 单一参数：用 `revalidateTag(tag, profile)` 替换 SWR，或在服务器操作中用 `updateTag(tag)` 读取您的写入。
