## Debian 镜像使用帮助


先安装`ca-certificates`和`apt-transport-https`保证第三方 https 源可以使用。

```bash
sudo apt install -y ca-certificates apt-transport-https
```

### 一键替换

```bash
sudo sed -i "s|http://deb.debian.org/debian|https://mirrors.shanghaitech.edu.cn/debian|g" /etc/apt/sources.list
```

### 手动替换

打开`/etc/apt/sources.list`，将类似于`http://deb.debian.org/debian`的地址均替换为`https://mirror.shanghaitech.edu.cn/debian`即可。

- - -

## 另请参阅

出于某些原因，本文档可能没有及时更新/缺少维护。

您还可以参阅 [Mirrorz 中关于此镜像的帮助页面](https://help.mirrors.cernet.edu.cn/debian/?mirror=ShanghaiTech+GeekPie)

> [!note]
> 该网站内容非 GeekPie 镜像站页面，使用此链接将产生校外流量。