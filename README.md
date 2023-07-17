# ShanghaiTech Open Source Mirror Frontend

![Pipeline status](https://gitlab.isp.moe/geekpie/shanghaitech-mirror-frontend/badges/master/pipeline.svg)
![GitHub stars](https://badgen.net/github/stars/ShanghaitechGeekPie/shanghaitech-mirror-frontend)
![GitHub forks](https://badgen.net/github/forks/ShanghaitechGeekPie/shanghaitech-mirror-frontend)

It is the frontend of the ShanghaiTech Open Source Mirror.

## Features

- Single page application (Frontend routing)
- Search bar (Simple mode / RegExp mode)
- Quick Downloader & Configuration Generator
- High performance in rendering large list page
- Adaptive dark theme
- Query Caching
- Small bundle size
- And many more...

## How to use

Fetch the dependencies.

```bash
pnpm install
```

Copy `.env` to `.env.local` and modify it.

```bash
cp .env .env.local
```

### Debug

You may want to change `MIRROR_BACKEND_SEPARATION` to `true`.

Then start the development server.

```bash
pnpm start
```

### Build

Build with this command.

```bash
pnpm build
```

You will get the `dist` folder. Upload it to your server.