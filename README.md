# ShanghaiTech Open Source Mirror Frontend

It is the frontend of the ShanghaiTech Open Source Mirror.

## Features

- Single page application (Frontend routing)
- Search bar (Standard mode / RegRex mode)
- Quick Downloader & Configuration Generator
- High preferformance in large list page (e.g. /archlinux/community/os/x86_64/)
  - PKU Mirror: 12045ms
  - Geekpie Mirror: 182ms
- More and more...


## How to use

Fetch the dependencies.

```
yarn
```

Build it.

```
yarn build
```

You will get the `dist` folder. Upload it to your server.

Run this command if you feel like debuging it.

```
yarn start
```