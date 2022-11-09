## Arch Linux CN镜像使用帮助

Arch Linux中文社区仓库是由Arch Linux中文社区驱动的非官方用户仓库。包含中文用户常用软件、工具、字体/美化包等。

完整的包信息列表（包名称/架构/维护者/状态）请[点击这里](https://github.com/archlinuxcn/repo)查看。

在`/etc/pacman.conf`文件末尾添加两行：

```
[archlinuxcn]
Server = https://mirrors.shanghaitech.edu.cn/archlinuxcn/$arch
```

然后请安装`archlinuxcn-keyring`包以导入 GPG key。

```bash
sudo pacman -S archlinuxcn-keyring
```