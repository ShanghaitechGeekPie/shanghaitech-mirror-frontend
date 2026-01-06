## openSUSE 镜像使用帮助

### openSUSE Leap

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

### openSUSE Tumbleweed

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

- - -

## 另请参阅

出于某些原因，本文档可能没有及时更新/缺少维护。

您还可以参阅 [Mirrorz 中关于此镜像的帮助页面](https://help.mirrors.cernet.edu.cn/opensuse/?mirror=ShanghaiTech+GeekPie)

> [!note]
> 该网站内容非 GeekPie 镜像站页面，使用此链接将产生校外流量。