## Kali Linux 镜像使用帮助

### 一键替换

运行如下指令：

```bash
sudo sed -i "s|http://http.kali.org/kali|https://mirrors.shanghaitech.edu.cn/kali|g" /etc/apt/sources.list
```

并更新索引：

```bash
apt update
```

### 手动替换

打开`/etc/apt/sources.list`，将原来的内容修改为如下所示：

```
deb http://mirrors.shanghaitech.edu.cn/kali kali-rolling main non-free contrib
# deb-src http://mirrors.shanghaitech.edu.cn/kali kali-rolling main non-free contrib
```

并更新索引：

```bash
apt update
```

注：默认注释源码镜像以提升同步速度。

- - -

## 另请参阅

出于某些原因，本文档可能没有及时更新/缺少维护。

您还可以参阅 [Mirrorz 中关于此镜像的帮助页面](https://help.mirrors.cernet.edu.cn/kali/?mirror=ShanghaiTech+GeekPie)

> [!note]
> 该网站内容非 GeekPie 镜像站页面，使用此链接将产生校外流量。