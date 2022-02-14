## AOSC OS 镜像使用帮助

### 地址

```
https://mirrors.geekpie.tech/anthon/
```

### 说明

AOSC OS（安同 OS）软件源。AOSC OS 是一个由安同开源社区（[https://aosc.io](https://aosc.io)）开发的半滚动 Linux 发行版，支持多种处理器架构。

### 使用说明

打开`/etc/apt/sources.list`，并手动替换：
```
# AOSC repository (mirrored by GeekPie)
deb https://mirrors.geekpie.club/anthon/debs/ stable main
```
并更新索引：

```bash
apt update
```

### 相关链接

- 官方主页: [https://aosc.io](https://aosc.io)
- 文档: [https://wiki.aosc.io](https://wiki.aosc.io)
- 镜像列表: [https://aosc.io/repo](https://aosc.io/repo)
