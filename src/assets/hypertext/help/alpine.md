## Alpine 镜像使用帮助

Alpine Linux 是一个面向安全，轻量级的Linux发行版。

在终端输入以下命令以使用我们的镜像源：

```bash
sed -i 's/dl-cdn.alpinelinux.org/mirrors.shanghaitech.edu.cn/g' /etc/apk/repositories
```