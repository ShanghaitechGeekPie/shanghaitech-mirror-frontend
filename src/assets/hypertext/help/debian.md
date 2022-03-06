## Debian镜像使用帮助


先安装`ca-certificates`和`apt-transport-https`保证第三方https源可以使用。

```bash
sudo apt install -y ca-certificates apt-transport-https
```

### 一键替换

```bash
sudo sed -i "s|http://deb.debian.org/debian|https://mirrors.shanghaitech.edu.cn/debian|g" /etc/apt/sources.list
```

### 手动替换

打开`/etc/apt/sources.list`，将类似于`http://deb.debian.org/debian`的地址均替换为`https://mirror.shanghaitech.edu.cn/debian`即可。