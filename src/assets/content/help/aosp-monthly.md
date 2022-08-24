## AOSP Monthly镜像使用帮助

这是每月自动打包的AOSP初始化包。

### 使用说明

先下载初始化包：

```bash
wget -c https://mirrors.shanghaitech.edu.cn/aosp-monthly/aosp-latest.tar.gz
```

然后解压（您可以使用`pigz`来加速解压）：

```bash
tar -xf aosp-latest.tar.gz --use-compress-program=pigz
```

然后进入`AOSP`目录，并同步并签出源码：

```bash
cd AOSP
repo sync
```

您可以只检出而不同步源码以节省时间：

```bash
repo sync -l
```

此后，每次只需运行`repo sync`即可保持同步。