## Linux Mint 镜像使用帮助

Linux Mint 也采用 apt 作为包管理器，与 Ubuntu 和 Debian 类似，你需要编辑`/etc/apt/sources.list`和`/etc/apt/sources.list.d/*`中的路径。对于来自 Ubuntu 的部分源，可以参考 Ubuntu 镜像使用帮助进行修改。

以 sonya 为例，需要修改`/etc/apt/sources.list.d/mint.list`，把`packages.linuxmint.com`替换为`mirrors.shanghaitech.edu.cn/linuxmint`。

```
deb http://mirrors.shanghaitech.edu.cn/linuxmint/ sonya main upstream import backport
```

也可以使用如下命令：

```bash
sed -i 's/packages.linuxmint.com/mirrors.shanghaitech.edu.cn\/linuxmint/g' /etc/apt/sources.list.d/mint.list
```

然后运行`apt update`即可。

- - -

## 另请参阅

出于某些原因，本文档可能没有及时更新/缺少维护。

您还可以参阅 [Mirrorz 中关于此镜像的帮助页面](https://help.mirrors.cernet.edu.cn/linuxmint/?mirror=ShanghaiTech+GeekPie)

> [!note]
> 该网站内容非 GeekPie 镜像站页面，使用此链接将产生校外流量。