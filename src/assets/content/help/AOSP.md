## AOSP 镜像使用帮助

### 安装 Repo 客户端

您应当首先考虑使用您的 Linux 发行版中的官方软件包。

#### Ubuntu

```bash
apt update
apt install repo
```

#### Archlinux

```bash
pacman -Sy repo
```

#### Fedora

```bash
dnf update
dnf install repo
```

如果这些命令不适用于您的系统（例如，您发现软件包版本已过时，或您的 Linux 发行版中没有可用的官方软件包），请使用以下命令手动安装`Repo`：

```bash
export REPO=$(mktemp /tmp/repo.XXXXXXXXX)
curl -o ${REPO} https://storage.googleapis.com/git-repo-downloads/repo
install -m 755 ${REPO} ~/bin/repo
```

您可能会希望从我们的镜像源获取`Repo`：

```bash
export REPO=$(mktemp /tmp/repo.XXXXXXXXX)
curl -o ${REPO} https://mirrors.shanghaitech.edu.cn/git-repo/repo
install -m 755 ${REPO} ~/bin/repo
```

这些命令会设置一个临时文件，将`Repo`下载到该文件中并安装。

安装后，运行`repo version`，并验证输出的前几行是否与下方内容相似：

```
<repo not installed>
repo launcher version 2.21
(from /usr/bin/repo)
```

- 如果报告的`repo launcher version`编号为 2.15 或更高，则表明版本号正确，安装无误。
- `(from /usr/bin/repo)`表明是通过软件包进行安装的。
- `(from /home/<>/bin/repo)`表明是手动安装的。

### 初始化 Repo 客户端

创建一个空目录来存放您的工作文件。为其指定一个您喜欢的任意名称：

```bash
mkdir WORKING_DIRECTORY
cd WORKING_DIRECTORY
```

使用您的姓名和电子邮件地址配置`Git`，您在此处提供的姓名将显示在您提交的代码的提供方信息中：

```bash
git config --global user.name Your Name
git config --global user.email you@example.com
```

### 初始化仓库：

```bash
repo init -u https://mirrors.shanghaitech.edu.cn/git/AOSP/platform/manifest.git
```

`Repo`会在初始化仓库前尝试从官方源获取更新，如果您无法访问官方源，可设置以下环境变量以使用我们的镜像源：

```bash
export REPO_URL="https://mirrors.shanghaitech.edu.cn/git/git-repo"
```

如需签出某个特定的`Android`版本：

```bash
repo init -u https://mirrors.shanghaitech.edu.cn/git/AOSP/platform/manifest.git -b android-13.0.0_r3
```

> 您可以在此处获取完整列表：<https://source.android.com/docs/setup/start/build-numbers#source-code-tags-and-builds>

如果您收到`/usr/bin/env 'python' no such file or directory`错误消息，请先确保您已安装`Python 3`，然后运行：

```bash
sudo ln -s /usr/bin/python3 /usr/bin/python
```

初始化成功后，系统将显示一条消息，告诉您`Repo`已在工作目录中完成初始化。您的客户端目录现在包含一个`.repo`目录，这是清单等文件存放的位置。

### 同步源码树

如需将`Android`源码树从默认清单中指定的代码库下载到工作目录，请运行以下命令：

```bash
repo sync
```

如需加快同步速度，请传递`-c`（当前分支）和`-j${thread}`标记：

```bash
repo sync -c -j4
```

### 建立次级镜像

当您使用多个客户端时（尤其是在带宽不足的情况下），最好为服务器的全部内容创建一个本地镜像，并从该镜像同步客户端，这将有助于减轻我们的服务器压力。

以下说明假定镜像创建在`/usr/local/aosp/mirror`中。首先，创建并同步镜像本身。请注意`--mirror`标记，该标记只能在创建新客户端时指定：

```bash
mkdir -p /usr/local/aosp/mirror
cd /usr/local/aosp/mirror
repo init -u https://mirrors.shanghaitech.edu.cn/git/AOSP/platform/manifest.git --mirror
repo sync
```

您可以将镜像存储在内网的服务器上，然后通过`NFS`、`Git`或`SSH`访问它。您还可以将其存储在移动存储盘上，并在用户之间或计算机之间传递该存储盘。

### 替换已有源码的 Remote

若您之前已通过某种途径获得了`AOSP`的源码，仅需修改`.repo/manifests.git/config`，将`url`字段更改为：

```
url = https://mirrors.shanghaitech.edu.cn/git/AOSP/platform/manifest
```

即可使用我们的镜像服务。