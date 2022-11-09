## Kali Linux镜像使用帮助

### 一键替换

运行如下指令：

```bash
sudo sed -i "s|http://http.kali.org/kali|https://mirrors.shanghaitech.edu.cn/kali|g" /etc/apt/sources.list
```

并更新索引：

```bash
apt update
```

### 手动替换

打开`/etc/apt/sources.list`，将原来的内容修改为如下所示：

```
deb http://mirrors.shanghaitech.edu.cn/kali kali-rolling main non-free contrib
# deb-src http://mirrors.shanghaitech.edu.cn/kali kali-rolling main non-free contrib
```

并更新索引：

```bash
apt update
```

注：默认注释源码镜像以提升同步速度。