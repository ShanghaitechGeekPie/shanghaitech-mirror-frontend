## Fedora镜像使用帮助

备份`/etc/yum.repos.d/fedora.repo`、`/etc/yum.repos.d/fedora-updates.repo`、`/etc/yum.repos.d/fedora-modular.repo`和`/etc/yum.repos.d/fedora-updates-modular.repo`四个文件。

### 一键替换

```bash
sudo sed -e 's|^metalink=|#metalink=|g' \
         -e 's|^#baseurl=https://download.fedoraproject.org/pub/fedora/linux|baseurl=https://mirrors.shanghaitech.edu.cn/fedora|g' \
         -i.bak \
         /etc/yum.repos.d/fedora.repo \
         /etc/yum.repos.d/fedora-updates.repo \
         /etc/yum.repos.d/fedora-modular.repo \
         /etc/yum.repos.d/fedora-updates-modular.repo
```

### 手动替换

修改以上文件，替换为下面内容：

**fedora仓库（/etc/yum.repos.d/fedora.repo）**

```
[fedora]
name=Fedora $releasever - $basearch
failovermethod=priority
baseurl=https://mirrors.shanghaitech.edu.cn/fedora/releases/$releasever/Everything/$basearch/os/
metadata_expire=28d
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False
```

**updates仓库（/etc/yum.repos.d/fedora-updates.repo）**

```
[updates]
name=Fedora $releasever - $basearch - Updates
failovermethod=priority
baseurl=https://mirrors.shanghaitech.edu.cn/fedora/updates/$releasever/Everything/$basearch/
enabled=1
gpgcheck=1
metadata_expire=6h
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False
```

**fedora-modular仓库（/etc/yum.repos.d/fedora-modular.repo）**

```
[fedora-modular]
name=Fedora Modular $releasever - $basearch
failovermethod=priority
baseurl=https://mirrors.shanghaitech.edu.cn/fedora/releases/$releasever/Modular/$basearch/os/
enabled=1
metadata_expire=7d
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False
```

**updates-modular仓库（/etc/yum.repos.d/fedora-modular.repo）**

```
[updates-modular]
name=Fedora Modular $releasever - $basearch - Updates
failovermethod=priority
baseurl=https://mirrors.shanghaitech.edu.cn/fedora/updates/$releasever/Modular/$basearch/
enabled=1
gpgcheck=1
metadata_expire=6h
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False
```