import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    ...eslintPluginTailwindcss.configs.recommended,
    settings: {
      ...eslintPluginTailwindcss.configs.recommended.settings,
      tailwindcss: {
        ...eslintPluginTailwindcss.configs.recommended.settings?.tailwindcss,
        cssConfigPath: "./app/globals.css",
      },
    },
    rules: {
      "tailwindcss/no-custom-classname": [
        "warn",
        {
          whitelist: [
            "landing-.*",
            "hover:text-accent-hover",
            "\\*\\*:not-\\[\\]:border-x",
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
