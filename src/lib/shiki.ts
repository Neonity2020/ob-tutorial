import { BundledLanguage, BundledTheme, codeToHtml, createHighlighter } from "shiki";

let highlighterInstance: Awaited<ReturnType<typeof createHighlighter>> | null = null;

/**
 * 获取或创建 Shiki 高亮器实例（单例模式）
 */
async function getHighlighter() {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: [
        "javascript",
        "typescript",
        "jsx",
        "tsx",
        "python",
        "java",
        "go",
        "rust",
        "c",
        "cpp",
        "csharp",
        "php",
        "ruby",
        "swift",
        "kotlin",
        "scala",
        "bash",
        "shell",
        "powershell",
        "sql",
        "json",
        "yaml",
        "toml",
        "xml",
        "html",
        "css",
        "scss",
        "less",
        "markdown",
        "dockerfile",
        "nginx",
        "graphql",
      ],
    });
  }
  return highlighterInstance;
}

/**
 * 将代码块转换为带语法高亮的 HTML
 * @param code 代码内容
 * @param language 编程语言
 * @param theme 主题（可选，默认根据系统主题）
 */
export async function highlightCode(
  code: string,
  language: string = "text",
  theme: "light" | "dark" = "dark"
): Promise<string> {
  try {
    const highlighter = await getHighlighter();
    
    // 标准化语言名称
    const normalizedLang = normalizeLanguage(language);
    
    // 如果语言不支持，使用纯文本
    const supportedLangs = highlighter.getLoadedLanguages();
    const lang = supportedLangs.includes(normalizedLang as BundledLanguage)
      ? normalizedLang
      : "text";

    const themeName: BundledTheme = theme === "light" ? "github-light" : "github-dark";

    const html = highlighter.codeToHtml(code, {
      lang: lang as BundledLanguage,
      theme: themeName,
    });

    return html;
  } catch (error) {
    console.error("Shiki highlighting error:", error);
    // 降级处理：返回带基本样式的代码块
    return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`;
  }
}

/**
 * 标准化语言名称（处理别名）
 */
function normalizeLanguage(lang: string): string {
  const languageMap: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    rb: "ruby",
    sh: "bash",
    yml: "yaml",
    dockerfile: "docker",
    md: "markdown",
  };

  return languageMap[lang.toLowerCase()] || lang.toLowerCase();
}

/**
 * HTML 转义
 */
function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapeMap[char]);
}

/**
 * 同步版本（用于服务端渲染）
 * 使用 codeToHtml 直接转换
 */
export async function highlightCodeSync(
  code: string,
  language: string = "text",
  theme: "light" | "dark" = "dark"
): Promise<string> {
  try {
    const normalizedLang = normalizeLanguage(language);
    const themeName: BundledTheme = theme === "light" ? "github-light" : "github-dark";

    const html = await codeToHtml(code, {
      lang: normalizedLang as BundledLanguage,
      theme: themeName,
    });

    return html;
  } catch (error) {
    console.error("Shiki sync highlighting error:", error);
    return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`;
  }
}
