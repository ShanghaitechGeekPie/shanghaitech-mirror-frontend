## Manjaro Linux 镜像使用帮助

编辑 `/etc/pacman.d/mirrorlist`， 在文件的最顶端添加：

```
Server = https://mirrors.geekpie.tech/manjaro/stable/$repo/$arch
```

更新软件包缓存：

```bash
sudo pacman -Syy
```