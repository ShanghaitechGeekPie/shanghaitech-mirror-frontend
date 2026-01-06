## AOSP Monthly 镜像使用帮助

这是每月~~自动~~打包的 AOSP 初始化包。

### 使用说明

先下载初始化包：

```bash
curl -C - -O https://mirrors.shanghaitech.edu.cn/aosp-monthly/aosp-latest.tar
```

校验 SHA256 值：

```bash
curl -s https://mirrors.shanghaitech.edu.cn/aosp-monthly/aosp-latest.tar.sha256 | sha256sum -c
```

解包，会释放出一个隐藏目录`.repo`：

```bash
tar -xf aosp-latest.tar
```

同步并签出源码：

```bash
repo sync
```

您可以只签出而不同步源码以节省时间：

```bash
repo sync -l
```

此后，每次只需运行`repo sync`即可保持同步。

- - -

## 另请参阅

出于某些原因，本文档可能没有及时更新/缺少维护。

您还可以参阅 [Mirrorz 中关于此镜像的帮助页面](https://help.mirrors.cernet.edu.cn/aosp-monthly/?mirror=ShanghaiTech+GeekPie)

> [!note]
> 该网站内容非 GeekPie 镜像站页面，使用此链接将产生校外流量。