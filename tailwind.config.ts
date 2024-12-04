import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "428px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        vazirmatn: ['Vazirmatn', 'sans-serif'], // فونت وزیرمتن
      },
      colors: {
        dark: {
          50:'#F9FAFB',
          100:'#F3F4F6',
          200:'#E5E7EB',
          300:'#D1D5DB',
          400:'#9CA3AF',
          500:'#6B7280',
          600:'#4B5563',
          700:'#374151',
          800:'#1F2937',
          900:'#111827',
          950:'#0B121F'
        },
        primary: {
          50:'#E6F1FD',
          100:'#CCE3FC',
          200:'#B3D5FA',
          300:'#99C7F9',
          400:'#66ACF5',
          500:'#3390F2',
          600:'#0074EF',
          700:'#005DBF',
          800:'#00468F',
          900:'#002E60',
          950:'#002348'
        },
        green: {
          50:'#F0FDD4',
          100:'#DCFCE7',
          200:'#BBF7D0',
          300:'#86EFAC',
          400:'#4ADE80',
          500:'#22C55E',
          600:'#16A34A',
          700:'#15803D',
          800:'#166534',
          900:'#14532D',
          950:'#0E3A1F'
        },
        yellow:{
          50:'#F0FDD4',
          100:'#F0FDD4',
          200:'#F0FDD4',
          300:'#F0FDD4',
          400:'#F0FDD4',
          500:'#F0FDD4',
          600:'#F0FDD4',
          700:'#F0FDD4',
          800:'#F0FDD4',
          900:'#F0FDD4',
          950:'#F0FDD4'
        },
        red:{
          50:'#FEF2F2',
          100:'#FEE2E2',
          200:'#FECACA',
          300:'#FCA5A5',
          400:'#F87171',
          500:'#EF4444',
          600:'#DC2626',
          700:'#B91C1C',
          800:'#991B1B',
          900:'#7D1D1D',
          950:'#5F1616'
        },
        // colors for text contents
        content:{
          50:'#FAFAFA',
          100:'#F4F4F5',
          200:'#E4E4E7',
          300:'#D4D4D8',
          400:'#A1A1AA',
          500:'#71717A',
          600:'#52525B',
          700:'#3F3F46',
          800:'#27272A',
          900:'#18181B',
          950:'#101012'
        }
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }:{ addUtilities: (utilities: Record<string, any>, variants?: string[]) => void }) {
      const customClasses = {
        ".size-caption-sm": {
          fontSize: "12px",
          lineHeight: "18px",
        },
        ".size-caption-lg": {
          fontSize: "14px",
          lineHeight: "20px",
        },
        ".size-body-sm": {
          fontSize: "16px",
          lineHeight: "24px",
        },
        ".size-body-lg": {
          fontSize: "18px",
          lineHeight: "28px",
        },
        ".size-body-xl": {
          fontSize: "20px",
          lineHeight: "30px",
        },
        ".size-heading-6": {
          fontSize: "24px",
          lineHeight: "32px",
        },
        ".size-heading-5": {
          fontSize: "30px",
          lineHeight: "38px",
        },
        ".size-heading-4": {
          fontSize: "36px",
          lineHeight: "44px",
        },
        ".size-heading-3": {
          fontSize: "48px",
          lineHeight: "60px",
        },
        ".size-heading-2": {
          fontSize: "60px",
          lineHeight: "72px",
        },
        ".size-heading-1": {
          fontSize: "72px",
          lineHeight: "90px",
        },

        ".weight-bold": {
          fontWeight: "700",
        },
        ".weight-semi": {
          fontWeight: "600",
        },
        ".weight-medium": {
          fontWeight: "500",
        },
        ".weight-regular": {
          fontWeight: "400",
        }
      };

      addUtilities(customClasses, ["responsive", "hover"]);
    }),

  ],
};
export default config;
