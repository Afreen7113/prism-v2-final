import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy support mappings
        "primary-glow": "var(--prism-primary-glow)",
        "secondary": "var(--prism-semantic-accent)",
        "tertiary": "var(--color-accent)",
        "border-glow": "var(--prism-border-glow)",
        
        // Requested specific mappings
        'bg-base': 'var(--color-bg-base)',
        'bg-surface': 'var(--color-bg-surface)',
        'bg-elevated': 'var(--color-bg-elevated)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'border-subtle': 'var(--color-border-subtle)',
        'border-default': 'var(--color-border-default)',
        'primary': 'var(--color-primary)',
        'accent': 'var(--color-accent)',
        'info': 'var(--color-info)',
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'error': 'var(--color-error)',
        
        // CEO Review requested tokens
        'brand': 'var(--color-primary)',
        'text-brand': 'var(--color-primary)',
        'text-on-primary': 'var(--semantic-text-on-primary)',
        'status-success': 'var(--color-success)',
        'status-warning': 'var(--color-warning)',
        'status-error': 'var(--color-error)',
        
        // Code Syntax Tokens
        'code-keyword': 'var(--color-code-keyword)',
        'code-string': 'var(--color-code-string)',
        'code-component': 'var(--color-code-component)',
        'code-prop': 'var(--color-code-prop)',
        'code-comment': 'var(--color-code-comment)',
        'code-default': 'var(--color-code-default)',
      },
      boxShadow: {
        'glow-primary': 'var(--shadow-glow-primary)',
        'card': 'var(--shadow-card)',
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-text-primary': 'var(--gradient-primary)',
      },
      fontFamily: {
        sans: ["var(--prism-semantic-font, var(--font-inter))", "sans-serif"],
        mono: ["var(--prism-font-mono, var(--font-geist-mono))", "monospace"],
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.32, 0.72, 0, 1)",
        "custom-ease": "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
};
export default config;
