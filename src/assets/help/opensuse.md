## openSUSE 镜像使用帮助

### Leap 15.2 或更新版本

禁用官方软件源并添加本镜像源：

```bash
sudo zypper mr -da

sudo zypper ar -cfg 'https://mirrors.shanghaitech.edu.cn/opensuse/distribution/leap/$releasever/repo/oss/' shtu-oss
sudo zypper ar -cfg 'https://mirrors.shanghaitech.edu.cn/opensuse/distribution/leap/$releasever/repo/non-oss/' shtu-non-oss
sudo zypper ar -cfg 'https://mirrors.shanghaitech.edu.cn/opensuse/update/leap/$releasever/oss/' shtu-update
sudo zypper ar -cfg 'https://mirrors.shanghaitech.edu.cn/opensuse/update/leap/$releasever/non-oss/' shtu-update-non-oss
```

若您使用`Leap 15.3`，则还需添加`sle`以及`backports`源：

```bash
sudo zypper ar -cfg 'https://mirrors.shanghaitech.edu.cn/opensuse/update/leap/$releasever/sle/' shtu-sle-update
sudo zypper ar -cfg 'https://mirrors.shanghaitech.edu.cn/opensuse/update/leap/$releasever/backports/' shtu-backports-update
```

最后，刷新软件源：

```bash
sudo zypper ref
```

注：若您使用`Leap 15.3`，且在安装时未启用在线软件源，`sle`源以及`backports`源将在系统首次更新后自动引入，请确保系统在更新后仅启用了六个所需软件源。您可使用`zypper lr` 以检查软件源状态，并使用`zypper mr -d`禁用多余软件源。

### openSUSE Tumbleweed 使用方法

禁用官方软件源并添加本镜像源：

```bash
sudo zypper mr -da

sudo zypper ar -cfg 'https://mirrors.shanghaitech.edu.cn/opensuse/tumbleweed/repo/oss/' shtu-oss
sudo zypper ar -cfg 'https://mirrors.shanghaitech.edu.cn/opensuse/tumbleweed/repo/non-oss/' shtu-non-oss
```

刷新软件源：

```bash
sudo zypper ref
```