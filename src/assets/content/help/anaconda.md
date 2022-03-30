## Anaconda镜像使用帮助

Anaconda是一个用于科学计算的Python发行版，支持Linux, Mac, Windows,包含了众多流行的科学计算、数据分析的Python包。

Anaconda安装包可以到<https://mirrors.shanghaitech.edu.cn/anaconda/archive/>下载。

我们还提供了Anaconda仓库与第三方源（conda-forge、msys2、pytorch等，[查看完整列表](https://mirrors.shanghaitech.edu.cn/anaconda/cloud/)）的镜像，各系统都可以通过修改用户目录下的`.condarc`文件。Windows用户无法直接创建名为`.condarc`的文件，可先执行`conda config --set show_channel_urls yes`生成该文件之后再修改。

修改Anaconda配置文件以使用我们的镜像站：

```plain
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.shanghaitech.edu.cn/anaconda/pkgs/main
  - https://mirrors.shanghaitech.edu.cn/anaconda/pkgs/r
  - https://mirrors.shanghaitech.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.shanghaitech.edu.cn/anaconda/cloud
  msys2: https://mirrors.shanghaitech.edu.cn/anaconda/cloud
  bioconda: https://mirrors.shanghaitech.edu.cn/anaconda/cloud
  menpo: https://mirrors.shanghaitech.edu.cn/anaconda/cloud
  pytorch: https://mirrors.shanghaitech.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.shanghaitech.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.shanghaitech.edu.cn/anaconda/cloud
```

运行`conda clean -i`清除索引缓存，保证用的是镜像站提供的索引。

运行`conda create -n myenv numpy`测试一下吧。