## ALHP 镜像使用帮助

ALHP 是一个第三方 Arch Linux 仓库，其包含用不同`x86-64`微架构功能等级、`-O3`和 LTO 编译的二进制包。

本镜像包含此仓库所有受支持的微架构功能等级，包括`x86-64-v2`和`x86-64-v3`。

您可以在[此处](https://mirrors.shanghaitech.edu.cn/alhp/packages.html)查询所有软件包的构建信息。

### 检查系统兼容性

使用`/lib/ld-linux-x86-64.so.2 --help`命令来检测您的 CPU 支持哪种微架构功能等级。

比如，如果您的 CPU 支持`x86-64-v3`，则输出应该包含：

```
Subdirectories of glibc-hwcaps directories, in priority order:
  x86-64-v4
  x86-64-v3 (supported, searched)
  x86-64-v2 (supported, searched)
```

### 安装密钥环和镜像列表

从 AUR 安装`alhp-keyring`和`alhp-mirrorlist`。比如，使用`yay`：

```bash
yay -S alhp-keyring alhp-mirrorlist
```

`alhp-keyring`提供了当前 ALHP 使用的签名密钥，`alhp-mirrorlist`提供了一些镜像以供选择。

### 选择一个镜像

编辑`/etc/pacman.d/alhp-mirrorlist`，通过注释来启用或禁用镜像。默认的选择是一个基于 Cloudflare 的镜像，它本应该在全球范围内提供一个较快的速度，但由于种种原因，它可能在某些地区不可用，因此您也许会希望使用我们的镜像。

您只需要将我们的镜像移动到其他镜像之前即可，譬如这样：

```
# Asia
Server = https://mirrors.shanghaitech.edu.cn/alhp/$repo/os/$arch/

## Worldwide (Cloudfare)
Server = https://alhp.krautflare.de/$repo/os/$arch/
```

### 配置 Pacman

编辑`/etc/pacman.conf`，在官方仓库的上方添加相应的仓库。

比如，如果您的 CPU 支持`x86-64-v3`，则修改后应该如下所示：

```
[core-x86-64-v3]
Include = /etc/pacman.d/alhp-mirrorlist

[extra-x86-64-v3]
Include = /etc/pacman.d/alhp-mirrorlist

[community-x86-64-v3]
Include = /etc/pacman.d/alhp-mirrorlist

[core]
Include = /etc/pacman.d/mirrorlist

[extra]
Include = /etc/pacman.d/mirrorlist

[community]
Include = /etc/pacman.d/mirrorlist
```

将`x86-64-v3`替换为你想使用的微架构功能等级。

### 更新系统

```bash
sudo pacman -Syu
````

### 如何禁用

如果您不再需要 ALHP，可以先删除`/etc/pacman.conf`中的仓库，再删除`alhp-keyring`和`alhp-mirrorlist`来禁用 ALHP。

然后，你可以刷新数据库并更换回官方软件包，比如：

```bash
sudo pacman -Syuu
```
