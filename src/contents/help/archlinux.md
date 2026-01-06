## Arch Linux 镜像使用帮助

编辑`/etc/pacman.d/mirrorlist`，在文件的最顶端添加：

```
Server = https://mirrors.shanghaitech.edu.cn/archlinux/$repo/os/$arch
```

更新软件包缓存：

```bash
sudo pacman -Syy
```

- - -

## 另请参阅

出于某些原因，本文档可能没有及时更新/缺少维护。

您还可以参阅 [Mirrorz 中关于此镜像的帮助页面](https://help.mirrors.cernet.edu.cn/archlinux/?mirror=ShanghaiTech+GeekPie)

> [!note]
> 该网站内容非 GeekPie 镜像站页面，使用此链接将产生校外流量。