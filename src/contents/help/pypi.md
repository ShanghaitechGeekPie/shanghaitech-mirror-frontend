## PyPI 镜像使用帮助

### 临时使用

```
pip install -i https://mirrors.shanghaitech.edu.cn/pypi/web/simple some-package
```

### 设为默认

```
python -m pip install -i https://mirrors.shanghaitech.edu.cn/pypi/web/simple --upgrade pip
pip config set global.index-url https://mirrors.shanghaitech.edu.cn/pypi/web/simple
```