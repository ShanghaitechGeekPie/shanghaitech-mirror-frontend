## Ubuntu 镜像使用帮助

### 一键替换

运行如下指令：

```bash
sudo sed -e 's|http://cn.archive.ubuntu.com/ubuntu|https://mirrors.shanghaitech.edu.cn/ubuntu|g' \
         -e 's|http://security.ubuntu.com/ubuntu|https://mirrors.shanghaitech.edu.cn/ubuntu|g' \
         /etc/apt/sources.list
```

并更新索引：

```bash
apt update
```

### 手动替换

打开`/etc/apt/sources.list`，检查您的版本代号，并将所有原来的内容修改为如下所示，您应手动将示例中的`$version`替换为您自己使用的Ubuntu的版本代号：

```
deb https://mirrors.shanghaitech.edu.cn/ubuntu/ $version main restricted universe multiverse
# deb-src https://mirrors.shanghaitech.edu.cn/ubuntu/ $version main restricted universe multiverse
deb https://mirrors.shanghaitech.edu.cn/ubuntu/ $version-updates main restricted universe multiverse
# deb-src https://mirrors.shanghaitech.edu.cn/ubuntu/ $version-updates main restricted universe multiverse
deb https://mirrors.shanghaitech.edu.cn/ubuntu/ $version-backports main restricted universe multiverse
# deb-src https://mirrors.shanghaitech.edu.cn/ubuntu/ $version-backports main restricted universe multiverse
deb https://mirrors.shanghaitech.edu.cn/ubuntu/ $version-security main restricted universe multiverse
# deb-src https://mirrors.shanghaitech.edu.cn/ubuntu/ $version-security main restricted universe multiverse
```

并更新索引：

```bash
apt update
```

注：默认注释源码镜像以提升同步速度。