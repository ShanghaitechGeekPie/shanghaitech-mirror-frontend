## Raspbian 镜像使用帮助

打开`/etc/apt/sources.list`，检查您的版本代号，并将所有原来的内容修改为如下所示，您应手动将示例中的`$version`替换为您自己使用的 Raspbian 的版本代号。

```
deb http://mirrors.shanghaitech.edu.cn/raspbian/raspbian/ $version main non-free contrib rpi
# deb-src http://mirrors.shanghaitech.edu.cn/raspbian/raspbian/ $version main non-free contrib rpi
```

更新索引以检查是否配置正确：

```bash
apt update
```

注：网址末尾的`raspbian`重复两次是必须的。因为`Raspbian`仓库中除了 APT 软件源还包含其他代码，APT 软件源不在仓库的根目录，而在`raspbian`目录的子目录下。

- - -

## 另请参阅

出于某些原因，本文档可能没有及时更新/缺少维护。

您还可以参阅 [Mirrorz 中关于此镜像的帮助页面](https://help.mirrors.cernet.edu.cn/raspbian/?mirror=ShanghaiTech+GeekPie)

> [!note]
> 该网站内容非 GeekPie 镜像站页面，使用此链接将产生校外流量。