## Deepin 镜像使用帮助

备份`/etc/apt/sources.list`，然后一键替换:

```bash
echo -e "deb [by-hash=force] https://mirrors.shanghaitech.edu.cn/deepin unstable main contrib non-free \ndeb-src https://mirrors.shanghaitech.edu.cn/deepin unstable main contrib non-free" | sudo tee /etc/apt/sources.list
```