## ROS 镜像使用帮助

新建`/etc/apt/sources.list.d/ros-latest.list`，内容为（您应手动将示例中的`$version`替换为您自己使用的 Ubuntu/Debian 的版本代号）：

```plain
deb https://mirrors.shanghaitech.edu.cn/ros/ubuntu/ $version main
```

然后再输入如下命令，信任 ROS 的 GPG Key，并更新索引：

```plain
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
sudo apt update
```

- - -

## 另请参阅

出于某些原因，本文档可能没有及时更新/缺少维护。

您还可以参阅 [Mirrorz 中关于此镜像的帮助页面](https://help.mirrors.cernet.edu.cn/ros/?mirror=ShanghaiTech+GeekPie)

> [!note]
> 该网站内容非 GeekPie 镜像站页面，使用此链接将产生校外流量。