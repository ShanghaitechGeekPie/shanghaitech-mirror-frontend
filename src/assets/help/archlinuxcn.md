## Arch Linux CN 镜像使用帮助

Arch Linux 中文社区仓库是由 Arch Linux 中文社区驱动的非官方用户仓库。包含中文用户常用软件、工具、字体/美化包等。

官方仓库地址：<http://repo.archlinuxcn.org>

在 `/etc/pacman.conf` 文件末尾添加两行：

```
[archlinuxcn]
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
```

然后请安装 `archlinuxcn-keyring` 包以导入 GPG key。

```
sudo pacman -S archlinuxcn-keyring
```