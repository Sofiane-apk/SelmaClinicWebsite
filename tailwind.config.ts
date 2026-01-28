import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        selma: {
          purple: "#5B3A63",
          light: "#8B6A93",
          accent: "#A689B3"
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444"
      },
      borderRadius: {
        xl: "0.5rem",
        pill: "9999px"
      },
      maxWidth: {
        "content": "1280px"
      }
    }
  },
  plugins: []
};

export default config;

