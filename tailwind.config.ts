import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)"],
        display: ["var(--font-display)"],
        stencil: ["var(--font-stencil)"],
        sans: ["var(--font-display)"],
      },
      maxWidth: {
        "345": "86.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
