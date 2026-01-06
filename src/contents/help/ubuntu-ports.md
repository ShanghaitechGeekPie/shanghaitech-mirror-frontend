## Ubuntu Ports 镜像使用帮助

打开`/etc/apt/sources.list`，检查您的版本代号，并将所有原来的内容修改为如下所示，您应手动将示例中的`$version`替换为您自己使用的 Ubuntu 的版本代号：

```
deb https://mirrors.shanghaitech.edu.cn/ubuntu-ports/ $version main restricted universe multiverse
# deb-src https://mirrors.shanghaitech.edu.cn/ubuntu-ports/ $version main restricted universe multiverse
deb https://mirrors.shanghaitech.edu.cn/ubuntu-ports/ $version-updates main restricted universe multiverse
# deb-src https://mirrors.shanghaitech.edu.cn/ubuntu-ports/ $version-updates main restricted universe multiverse
deb https://mirrors.shanghaitech.edu.cn/ubuntu-ports/ $version-backports main restricted universe multiverse
# deb-src https://mirrors.shanghaitech.edu.cn/ubuntu-ports/ $version-backports main restricted universe multiverse
deb https://mirrors.shanghaitech.edu.cn/ubuntu-ports/ $version-security main restricted universe multiverse
# deb-src https://mirrors.shanghaitech.edu.cn/ubuntu-ports/ $version-security main restricted universe multiverse
```

并更新索引：

```bash
apt update
```

注：默认注释源码镜像以提升同步速度。

- - -

## 另请参阅

出于某些原因，本文档可能没有及时更新/缺少维护。

您还可以参阅 [Mirrorz 中关于此镜像的帮助页面](https://help.mirrors.cernet.edu.cn/ubuntu-ports/?mirror=ShanghaiTech+GeekPie)

> [!note]
> 该网站内容非 GeekPie 镜像站页面，使用此链接将产生校外流量。