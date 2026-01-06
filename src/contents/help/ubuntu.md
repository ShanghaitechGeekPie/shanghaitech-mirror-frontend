## Ubuntu 镜像使用帮助

### 版本号

> [!warning]
> 注意：您应手动将下列示例中的`$version`替换为您自己使用的 Ubuntu 的版本代号

例如：

- Ubuntu 24.04 LTS: `noble`
- Ubuntu 22.04 LTS: `jammy`
- Ubuntu 25.04: `plucky`
- Ubuntu 24.10: `oracular`

等

### DEB822 格式 `/etc/apt/sources.list.d/ubuntu.sources`

复制并替换：

```bash
# 镜像源
Types: deb
URIs: https://mirrors.shanghaitech.edu.cn/ubuntu
Suites: $version $version-updates $version-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 安全更新源，不建议替换
Types: deb
URIs: http://security.ubuntu.com/ubuntu/
Suites: $version-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

### 传统格式 `/etc/apt/sources.list`

#### 一键替换

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

#### 手动替换

打开`/etc/apt/sources.list`，检查您的版本代号，并将所有原来的内容修改为如下所示：

```bash
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

- - -

## 另请参阅

出于某些原因，本文档可能没有及时更新/缺少维护。

您还可以参阅 [Mirrorz 中关于此镜像的帮助页面](https://help.mirrors.cernet.edu.cn/ubuntu/?mirror=ShanghaiTech+GeekPie)

> [!note]
> 该网站内容非 GeekPie 镜像站页面，使用此链接将产生校外流量。