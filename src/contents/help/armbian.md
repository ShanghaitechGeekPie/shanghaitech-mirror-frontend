## Armbian 镜像使用帮助

Armbian 是一个用于单板计算机 (SBC) 的基础操作系统平台，其他项目可以信赖它来建立专门用于 ARM 开发板的基于 Debian 或 Ubuntu 的轻量级 Linux 发行版。

### 自动替换

运行`armbian-config` -> Personal -> Mirrors -> 选择镜像站。

### 手动替换

编辑`/etc/apt/sources.list.d/armbian.list`，将`http://apt.armbian.com`替换为`https://mirror.shanghaitech.edu.cn/armbian/`，然后执行`apt update`。

- - -

## 另请参阅

出于某些原因，本文档可能没有及时更新/缺少维护。

您还可以参阅 [Mirrorz 中关于此镜像的帮助页面](https://help.mirrors.cernet.edu.cn/armbian/?mirror=ShanghaiTech+GeekPie)

> [!note]
> 该网站内容非 GeekPie 镜像站页面，使用此链接将产生校外流量。