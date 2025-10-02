import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  clean: true,
  dts: true,
  format: "esm",
  skipNodeModulesBundle: true,
  platform: "neutral",
});
