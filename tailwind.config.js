/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        govchile: {
          "primary":           "#1e40af",
          "primary-content":   "#ffffff",
          "secondary":         "#3b82f6",
          "secondary-content": "#ffffff",
          "accent":            "#d97706",
          "accent-content":    "#ffffff",
          "neutral":           "#374151",
          "neutral-content":   "#f9fafb",
          "base-100":          "#ffffff",
          "base-200":          "#f5f7ff",
          "base-300":          "#e5e7eb",
          "base-content":      "#111827",
          "info":              "#3b82f6",
          "info-content":      "#ffffff",
          "success":           "#16a34a",
          "success-content":   "#ffffff",
          "warning":           "#d97706",
          "warning-content":   "#ffffff",
          "error":             "#dc2626",
          "error-content":     "#ffffff",
        },
      },
    ],
  },
}
