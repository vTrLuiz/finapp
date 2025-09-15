/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        primary: "rgb(var(--color-primary))",
        secondary: "rgb(var(--color-secondary))",
        neutralDark: "rgb(var(--color-neutral-dark))",
        neutralLight: "rgb(var(--color-neutral-light))",
        positive: "rgb(var(--color-positive))",
        negative: "rgb(var(--color-negative))",
        background: "rgb(var(--color-background))",
        foreground: "rgb(var(--color-foreground))",
        card: {
          DEFAULT: "rgb(var(--color-card))",
          foreground: "rgb(var(--color-card-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--color-popover))",
          foreground: "rgb(var(--color-popover-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--color-muted))",
          foreground: "rgb(var(--color-muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent))",
          foreground: "rgb(var(--color-accent-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--color-destructive))",
          foreground: "rgb(var(--color-destructive-foreground))",
        },
        border: "rgb(var(--color-border))",
        input: "rgb(var(--color-input))",
        ring: "rgb(var(--color-ring))",
        chart: {
          1: "rgb(var(--color-chart-1))",
          2: "rgb(var(--color-chart-2))",
          3: "rgb(var(--color-chart-3))",
          4: "rgb(var(--color-chart-4))",
          5: "rgb(var(--color-chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};
