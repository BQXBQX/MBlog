---
title: "MBlog 开发文档"
description: "MBlog，基于 astro & solid.js 所开发的博客系统。本文记录本博客的开发文档，并作为文章展示的测试样例。展示项目整体架构和未来的TODO"
pubDate: " Jul 08 2022"
heroImage: "/img/development/developHero.jpg"
---

## 😊 Quick Start

```sh
git clone https://github.com/BQXBQX/MBlog.git
```

> 🧑‍🚀 This is the blog template powered by `astro` and `solidjs`

## 🚀 Project Structure

Inside of your MBlog project, you'll see the following folders and files:

```text
├─public
│  └─fonts
├──src
│   ├─assets
│   │  └─svgs
│   ├─components
│   │  └─solid
│   ├─content
│   │  └─blog
│   ├─layouts
│   ├─pages
│   │  └─blog
│   └─styles
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components. I use solid as my components framework.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [astro documentation](https://docs.astro.build) or jump into astro [Discord server](https://astro.build/chat).

## ✊ TODO:

- [ ] Blog page bottom navigation bar
- [ ] Friendly link page
- [x] Bottom comment section
- [ ] One click back to the bottom button
- [ ] Article tags
- [ ] Global search box
- [ ] Night mode
- [ ] Optimised font file size
- [ ] Overall blog catalogue
- [ ] Back-office management system
- [ ] 404 page
