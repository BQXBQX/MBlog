import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.6qx.top",
  integrations: [
    mdx(),
    sitemap(),
    solidJs({
      include: ["**/solid/*", "**/node_modules/@suid/material/**"],
    }),
  ],
});
