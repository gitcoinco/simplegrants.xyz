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
      },
      colors: {
        ...colors,

        primary: colors.zinc,
        gray: colors.zinc,
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), forms({ strategy: "class" })],
} satisfies Config;
