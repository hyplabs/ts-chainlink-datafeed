import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: true,
  sourcemap: false,
  treeshake: true,
  clean: true,
  external: ["react"],
});
