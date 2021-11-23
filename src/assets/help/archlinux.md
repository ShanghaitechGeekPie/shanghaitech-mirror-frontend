## Arch Linux 软件仓库镜像使用帮助

编辑 /etc/pacman.d/mirrorlist， 在文件的最顶端添加：

```
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
```

更新软件包缓存：

```
sudo pacman -Syy
```