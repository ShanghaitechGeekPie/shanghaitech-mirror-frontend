# ShanghaiTech Open Source Mirror Frontend

![Workflow status](https://github.com/ShanghaitechGeekPie/shanghaitech-mirror-frontend/actions/workflows/docker-image.yml/badge.svg)
![GitHub stars](https://badgen.net/github/stars/ShanghaitechGeekPie/shanghaitech-mirror-frontend)
![GitHub forks](https://badgen.net/github/forks/ShanghaitechGeekPie/shanghaitech-mirror-frontend)

It is the frontend of the ShanghaiTech Open Source Mirror.

## Features

- SPA (Frontend routing)
- Search bar (Simple / RegExp mode)
- Quick Downloader
- Configuration Generator
- High performance in rendering large list page
- Adaptive dark theme
- Query Caching
- Small bundle size
- And many more...

## How to use

Fetch the dependencies.

```bash
bun install
```

Copy `.env` to `.env.local` and modify it.

```bash
cp .env .env.local
```

### Debug

Start the development server.

```bash
bun run start
```

### Build

Build with this command.

```bash
bun run build
```

You will get the `dist` folder. Upload it to your server.
