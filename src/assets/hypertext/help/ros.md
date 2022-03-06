## ROS镜像使用帮助

新建`/etc/apt/sources.list.d/ros-latest.list`，内容为（您应手动将示例中的`$version`替换为您自己使用的Ubuntu/Debian的版本代号）：

```plain
deb https://mirrors.shanghaitech.edu.cn/ros/ubuntu/ $version main
```

然后再输入如下命令，信任ROS的GPG Key，并更新索引：

```plain
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
sudo apt update
```