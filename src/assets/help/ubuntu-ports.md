## Ubuntu Ports 镜像使用帮助

打开`/etc/apt/sources.list`，检查您的版本代号，并将所有原来的内容修改为如下所示，您应手动将示例中的`$version`替换为您自己使用的Ubuntu的版本代号：

```
deb https://mirrors.geekpie.tech/ubuntu-ports/ $version main restricted universe multiverse
# deb-src https://mirrors.geekpie.tech/ubuntu-ports/ $version main restricted universe multiverse
deb https://mirrors.geekpie.tech/ubuntu-ports/ $version-updates main restricted universe multiverse
# deb-src https://mirrors.geekpie.tech/ubuntu-ports/ $version-updates main restricted universe multiverse
deb https://mirrors.geekpie.tech/ubuntu-ports/ $version-backports main restricted universe multiverse
# deb-src https://mirrors.geekpie.tech/ubuntu-ports/ $version-backports main restricted universe multiverse
deb https://mirrors.geekpie.tech/ubuntu-ports/ $version-security main restricted universe multiverse
# deb-src https://mirrors.geekpie.tech/ubuntu-ports/ $version-security main restricted universe multiverse
```

并更新索引：

```bash
apt update
```

注：默认注释源码镜像以提升同步速度。