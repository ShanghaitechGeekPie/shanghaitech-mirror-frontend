## Deepin 镜像使用帮助

备份`/etc/apt/sources.list`，然后一键替换：

```bash
echo -e "deb [by-hash=force] https://mirrors.shanghaitech.edu.cn/deepin unstable main contrib non-free \ndeb-src https://mirrors.shanghaitech.edu.cn/deepin unstable main contrib non-free" | sudo tee /etc/apt/sources.list
```

- - -

## 另请参阅

出于某些原因，本文档可能没有及时更新/缺少维护。

您还可以参阅 [Mirrorz 中关于此镜像的帮助页面](https://help.mirrors.cernet.edu.cn/deepin/?mirror=ShanghaiTech+GeekPie)

> [!note]
> 该网站内容非 GeekPie 镜像站页面，使用此链接将产生校外流量。