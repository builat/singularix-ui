import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  html: {
    title: "Singularix Home",
  },
  output: {
    manifest: true,
    distPath: {
      root: "build",
    },
  },
  plugins: [pluginReact()],
});
