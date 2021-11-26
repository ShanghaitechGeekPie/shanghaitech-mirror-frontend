## Raspbian 镜像使用帮助

打开`/etc/apt/sources.list`，检查您的版本代号，并将所有原来的内容修改为如下所示，您应手动将示例中的`$version`替换为您自己使用的Raspbian的版本代号：

```
deb http://mirrors.shanghaitech.edu.cn/raspbian/raspbian/ $version main non-free contrib rpi
# deb-src http://mirrors.shanghaitech.edu.cn/raspbian/raspbian/ $version main non-free contrib rpi
```

更新索引以检查是否配置正确：

```bash
apt update
```

注：网址末尾的`raspbian`重复两次是必须的。因为`Raspbian`仓库中除了APT软件源还包含其他代码，APT软件源不在仓库的根目录，而在`raspbian`目录的子目录下。