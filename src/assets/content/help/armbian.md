## Armbian 镜像使用帮助

Armbian 是一个用于单板计算机 (SBC) 的基础操作系统平台，其他项目可以信赖它来建立专门用于 ARM 开发板的基于 Debian 或 Ubuntu 的轻量级 Linux 发行版。

### 自动替换

运行`armbian-config` -> Personal -> Mirrors -> 选择镜像站。

### 手动替换

编辑`/etc/apt/sources.list.d/armbian.list`，将`http://apt.armbian.com`替换为`https://mirror.shanghaitech.edu.cn/armbian/`，然后执行`apt update`。