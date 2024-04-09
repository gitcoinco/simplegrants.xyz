import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import forms from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      colors: {
        ...colors,

        primary: colors.zinc,
        secondary: colors.purple,
        gray: colors.zinc,
        green: colors.emerald,
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), forms({ strategy: "class" })],
} satisfies Config;
